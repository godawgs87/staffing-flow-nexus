
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      console.log('Fetching jobs from Supabase...');
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          companies (
            name
          ),
          contacts (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }
      
      console.log('Jobs fetched:', data);
      return data;
    },
  });
};
