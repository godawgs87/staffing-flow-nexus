
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCandidates = () => {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      console.log('Fetching candidates from Supabase...');
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching candidates:', error);
        throw error;
      }
      
      console.log('Candidates fetched:', data);
      return data;
    },
  });
};
