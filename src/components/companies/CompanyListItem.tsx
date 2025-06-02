
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, MapPin, Globe } from 'lucide-react';

interface CompanyStats {
  activeJobs: number;
  totalContacts: number;
  totalJobs: number;
  notesCount: number;
}

interface CompanyListItemProps {
  company: any;
  stats: CompanyStats;
  isSelected: boolean;
  onSelect: () => void;
  onView: () => void;
  onEdit: () => void;
}

const CompanyListItem = ({ 
  company, 
  stats, 
  isSelected, 
  onSelect, 
  onView, 
  onEdit 
}: CompanyListItemProps) => {
  return (
    <Card 
      className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">{company.name}</h3>
              <p className="text-gray-600 mb-3">{company.industry || 'No industry specified'}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{company.size || 'Size not specified'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location || 'Location not specified'}</span>
                </div>
                {company.website && (
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span className="truncate">{company.website}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-semibold text-blue-600">{stats.activeJobs}</div>
                  <div className="text-xs text-gray-500">Active Jobs</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-semibold text-green-600">{stats.totalContacts}</div>
                  <div className="text-xs text-gray-500">Contacts</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-lg font-semibold text-orange-600">{stats.totalJobs}</div>
                  <div className="text-xs text-gray-500">Total Jobs</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-semibold text-purple-600">{stats.notesCount}</div>
                  <div className="text-xs text-gray-500">Notes</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button size="sm" variant="ghost" onClick={(e) => {
              e.stopPropagation();
              onView();
            }}>
              View
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}>
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyListItem;
