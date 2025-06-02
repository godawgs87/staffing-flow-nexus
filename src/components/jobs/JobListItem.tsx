
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, DollarSign, Calendar, Edit, Trash2 } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company_id: string;
  contact_id: string;
  description: string;
  location: string;
  job_type: string;
  salary_min: number;
  salary_max: number;
  status: string;
  created_at: string;
  companies?: { name: string };
}

interface JobListItemProps {
  job: Job;
  isSelected: boolean;
  onSelect: (job: Job) => void;
  onView: (job: Job) => void;
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
}

const JobListItem = ({ job, isSelected, onSelect, onView, onEdit, onDelete }: JobListItemProps) => {
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

  return (
    <Card 
      className={`hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-blue-500 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => onSelect(job)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-base mb-1">{job.title}</CardTitle>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center">
                <Building2 className="h-3 w-3 mr-1" />
                {job.companies?.name || 'No company'}
              </div>
              {job.location && (
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {job.location}
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView(job);
              }}
              className="h-7 w-12 text-xs"
            >
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(job);
              }}
              className="h-7 w-7 p-0"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this job?')) {
                  onDelete(job.id);
                }
              }}
              className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge className={`${getStatusColor(job.status)} text-xs`}>
              {job.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {job.job_type}
            </Badge>
          </div>
          
          {(job.salary_min || job.salary_max) && (
            <div className="text-sm text-gray-700 flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              {job.salary_min && job.salary_max 
                ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
                : job.salary_min 
                ? `$${job.salary_min.toLocaleString()}+`
                : `Up to $${job.salary_max?.toLocaleString()}`
              }
            </div>
          )}
          
          {job.description && (
            <p className="text-xs text-gray-600 line-clamp-2">
              {job.description}
            </p>
          )}
          
          <div className="text-xs text-gray-500 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            Posted {new Date(job.created_at).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListItem;
