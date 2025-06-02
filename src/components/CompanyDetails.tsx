
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Edit, Globe, MapPin, Users, Briefcase, ExternalLink, X } from 'lucide-react';
import NotesPanel from './notes/NotesPanel';
import { useIsMobile } from '@/hooks/use-mobile';

interface CompanyDetailsProps {
  company: any;
  onEdit: () => void;
  onClose?: () => void;
  stats?: {
    activeJobs: number;
    totalContacts: number;
    totalJobs: number;
    notesCount: number;
  };
}

const CompanyDetails = ({ company, onEdit, onClose, stats }: CompanyDetailsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full space-y-6">
      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <div className="flex justify-end p-4 pb-0">
          <Button onClick={onClose} size="sm" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
              <p className="text-lg text-gray-600">{company.industry || 'No industry specified'}</p>
            </div>
          </div>
          <Button onClick={onEdit} size="lg">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Company Information - Vertical List Layout */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Users className="h-6 w-6 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Company Size</p>
              <p className="font-semibold text-lg">{company.size || 'Size not specified'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <MapPin className="h-6 w-6 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Location</p>
              <p className="font-semibold text-lg">{company.location || 'Location not specified'}</p>
            </div>
          </div>
          
          {company.website && (
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Globe className="h-6 w-6 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Website</p>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-lg text-blue-600 hover:underline flex items-center">
                  Visit Website <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {stats && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Company Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{stats.activeJobs}</div>
                <div className="text-sm text-gray-600 font-medium">Active Jobs</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{stats.totalContacts}</div>
                <div className="text-sm text-gray-600 font-medium">Contacts</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">{stats.totalJobs}</div>
                <div className="text-sm text-gray-600 font-medium">Total Jobs</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{stats.notesCount}</div>
                <div className="text-sm text-gray-600 font-medium">Notes</div>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        {company.description && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{company.description}</p>
          </div>
        )}
      </div>

      {/* Notes Section */}
      <div className="w-full">
        <NotesPanel
          entityType="company"
          entityId={company.id}
          entityName={company.name}
        />
      </div>
    </div>
  );
};

export default CompanyDetails;
