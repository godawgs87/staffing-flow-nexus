
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Mail, User, MapPin, Calendar, DollarSign } from 'lucide-react';
import CandidateDetails from './CandidateDetails';
import CandidateModal from './modals/CandidateModal';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-gray-100 text-gray-800';
      case 'screening': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-yellow-100 text-yellow-800';
      case 'offer': return 'bg-orange-100 text-orange-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
            <p className="text-gray-600">Manage your talent pipeline ({candidates.length} total)</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => openModal('add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search candidates by name, position, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <Card 
              key={candidate.id} 
              className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${
                selectedCandidate?.id === candidate.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedCandidate(candidate)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-medium">{candidate.first_name} {candidate.last_name}</h3>
                        <Badge className={getStatusColor(candidate.status)}>
                          {candidate.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{candidate.title || 'No title specified'}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{candidate.experience_years || 0} years exp</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{candidate.location || 'Not specified'}</span>
                        </div>
                        {candidate.salary_expectation_min && candidate.salary_expectation_max && (
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>${candidate.salary_expectation_min?.toLocaleString()} - ${candidate.salary_expectation_max?.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {(candidate.skills || []).slice(0, 5).map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {(candidate.skills || []).length > 5 && (
                            <Badge variant="secondary" className="text-xs">
                              +{(candidate.skills || []).length - 5} more
                            </Badge>
                          )}
                          {(!candidate.skills || candidate.skills.length === 0) && (
                            <span className="text-xs text-gray-500">No skills listed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" onClick={(e) => {
                      e.stopPropagation();
                      openModal('view', candidate);
                    }}>
                      View
                    </Button>
                    <Button size="sm" variant="ghost" onClick={(e) => {
                      e.stopPropagation();
                      openModal('edit', candidate);
                    }}>
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
          <div className="p-6 text-center text-gray-500 h-full flex flex-col justify-center">
            <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Select a candidate to view full details</p>
          </div>
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
