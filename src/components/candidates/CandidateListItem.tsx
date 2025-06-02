
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
      className={`hover:shadow-lg transition-all duration-200 cursor-pointer mx-0 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => onSelect(candidate)}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-base font-medium truncate">{candidate.first_name} {candidate.last_name}</h3>
                <Badge className={`${getStatusColor(candidate.status)} flex-shrink-0`}>
                  {candidate.status}
                </Badge>
              </div>
              <p className="text-gray-600 mb-2 text-sm truncate">{candidate.title || 'No title specified'}</p>
              
              <div className="grid grid-cols-1 gap-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{candidate.experience_years || 0} years exp</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{candidate.location || 'Not specified'}</span>
                </div>
                {candidate.companies && (
                  <div className="flex items-center space-x-1">
                    <Building2 className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{candidate.companies.name}</span>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {(candidate.skills || []).slice(0, 3).map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {(candidate.skills || []).length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{(candidate.skills || []).length - 3}
                    </Badge>
                  )}
                  {(!candidate.skills || candidate.skills.length === 0) && (
                    <span className="text-xs text-gray-500">No skills listed</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-1 ml-2">
            <Button size="sm" variant="ghost" onClick={(e) => {
              e.stopPropagation();
              onView(candidate);
            }} className="text-xs h-7 px-2">
              View
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => {
              e.stopPropagation();
              onEdit(candidate);
            }} className="text-xs h-7 px-2">
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateListItem;
