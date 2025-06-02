
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useCompanies } from '@/hooks/useCompanies';
import { useContacts } from '@/hooks/useContacts';
import JobForm from './JobForm';

interface Job {
  id?: string;
  title: string;
  company_id?: string;
  contact_id?: string;
  description?: string;
  requirements?: string;
  location?: string;
  job_type?: string;
  salary_min?: number;
  salary_max?: number;
  status?: string;
}

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: Job;
  mode: 'add' | 'edit' | 'view';
}

const JobModal = ({ isOpen, onClose, job, mode }: JobModalProps) => {
  const [formData, setFormData] = useState({
    title: job?.title || '',
    company_id: job?.company_id || '',
    contact_id: job?.contact_id || '',
    description: job?.description || '',
    requirements: job?.requirements || '',
    location: job?.location || '',
    job_type: job?.job_type || 'full-time',
    salary_min: job?.salary_min?.toString() || '',
    salary_max: job?.salary_max?.toString() || '',
    status: job?.status || 'open',
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: companies = [] } = useCompanies();
  const { data: contacts = [] } = useContacts();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const jobData = {
        ...data,
        salary_min: data.salary_min ? parseInt(data.salary_min) : null,
        salary_max: data.salary_max ? parseInt(data.salary_max) : null,
        contact_id: data.contact_id || null,
      };

      if (mode === 'add') {
        const { error } = await supabase.from('jobs').insert([jobData]);
        if (error) throw error;
      } else if (mode === 'edit' && job?.id) {
        const { error } = await supabase.from('jobs').update(jobData).eq('id', job.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: mode === 'add' ? 'Job Posted' : 'Job Updated',
        description: `Job has been ${mode === 'add' ? 'posted' : 'updated'} successfully.`,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${mode} job: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode !== 'view') {
      mutation.mutate(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isReadonly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Post New Job' : mode === 'edit' ? 'Edit Job' : 'Job Details'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <JobForm
            formData={formData}
            companies={companies}
            contacts={contacts}
            isReadonly={isReadonly}
            onChange={handleChange}
          />
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {mode !== 'view' && (
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : mode === 'add' ? 'Post Job' : 'Save Changes'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;
