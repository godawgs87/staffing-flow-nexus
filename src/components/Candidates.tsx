
import React, { useState } from 'react';
import { User } from 'lucide-react';
import CandidateDetails from './CandidateDetails';
import CandidateModal from './modals/CandidateModal';
import CandidateListItem from './candidates/CandidateListItem';
import CandidateSearchBar from './candidates/CandidateSearchBar';
import CandidateListHeader from './candidates/CandidateListHeader';
import CandidateEmptyState from './candidates/CandidateEmptyState';
import { useCandidates } from '@/hooks/useCandidates';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

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
  const isMobile = useIsMobile();

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

  const handleCandidateSelect = (candidate: any) => {
    setSelectedCandidate(candidate);
    // On mobile, don't show the sidebar details
    if (!isMobile) {
      // Desktop behavior remains the same
    }
  };

  const closeDetailsPanel = () => {
    setSelectedCandidate(null);
  };

  if (isLoading) {
    return (
      <div className="p-2 md:p-4 space-y-4">
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
      <div className="p-2 md:p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
            <p className="text-red-600">Error loading candidates: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const DetailsComponent = () => (
    <CandidateDetails
      candidate={selectedCandidate}
      onEdit={() => openModal('edit', selectedCandidate)}
      onClose={isMobile ? closeDetailsPanel : undefined}
    />
  );

  return (
    <div className="flex h-full w-full">
      {/* Main Content */}
      <div className={`${isMobile ? 'w-full' : 'flex-1'} p-2 md:p-4 space-y-4 overflow-auto`}>
        <CandidateListHeader 
          totalCount={candidates.length}
          onAddCandidate={() => openModal('add')}
        />

        <CandidateSearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Candidates List */}
        <div className="space-y-2">
          {filteredCandidates.map((candidate) => (
            <CandidateListItem
              key={candidate.id}
              candidate={candidate}
              isSelected={!isMobile && selectedCandidate?.id === candidate.id}
              onSelect={handleCandidateSelect}
              onView={(candidate) => isMobile ? setSelectedCandidate(candidate) : openModal('view', candidate)}
              onEdit={(candidate) => openModal('edit', candidate)}
            />
          ))}
        </div>
      </div>

      {/* Desktop Details Panel */}
      {!isMobile && (
        <div className="w-96 border-l bg-white flex-shrink-0 overflow-auto">
          {selectedCandidate ? (
            <DetailsComponent />
          ) : (
            <CandidateEmptyState />
          )}
        </div>
      )}

      {/* Mobile Details Modal/Drawer */}
      {isMobile && selectedCandidate && (
        <Drawer open={!!selectedCandidate} onOpenChange={(open) => !open && closeDetailsPanel()}>
          <DrawerContent className="h-[85vh]">
            <div className="overflow-auto">
              <DetailsComponent />
            </div>
          </DrawerContent>
        </Drawer>
      )}

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
