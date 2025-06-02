
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query, types, limit = 10 } = await req.json()
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const results = []

    // Search candidates
    if (!types || types.includes('candidates')) {
      const { data: candidates } = await supabaseClient
        .from('candidates')
        .select('id, first_name, last_name, email, title, status')
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,title.ilike.%${query}%`)
        .limit(limit)

      if (candidates) {
        results.push(...candidates.map(c => ({
          ...c,
          type: 'candidate',
          name: `${c.first_name} ${c.last_name}`,
          subtitle: c.title,
          status: c.status
        })))
      }
    }

    // Search contacts
    if (!types || types.includes('contacts')) {
      const { data: contacts } = await supabaseClient
        .from('contacts')
        .select(`
          id, first_name, last_name, email, title, contact_type,
          companies:company_id(name)
        `)
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,title.ilike.%${query}%`)
        .limit(limit)

      if (contacts) {
        results.push(...contacts.map(c => ({
          ...c,
          type: 'contact',
          name: `${c.first_name} ${c.last_name}`,
          subtitle: c.companies?.name || c.title,
          status: c.contact_type
        })))
      }
    }

    // Search companies
    if (!types || types.includes('companies')) {
      const { data: companies } = await supabaseClient
        .from('companies')
        .select('id, name, industry, location, size')
        .or(`name.ilike.%${query}%,industry.ilike.%${query}%,location.ilike.%${query}%`)
        .limit(limit)

      if (companies) {
        results.push(...companies.map(c => ({
          ...c,
          type: 'company',
          name: c.name,
          subtitle: `${c.industry} • ${c.location}`,
          status: c.size
        })))
      }
    }

    // Search jobs
    if (!types || types.includes('jobs')) {
      const { data: jobs } = await supabaseClient
        .from('jobs')
        .select(`
          id, title, location, job_type, status,
          companies:company_id(name)
        `)
        .or(`title.ilike.%${query}%,location.ilike.%${query}%,job_type.ilike.%${query}%`)
        .limit(limit)

      if (jobs) {
        results.push(...jobs.map(j => ({
          ...j,
          type: 'job',
          name: j.title,
          subtitle: `${j.companies?.name} • ${j.location}`,
          status: j.status
        })))
      }
    }

    // Search projects
    if (!types || types.includes('projects')) {
      const { data: projects } = await supabaseClient
        .from('projects')
        .select(`
          id, name, status,
          companies:company_id(name)
        `)
        .ilike('name', `%${query}%`)
        .limit(limit)

      if (projects) {
        results.push(...projects.map(p => ({
          ...p,
          type: 'project',
          name: p.name,
          subtitle: p.companies?.name,
          status: p.status
        })))
      }
    }

    // Sort results by relevance (exact matches first)
    results.sort((a, b) => {
      const aExact = a.name.toLowerCase().includes(query.toLowerCase())
      const bExact = b.name.toLowerCase().includes(query.toLowerCase())
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      return 0
    })

    return new Response(
      JSON.stringify({ results: results.slice(0, limit) }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
