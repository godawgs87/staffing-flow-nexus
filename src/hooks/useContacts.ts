
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      console.log('Fetching contacts from Supabase...');
      const { data, error } = await supabase
        .from('contacts')
        .select(`
          *,
          companies (
            name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching contacts:', error);
        throw error;
      }
      
      console.log('Contacts fetched:', data);
      return data;
    },
  });
};
