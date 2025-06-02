
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Edit, Globe, MapPin, Users, Briefcase } from 'lucide-react';
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
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">{company.name}</CardTitle>
                <p className="text-gray-600">{company.industry || 'No industry specified'}</p>
              </div>
            </div>
            <Button onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-400" />
              <span>{company.size || 'Size not specified'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span>{company.location || 'Location not specified'}</span>
            </div>
            {company.website && (
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-400" />
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {company.website}
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Company Stats */}
        {stats && (
          <Card>
            <CardHeader>
              <CardTitle>Company Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
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
            </CardContent>
          </Card>
        )}

        {/* Description */}
        {company.description && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{company.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Notes Section */}
        <div className="lg:col-span-2">
          <NotesPanel
            entityType="company"
            entityId={company.id}
            entityName={company.name}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
