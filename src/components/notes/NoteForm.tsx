
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface NoteFormProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading: boolean;
  placeholder?: string;
  saveButtonText?: string;
}

const NoteForm = ({ 
  value, 
  onChange, 
  onSave, 
  onCancel, 
  isLoading, 
  placeholder = "Add your note...",
  saveButtonText = "Save Note"
}: NoteFormProps) => {
  return (
    <div className="space-y-2 p-4 border rounded-lg bg-gray-50 sticky top-0 z-10">
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-20"
      />
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          onClick={onSave}
          disabled={!value.trim() || isLoading}
        >
          {isLoading ? 'Saving...' : saveButtonText}
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NoteForm;
