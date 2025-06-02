
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, DollarSign, Calendar, User, Briefcase, Edit, X } from 'lucide-react';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import NotesPanel from './notes/NotesPanel';

interface JobDetailsProps {
  job: any;
  onEdit: () => void;
  onClose?: () => void;
}

const JobDetails = ({ job, onEdit, onClose }: JobDetailsProps) => {
  const isMobile = useIsMobile();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'filled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-blue-100 text-blue-800';
      case 'part-time': return 'bg-purple-100 text-purple-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full space-y-4 p-4">
      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <div className="flex justify-end">
          <Button onClick={onClose} size="sm" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  {job.companies?.name || 'No company'}
                </div>
                {job.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(job.status)}>
                  {job.status}
                </Badge>
                <Badge className={getTypeColor(job.job_type)}>
                  {job.job_type}
                </Badge>
              </div>
            </div>
            <Button onClick={onEdit} size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Salary Information */}
        {(job.salary_min || job.salary_max) && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Salary Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                {job.salary_min && job.salary_max 
                  ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
                  : job.salary_min 
                  ? `$${job.salary_min.toLocaleString()}+`
                  : `Up to $${job.salary_max?.toLocaleString()}`
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Dates */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Important Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-gray-600">Posted:</span>
              <p className="font-medium">{format(new Date(job.created_at), 'PPP')}</p>
            </div>
            {job.start_date && (
              <div>
                <span className="text-sm text-gray-600">Start Date:</span>
                <p className="font-medium">{format(new Date(job.start_date), 'PPP')}</p>
              </div>
            )}
            {job.end_date && (
              <div>
                <span className="text-sm text-gray-600">End Date:</span>
                <p className="font-medium">{format(new Date(job.end_date), 'PPP')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      {job.description && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Requirements */}
      {job.requirements && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <User className="h-4 w-4 mr-2" />
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">{job.requirements}</p>
          </CardContent>
        </Card>
      )}

      {/* Notes Section */}
      <div className="w-full">
        <NotesPanel
          entityType="job"
          entityId={job.id}
          entityName={job.title}
        />
      </div>
    </div>
  );
};

export default JobDetails;
