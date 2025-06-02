
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { CandidateFormData, Candidate } from '@/types/candidate';
import { Database } from '@/integrations/supabase/types';

type CandidateInsert = Database['public']['Tables']['candidates']['Insert'];
type CandidateUpdate = Database['public']['Tables']['candidates']['Update'];

export const useCandidateForm = (candidate?: Candidate, mode: 'add' | 'edit' | 'view' = 'add') => {
  const [formData, setFormData] = useState<CandidateFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    title: '',
    location: '',
    status: 'new',
    skills: '',
    experience_years: '',
    salary_expectation_min: '',
    salary_expectation_max: '',
    company_id: '',
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Reset form when modal opens or candidate changes
  useEffect(() => {
    if (candidate) {
      setFormData({
        first_name: candidate.first_name || '',
        last_name: candidate.last_name || '',
        email: candidate.email || '',
        phone: candidate.phone || '',
        title: candidate.title || '',
        location: candidate.location || '',
        status: candidate.status || 'new',
        skills: candidate.skills?.join(', ') || '',
        experience_years: candidate.experience_years?.toString() || '',
        salary_expectation_min: candidate.salary_expectation_min?.toString() || '',
        salary_expectation_max: candidate.salary_expectation_max?.toString() || '',
        company_id: candidate.company_id || '',
      });
    } else {
      // Clear form for new candidates
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        title: '',
        location: '',
        status: 'new',
        skills: '',
        experience_years: '',
        salary_expectation_min: '',
        salary_expectation_max: '',
        company_id: '',
      });
    }
  }, [candidate]);

  const mutation = useMutation({
    mutationFn: async (data: CandidateFormData) => {
      if (mode === 'add') {
        const candidateData: CandidateInsert = {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email || null,
          phone: data.phone || null,
          title: data.title || null,
          location: data.location || null,
          status: data.status as Database['public']['Enums']['candidate_status'],
          skills: data.skills ? data.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : null,
          experience_years: data.experience_years ? parseInt(data.experience_years) : null,
          salary_expectation_min: data.salary_expectation_min ? parseInt(data.salary_expectation_min) : null,
          salary_expectation_max: data.salary_expectation_max ? parseInt(data.salary_expectation_max) : null,
          company_id: data.company_id || null,
        };

        const { error } = await supabase.from('candidates').insert(candidateData);
        if (error) throw error;
      } else if (mode === 'edit' && candidate?.id) {
        const candidateData: CandidateUpdate = {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email || null,
          phone: data.phone || null,
          title: data.title || null,
          location: data.location || null,
          status: data.status as Database['public']['Enums']['candidate_status'],
          skills: data.skills ? data.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : null,
          experience_years: data.experience_years ? parseInt(data.experience_years) : null,
          salary_expectation_min: data.salary_expectation_min ? parseInt(data.salary_expectation_min) : null,
          salary_expectation_max: data.salary_expectation_max ? parseInt(data.salary_expectation_max) : null,
          company_id: data.company_id || null,
        };

        const { error } = await supabase.from('candidates').update(candidateData).eq('id', candidate.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({
        title: mode === 'add' ? 'Candidate Added' : 'Candidate Updated',
        description: `Candidate has been ${mode === 'add' ? 'added' : 'updated'} successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${mode} candidate: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleChange = (field: keyof CandidateFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (onClose: () => void) => {
    mutation.mutate(formData, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading: mutation.isPending,
  };
};
