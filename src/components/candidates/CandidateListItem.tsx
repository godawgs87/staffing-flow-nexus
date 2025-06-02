
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Calendar, DollarSign, Building2 } from 'lucide-react';

interface CandidateListItemProps {
  candidate: any;
  isSelected: boolean;
  onSelect: (candidate: any) => void;
  onView: (candidate: any) => void;
  onEdit: (candidate: any) => void;
}

const CandidateListItem = ({ candidate, isSelected, onSelect, onView, onEdit }: CandidateListItemProps) => {
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
    <Card 
      className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => onSelect(candidate)}
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
                {candidate.companies && (
                  <div className="flex items-center space-x-1">
                    <Building2 className="h-4 w-4" />
                    <span>{candidate.companies.name}</span>
                  </div>
                )}
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
              onView(candidate);
            }}>
              View
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => {
              e.stopPropagation();
              onEdit(candidate);
            }}>
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateListItem;
