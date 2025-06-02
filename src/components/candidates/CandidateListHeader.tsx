
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CandidateListHeaderProps {
  totalCount: number;
  onAddCandidate: () => void;
}

const CandidateListHeader = ({ totalCount, onAddCandidate }: CandidateListHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
        <p className="text-gray-600">Manage your talent pipeline ({totalCount} total)</p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={onAddCandidate}>
        <Plus className="h-4 w-4 mr-2" />
        Add Candidate
      </Button>
    </div>
  );
};

export default CandidateListHeader;
