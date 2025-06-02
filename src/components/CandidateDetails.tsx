
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
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{candidate.first_name} {candidate.last_name}</h1>
              <p className="text-gray-600 text-sm">{candidate.title || 'No title specified'}</p>
              <Badge className={getStatusColor(candidate.status)}>
                {candidate.status}
              </Badge>
            </div>
          </div>
          <Button onClick={onEdit} size="sm">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>

        {/* Information - Compact Layout */}
        <div className="space-y-2">
          {candidate.email && (
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{candidate.email}</p>
              </div>
            </div>
          )}
          
          {candidate.phone && (
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">{candidate.phone}</p>
              </div>
            </div>
          )}
          
          {candidate.location && (
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-medium">{candidate.location}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Experience</p>
              <p className="font-medium">{candidate.experience_years || 0} years</p>
            </div>
          </div>
          
          {(candidate.salary_expectation_min || candidate.salary_expectation_max) && (
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Salary Expectation</p>
                <p className="font-medium">
                  ${candidate.salary_expectation_min?.toLocaleString() || 'N/A'} - 
                  ${candidate.salary_expectation_max?.toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>
          )}
          
          {candidate.linkedin_url && (
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
              <Linkedin className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">LinkedIn</p>
                <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center">
                  Profile <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          )}
          
          {candidate.portfolio_url && (
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
              <Globe className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Portfolio</p>
                <a href={candidate.portfolio_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center">
                  View Portfolio <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Skills Section */}
        {candidate.skills && candidate.skills.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-xs font-medium text-gray-500 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notes Section */}
      <div className="flex-1 overflow-hidden">
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
