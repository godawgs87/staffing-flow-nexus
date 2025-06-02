
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Mail, User } from 'lucide-react';
import NotesPanel from './notes/NotesPanel';
import { useCandidates } from '@/hooks/useCandidates';

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const { data: candidates = [], isLoading, error } = useCandidates();

  const filteredCandidates = candidates.filter(candidate =>
    `${candidate.first_name} ${candidate.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (candidate.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (candidate.skills || []).some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      <div className="space-y-6">
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
      <div className="space-y-6">
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600">Manage your talent pipeline ({candidates.length} total)</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCandidates.map((candidate) => (
              <Card 
                key={candidate.id} 
                className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${
                  selectedCandidate?.id === candidate.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedCandidate(candidate)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{candidate.first_name} {candidate.last_name}</CardTitle>
                        <p className="text-sm text-gray-600">{candidate.title || 'No title specified'}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Experience: {candidate.experience_years || 0} years</p>
                    <p className="text-sm text-gray-600">Location: {candidate.location || 'Not specified'}</p>
                    {candidate.salary_expectation_min && candidate.salary_expectation_max && (
                      <p className="text-sm text-gray-600">
                        Salary: ${candidate.salary_expectation_min?.toLocaleString()} - ${candidate.salary_expectation_max?.toLocaleString()}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {(candidate.skills || []).map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {(!candidate.skills || candidate.skills.length === 0) && (
                        <span className="text-xs text-gray-500">No skills listed</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notes Panel */}
        <div className="lg:col-span-1">
          {selectedCandidate ? (
            <NotesPanel
              entityType="candidate"
              entityId={selectedCandidate.id}
              entityName={`${selectedCandidate.first_name} ${selectedCandidate.last_name}`}
            />
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a candidate to view and add notes</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Candidates;
