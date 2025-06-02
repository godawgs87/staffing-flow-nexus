
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  status: string;
  last_login: string | null;
  invited_at: string | null;
}

interface TeamInvitation {
  id: string;
  email: string;
  role: string;
  invited_at: string;
  expires_at: string;
  status: string;
}

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async (): Promise<TeamMember[]> => {
      const { data, error } = await supabase.rpc('get_team_members');
      
      if (error) {
        console.error('Error fetching team members:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useTeamInvitations = () => {
  return useQuery({
    queryKey: ['team-invitations'],
    queryFn: async (): Promise<TeamInvitation[]> => {
      const { data, error } = await supabase
        .from('team_invitations')
        .select('*')
        .order('invited_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching team invitations:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useInviteTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ email, role }: { email: string; role: string }) => {
      const { data, error } = await supabase.rpc('invite_team_member', {
        invite_email: email,
        invite_role: role
      });
      
      if (error) {
        console.error('Error inviting team member:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);
      
      if (error) {
        console.error('Error updating member role:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};

export const useRemoveTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'inactive' })
        .eq('id', userId);
      
      if (error) {
        console.error('Error removing team member:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};
