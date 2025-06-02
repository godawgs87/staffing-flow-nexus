
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
      className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium mb-1">{company.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{company.industry || 'No industry'}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{company.size || 'Size not specified'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{company.location || 'No location'}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="text-sm font-semibold text-blue-600">{stats.activeJobs}</div>
                  <div className="text-xs text-gray-500">Active</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="text-sm font-semibold text-green-600">{stats.totalContacts}</div>
                  <div className="text-xs text-gray-500">Contacts</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded">
                  <div className="text-sm font-semibold text-orange-600">{stats.totalJobs}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <div className="text-sm font-semibold text-purple-600">{stats.notesCount}</div>
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
