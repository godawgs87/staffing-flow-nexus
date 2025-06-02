import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import NotesPanel from '@/components/notes/NotesPanel';

interface Company {
  id?: string;
  name: string;
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
  description?: string;
}

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company?: Company;
  mode: 'add' | 'edit' | 'view';
}

const CompanyModal = ({ isOpen, onClose, company, mode }: CompanyModalProps) => {
  const [formData, setFormData] = useState({
    name: company?.name || '',
    website: company?.website || '',
    industry: company?.industry || '',
    size: company?.size || '',
    location: company?.location || '',
    description: company?.description || '',
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (mode === 'add') {
        const { error } = await supabase.from('companies').insert([data]);
        if (error) throw error;
      } else if (mode === 'edit' && company?.id) {
        const { error } = await supabase.from('companies').update(data).eq('id', company.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast({
        title: mode === 'add' ? 'Company Added' : 'Company Updated',
        description: `Company has been ${mode === 'add' ? 'added' : 'updated'} successfully.`,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${mode} company: ${error.message}`,
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
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden fixed top-[10%] left-[50%] translate-x-[-50%] translate-y-0">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add Company' : mode === 'edit' ? 'Edit Company' : 'Company Details'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-6 max-h-[70vh] overflow-hidden">
          {/* Left side - Company Form */}
          <div className="flex-1 overflow-y-auto pr-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  readOnly={isReadonly}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  readOnly={isReadonly}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    readOnly={isReadonly}
                  />
                </div>
                
                <div>
                  <Label htmlFor="size">Company Size</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => handleChange('size', e.target.value)}
                    readOnly={isReadonly}
                    placeholder="e.g., 50-200 employees"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  readOnly={isReadonly}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
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
                    {mutation.isPending ? 'Saving...' : mode === 'add' ? 'Add Company' : 'Save Changes'}
                  </Button>
                )}
              </DialogFooter>
            </form>
          </div>

          {/* Right side - Notes Panel (only show for existing companies) */}
          {company?.id && (
            <div className="w-96 border-l pl-6 overflow-y-auto">
              <NotesPanel 
                entityType="company" 
                entityId={company.id} 
                entityName={company.name}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyModal;
