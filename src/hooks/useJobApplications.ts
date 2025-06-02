
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useJobApplications = (jobId: string) => {
  return useQuery({
    queryKey: ['job-applications', jobId],
    queryFn: async () => {
      console.log('Fetching job applications for job:', jobId);
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          candidates (
            id,
            first_name,
            last_name,
            email,
            title,
            linkedin_url,
            resume_url,
            status,
            experience_years,
            location
          )
        `)
        .eq('job_id', jobId)
        .order('applied_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching job applications:', error);
        throw error;
      }
      
      console.log('Job applications fetched:', data);
      return data;
    },
  });
};
