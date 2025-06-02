
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

interface Candidate {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  title?: string;
  location?: string;
  status?: string;
  skills?: string[];
  experience_years?: number;
  salary_expectation_min?: number;
  salary_expectation_max?: number;
}

interface CandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate?: Candidate;
  mode: 'add' | 'edit' | 'view';
}

const CandidateModal = ({ isOpen, onClose, candidate, mode }: CandidateModalProps) => {
  const [formData, setFormData] = useState({
    first_name: candidate?.first_name || '',
    last_name: candidate?.last_name || '',
    email: candidate?.email || '',
    phone: candidate?.phone || '',
    title: candidate?.title || '',
    location: candidate?.location || '',
    status: candidate?.status || 'new',
    skills: candidate?.skills?.join(', ') || '',
    experience_years: candidate?.experience_years?.toString() || '',
    salary_expectation_min: candidate?.salary_expectation_min?.toString() || '',
    salary_expectation_max: candidate?.salary_expectation_max?.toString() || '',
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const candidateData = {
        ...data,
        skills: data.skills ? data.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
        experience_years: data.experience_years ? parseInt(data.experience_years) : null,
        salary_expectation_min: data.salary_expectation_min ? parseInt(data.salary_expectation_min) : null,
        salary_expectation_max: data.salary_expectation_max ? parseInt(data.salary_expectation_max) : null,
      };

      if (mode === 'add') {
        const { error } = await supabase.from('candidates').insert([candidateData]);
        if (error) throw error;
      } else if (mode === 'edit' && candidate?.id) {
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
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${mode} candidate: ${error.message}`,
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add Candidate' : mode === 'edit' ? 'Edit Candidate' : 'Candidate Details'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
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
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              readOnly={isReadonly}
            />
          </div>
          
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)} disabled={isReadonly}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
              readOnly={isReadonly}
              placeholder="React, TypeScript, Node.js"
            />
          </div>
          
          <div>
            <Label htmlFor="experience_years">Years of Experience</Label>
            <Input
              id="experience_years"
              type="number"
              value={formData.experience_years}
              onChange={(e) => handleChange('experience_years', e.target.value)}
              readOnly={isReadonly}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary_expectation_min">Min Salary</Label>
              <Input
                id="salary_expectation_min"
                type="number"
                value={formData.salary_expectation_min}
                onChange={(e) => handleChange('salary_expectation_min', e.target.value)}
                readOnly={isReadonly}
              />
            </div>
            
            <div>
              <Label htmlFor="salary_expectation_max">Max Salary</Label>
              <Input
                id="salary_expectation_max"
                type="number"
                value={formData.salary_expectation_max}
                onChange={(e) => handleChange('salary_expectation_max', e.target.value)}
                readOnly={isReadonly}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {mode !== 'view' && (
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : mode === 'add' ? 'Add Candidate' : 'Save Changes'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateModal;
