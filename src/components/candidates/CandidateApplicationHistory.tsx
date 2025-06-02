
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, Building2, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface CandidateApplicationHistoryProps {
  candidateId: string;
}

const CandidateApplicationHistory = ({ candidateId }: CandidateApplicationHistoryProps) => {
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['candidate-applications', candidateId],
    queryFn: async () => {
      console.log('Fetching applications for candidate:', candidateId);
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          jobs (
            id,
            title,
            status,
            companies (
              name
            )
          )
        `)
        .eq('candidate_id', candidateId)
        .order('applied_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching candidate applications:', error);
        throw error;
      }
      
      console.log('Candidate applications fetched:', data);
      return data;
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'offer': return 'bg-orange-100 text-orange-800';
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
            <Briefcase className="h-4 w-4 mr-2" />
            Application History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Loading applications...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <Briefcase className="h-4 w-4 mr-2" />
          Application History ({applications.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No applications found for this candidate
          </p>
        ) : (
          <div className="space-y-3">
            {applications.map((application) => (
              <div key={application.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{application.jobs?.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                      <Building2 className="h-3 w-3" />
                      <span>{application.jobs?.companies?.name || 'No company'}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>Applied {format(new Date(application.applied_at), 'MMM d, yyyy')}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/jobs`} className="flex items-center">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Job
                    </a>
                  </Button>
                </div>
                
                {application.notes && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-xs text-gray-600">{application.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidateApplicationHistory;
