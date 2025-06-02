
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.9';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  email: string;
  role: string;
  inviterName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, role, inviterName }: InvitationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "TalentFlow <onboarding@resend.dev>",
      to: [email],
      subject: "You've been invited to join TalentFlow",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to TalentFlow!</h1>
          <p>You've been invited to join TalentFlow as a <strong>${role}</strong>.</p>
          ${inviterName ? `<p>This invitation was sent by ${inviterName}.</p>` : ''}
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Getting Started:</h3>
            <ol>
              <li>Click the link below to access TalentFlow</li>
              <li>Sign up using this email address: <strong>${email}</strong></li>
              <li>Your account will automatically be assigned the ${role} role</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '')}/auth/v1/verify?type=invite&email=${encodeURIComponent(email)}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Join TalentFlow
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            If you didn't expect this invitation, you can safely ignore this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            TalentFlow Team Management System
          </p>
        </div>
      `,
    });

    console.log("Team invitation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-team-invitation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
