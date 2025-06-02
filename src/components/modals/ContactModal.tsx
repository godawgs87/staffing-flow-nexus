
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useCompanies } from '@/hooks/useCompanies';

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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add Contact' : mode === 'edit' ? 'Edit Contact' : 'Contact Details'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)}
                readOnly={isReadonly}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)}
                readOnly={isReadonly}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              readOnly={isReadonly}
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              readOnly={isReadonly}
            />
          </div>
          
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              readOnly={isReadonly}
            />
          </div>
          
          <div>
            <Label htmlFor="company">Company</Label>
            <Select value={formData.company_id} onValueChange={(value) => handleChange('company_id', value)} disabled={isReadonly}>
              <SelectTrigger>
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="contact_type">Contact Type</Label>
            <Select value={formData.contact_type} onValueChange={(value: 'client' | 'partner' | 'vendor' | 'internal') => handleChange('contact_type', value)} disabled={isReadonly}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
            <Input
              id="linkedin_url"
              value={formData.linkedin_url}
              onChange={(e) => handleChange('linkedin_url', e.target.value)}
              readOnly={isReadonly}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              readOnly={isReadonly}
              rows={3}
            />
          </div>
          
          <DialogFooter>
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
