
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, DollarSign, Edit, ExternalLink, Linkedin, Globe } from 'lucide-react';
import NotesPanel from './notes/NotesPanel';

interface CandidateDetailsProps {
  candidate: any;
  onEdit: () => void;
}

const CandidateDetails = ({ candidate, onEdit }: CandidateDetailsProps) => {
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

  return (
    <div className="h-full w-full space-y-6">
      {/* Header Section - Full width */}
      <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{candidate.first_name} {candidate.last_name}</h1>
              <p className="text-gray-600">{candidate.title || 'No title specified'}</p>
              <Badge className={getStatusColor(candidate.status)}>
                {candidate.status}
              </Badge>
            </div>
          </div>
          <Button onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Information Grid - Full width utilization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
          {candidate.email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{candidate.email}</p>
              </div>
            </div>
          )}
          {candidate.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{candidate.phone}</p>
              </div>
            </div>
          )}
          {candidate.location && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{candidate.location}</p>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-medium">{candidate.experience_years || 0} years</p>
            </div>
          </div>
          {(candidate.salary_expectation_min || candidate.salary_expectation_max) && (
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Salary Expectation</p>
                <p className="font-medium">
                  ${candidate.salary_expectation_min?.toLocaleString() || 'N/A'} - 
                  ${candidate.salary_expectation_max?.toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>
          )}
          {candidate.linkedin_url && (
            <div className="flex items-center space-x-3">
              <Linkedin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center">
                  Profile <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          )}
          {candidate.portfolio_url && (
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Portfolio</p>
                <a href={candidate.portfolio_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center">
                  View Portfolio <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Skills Section - Full width */}
        {candidate.skills && candidate.skills.length > 0 && (
          <div className="mt-6 w-full">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notes Section - Full width */}
      <div className="w-full">
        <NotesPanel
          entityType="candidate"
          entityId={candidate.id}
          entityName={`${candidate.first_name} ${candidate.last_name}`}
        />
      </div>
    </div>
  );
};

export default CandidateDetails;
