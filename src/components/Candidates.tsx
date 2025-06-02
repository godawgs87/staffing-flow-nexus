import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Mail, User } from 'lucide-react';
import NotesPanel from './notes/NotesPanel';

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const candidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      position: 'Senior Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      status: 'Active',
      location: 'New York, NY',
      lastActivity: '2 days ago'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      position: 'Product Manager',
      experience: '7 years',
      skills: ['Product Strategy', 'Agile', 'Analytics'],
      status: 'Interviewing',
      location: 'San Francisco, CA',
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      position: 'UX Designer',
      experience: '4 years',
      skills: ['Figma', 'User Research', 'Prototyping'],
      status: 'Placed',
      location: 'Austin, TX',
      lastActivity: '5 days ago'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      position: 'Data Scientist',
      experience: '6 years',
      skills: ['Python', 'Machine Learning', 'SQL'],
      status: 'Active',
      location: 'Seattle, WA',
      lastActivity: '3 hours ago'
    }
  ];

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Interviewing': return 'bg-blue-100 text-blue-800';
      case 'Placed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600">Manage your talent pipeline</p>
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
                        <CardTitle className="text-lg">{candidate.name}</CardTitle>
                        <p className="text-sm text-gray-600">{candidate.position}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Experience: {candidate.experience}</p>
                    <p className="text-sm text-gray-600">Location: {candidate.location}</p>
                    <p className="text-sm text-gray-600">Last activity: {candidate.lastActivity}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
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
              entityId={selectedCandidate.id.toString()}
              entityName={selectedCandidate.name}
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
