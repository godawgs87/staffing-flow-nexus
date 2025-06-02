
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
    <div className="w-full space-y-3 p-3">
      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <div className="flex justify-end">
          <Button onClick={onClose} size="sm" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border p-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 mb-1">{company.name}</h1>
              <p className="text-sm text-gray-600">{company.industry || 'No industry'}</p>
            </div>
          </div>
          <Button onClick={onEdit} size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        {/* Company Information - Compact Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
            <Users className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Size</p>
              <p className="text-sm font-medium">{company.size || 'Not specified'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
            <MapPin className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium">{company.location || 'Not specified'}</p>
            </div>
          </div>
          
          {company.website && (
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded md:col-span-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Website</p>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
                  Visit <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {stats && (
          <div className="mt-3 pt-3 border-t">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-600">{stats.activeJobs}</div>
                <div className="text-xs text-gray-600">Active Jobs</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-600">{stats.totalContacts}</div>
                <div className="text-xs text-gray-600">Contacts</div>
              </div>
              <div className="text-center p-2 bg-orange-50 rounded">
                <div className="text-lg font-bold text-orange-600">{stats.totalJobs}</div>
                <div className="text-xs text-gray-600">Total Jobs</div>
              </div>
              <div className="text-center p-2 bg-purple-50 rounded">
                <div className="text-lg font-bold text-purple-600">{stats.notesCount}</div>
                <div className="text-xs text-gray-600">Notes</div>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        {company.description && (
          <div className="mt-3 pt-3 border-t">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed text-xs">{company.description}</p>
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
