
import React, { useState } from 'react';
import { User } from 'lucide-react';
import CandidateDetails from './CandidateDetails';
import CandidateModal from './modals/CandidateModal';
import CandidateListItem from './candidates/CandidateListItem';
import CandidateSearchBar from './candidates/CandidateSearchBar';
import CandidateListHeader from './candidates/CandidateListHeader';
import CandidateEmptyState from './candidates/CandidateEmptyState';
import { useCandidates } from '@/hooks/useCandidates';

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    candidate?: any;
  }>({
    isOpen: false,
    mode: 'add',
  });
  
  const { data: candidates = [], isLoading, error } = useCandidates();

  const filteredCandidates = candidates.filter(candidate =>
    `${candidate.first_name} ${candidate.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (candidate.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (candidate.skills || []).some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openModal = (mode: 'add' | 'edit' | 'view', candidate?: any) => {
    setModalState({ isOpen: true, mode, candidate });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'add' });
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
            <p className="text-gray-600">Loading candidates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
            <p className="text-red-600">Error loading candidates: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      {/* Main Content - Left Side */}
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <CandidateListHeader 
          totalCount={candidates.length}
          onAddCandidate={() => openModal('add')}
        />

        <CandidateSearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <CandidateListItem
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidate?.id === candidate.id}
              onSelect={setSelectedCandidate}
              onView={(candidate) => openModal('view', candidate)}
              onEdit={(candidate) => openModal('edit', candidate)}
            />
          ))}
        </div>
      </div>

      {/* Details Panel - Right Side */}
      <div className="w-96 border-l bg-white flex-shrink-0 overflow-auto">
        {selectedCandidate ? (
          <CandidateDetails
            candidate={selectedCandidate}
            onEdit={() => openModal('edit', selectedCandidate)}
          />
        ) : (
          <CandidateEmptyState />
        )}
      </div>

      <CandidateModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        candidate={modalState.candidate}
        mode={modalState.mode}
      />
    </div>
  );
};

export default Candidates;
