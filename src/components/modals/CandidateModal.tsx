
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CandidateFormFields from '@/components/forms/CandidateFormFields';
import { useCandidateForm } from '@/hooks/useCandidateForm';
import { Candidate } from '@/types/candidate';

interface CandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate?: Candidate;
  mode: 'add' | 'edit' | 'view';
}

const CandidateModal = ({ isOpen, onClose, candidate, mode }: CandidateModalProps) => {
  const { formData, handleChange, handleSubmit, isLoading } = useCandidateForm(candidate, mode);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode !== 'view') {
      handleSubmit(onClose);
    }
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
        
        <form onSubmit={onSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          <CandidateFormFields
            formData={formData}
            onChange={handleChange}
            isReadonly={isReadonly}
          />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {mode !== 'view' && (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : mode === 'add' ? 'Add Candidate' : 'Save Changes'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateModal;
