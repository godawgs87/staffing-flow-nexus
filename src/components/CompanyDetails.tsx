
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
    <div className="h-full w-full space-y-8">
      {/* Header Section - Full width */}
      <div className="bg-white rounded-lg shadow-sm border p-8 w-full">
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

        {/* Company Information Grid - Full width utilization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 w-full">
          <div className="flex items-center space-x-4">
            <Users className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Company Size</p>
              <p className="font-semibold text-lg">{company.size || 'Size not specified'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Location</p>
              <p className="font-semibold text-lg">{company.location || 'Location not specified'}</p>
            </div>
          </div>
          {company.website && (
            <div className="flex items-center space-x-4">
              <Globe className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Website</p>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-lg text-blue-600 hover:underline flex items-center">
                  Visit Website <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Stats - Full width */}
        {stats && (
          <div className="mt-8 pt-8 border-t w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Company Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
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

        {/* Description - Full width */}
        {company.description && (
          <div className="mt-8 pt-8 border-t w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{company.description}</p>
          </div>
        )}
      </div>

      {/* Notes Section - Full width */}
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
