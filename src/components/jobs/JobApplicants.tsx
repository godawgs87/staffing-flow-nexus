
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, MapPin, Calendar, ExternalLink, FileText, Linkedin } from 'lucide-react';
import { useJobApplications } from '@/hooks/useJobApplications';
import { format } from 'date-fns';

interface JobApplicantsProps {
  jobId: string;
  jobStatus: string;
}

const JobApplicants = ({ jobId, jobStatus }: JobApplicantsProps) => {
  const { data: applications = [], isLoading } = useJobApplications(jobId);

  // Only show applicants for active/open jobs
  if (jobStatus !== 'open' && jobStatus !== 'active') {
    return null;
  }

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

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'interviewed': return 'bg-purple-100 text-purple-800';
      case 'offered': return 'bg-orange-100 text-orange-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <User className="h-4 w-4 mr-2" />
            Applicants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-gray-500">Loading applicants...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <User className="h-4 w-4 mr-2" />
            Applicants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600">Candidates will appear here when they apply for this job.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <User className="h-4 w-4 mr-2" />
          Applicants ({applications.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((application) => {
            const candidate = application.candidates;
            if (!candidate) return null;

            return (
              <div key={application.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {candidate.first_name} {candidate.last_name}
                      </h4>
                      <p className="text-sm text-gray-600">{candidate.title || 'No title specified'}</p>
                      {candidate.email && (
                        <p className="text-sm text-gray-500">{candidate.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {candidate.linkedin_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(candidate.linkedin_url, '_blank')}
                        className="h-8 w-8 p-0"
                      >
                        <Linkedin className="h-3 w-3" />
                      </Button>
                    )}
                    {candidate.resume_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(candidate.resume_url, '_blank')}
                        className="h-8 w-8 p-0"
                      >
                        <FileText className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status}
                  </Badge>
                  <Badge className={getApplicationStatusColor(application.status)}>
                    App: {application.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                  {candidate.experience_years && (
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {candidate.experience_years} years exp
                    </div>
                  )}
                  {candidate.location && (
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {candidate.location}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Applied {format(new Date(application.applied_at), 'MMM d, yyyy')}
                  </div>
                </div>

                {application.notes && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                    <strong>Notes:</strong> {application.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobApplicants;
