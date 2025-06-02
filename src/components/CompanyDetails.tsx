
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Edit, Globe, MapPin, Users, Briefcase, ExternalLink } from 'lucide-react';
import NotesPanel from './notes/NotesPanel';

interface CompanyDetailsProps {
  company: any;
  onEdit: () => void;
  stats?: {
    activeJobs: number;
    totalContacts: number;
    totalJobs: number;
    notesCount: number;
  };
}

const CompanyDetails = ({ company, onEdit, stats }: CompanyDetailsProps) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-gray-600">{company.industry || 'No industry specified'}</p>
            </div>
          </div>
          <Button onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Company Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Company Size</p>
              <p className="font-medium">{company.size || 'Size not specified'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{company.location || 'Location not specified'}</p>
            </div>
          </div>
          {company.website && (
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center">
                  Visit Website <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {stats && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Company Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-blue-600">{stats.activeJobs}</div>
                <div className="text-sm text-gray-500">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-green-600">{stats.totalContacts}</div>
                <div className="text-sm text-gray-500">Contacts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-orange-600">{stats.totalJobs}</div>
                <div className="text-sm text-gray-500">Total Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-purple-600">{stats.notesCount}</div>
                <div className="text-sm text-gray-500">Notes</div>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        {company.description && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <p className="text-gray-700">{company.description}</p>
          </div>
        )}
      </div>

      {/* Notes Section */}
      <NotesPanel
        entityType="company"
        entityId={company.id}
        entityName={company.name}
      />
    </div>
  );
};

export default CompanyDetails;
