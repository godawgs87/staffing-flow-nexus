
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useCompanies } from '@/hooks/useCompanies';
import ContactForm from './ContactForm';

interface Contact {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  title?: string;
  company_id?: string;
  contact_type?: 'client' | 'partner' | 'vendor' | 'internal';
  linkedin_url?: string;
  notes?: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact?: Contact;
  mode: 'add' | 'edit' | 'view';
}

const ContactModal = ({ isOpen, onClose, contact, mode }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    first_name: contact?.first_name || '',
    last_name: contact?.last_name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    title: contact?.title || '',
    company_id: contact?.company_id || '',
    contact_type: contact?.contact_type || 'client' as 'client' | 'partner' | 'vendor' | 'internal',
    linkedin_url: contact?.linkedin_url || '',
    notes: contact?.notes || '',
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: companies = [] } = useCompanies();

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (mode === 'add') {
        const { error } = await supabase.from('contacts').insert(data);
        if (error) throw error;
      } else if (mode === 'edit' && contact?.id) {
        const { error } = await supabase.from('contacts').update(data).eq('id', contact.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({
        title: mode === 'add' ? 'Contact Added' : 'Contact Updated',
        description: `Contact has been ${mode === 'add' ? 'added' : 'updated'} successfully.`,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${mode} contact: ${error.message}`,
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
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add Contact' : mode === 'edit' ? 'Edit Contact' : 'Contact Details'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <ContactForm
            formData={formData}
            companies={companies}
            isReadonly={isReadonly}
            onChange={handleChange}
          />
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {mode !== 'view' && (
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : mode === 'add' ? 'Add Contact' : 'Save Changes'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
