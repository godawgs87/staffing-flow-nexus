
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Briefcase, Building2, Calendar, Search, Filter, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const ApplicationsPipeline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['applications-pipeline'],
    queryFn: async () => {
      console.log('Fetching applications for pipeline view...');
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          candidates (
            id,
            first_name,
            last_name,
            email,
            title,
            status,
            experience_years,
            location
          ),
          jobs (
            id,
            title,
            status,
            companies (
              name
            )
          )
        `)
        .order('applied_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }
      
      console.log('Applications fetched for pipeline:', data);
      return data;
    },
  });

  const { data: jobs = [] } = useQuery({
    queryKey: ['jobs-for-filter'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('id, title')
        .eq('status', 'open')
        .order('title');
      
      if (error) throw error;
      return data;
    },
  });

  const filteredApplications = React.useMemo(() => {
    let filtered = applications;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        `${app.candidates?.first_name} ${app.candidates?.last_name}`.toLowerCase().includes(term) ||
        app.jobs?.title?.toLowerCase().includes(term) ||
        app.jobs?.companies?.name?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (jobFilter !== 'all') {
      filtered = filtered.filter(app => app.job_id === jobFilter);
    }

    return filtered;
  }, [applications, searchTerm, statusFilter, jobFilter]);

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

  const statusCounts = React.useMemo(() => {
    return applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [applications]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications Pipeline</h1>
          <p className="text-gray-600">Track candidate progress through the hiring process</p>
        </div>
      </div>

      {/* Pipeline Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { status: 'applied', label: 'Applied', color: 'bg-blue-100 text-blue-800' },
          { status: 'screening', label: 'Screening', color: 'bg-yellow-100 text-yellow-800' },
          { status: 'interview', label: 'Interview', color: 'bg-purple-100 text-purple-800' },
          { status: 'offer', label: 'Offer', color: 'bg-orange-100 text-orange-800' },
          { status: 'hired', label: 'Hired', color: 'bg-green-100 text-green-800' },
          { status: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
        ].map((item) => (
          <Card key={item.status} className="text-center">
            <CardContent className="p-4">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.color} mb-2`}>
                {item.label}
              </div>
              <p className="text-2xl font-bold">{statusCounts[item.status] || 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates or jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Jobs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Applications ({filteredApplications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' || jobFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Applications will appear here as candidates apply to jobs'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900">
                            {application.candidates?.first_name} {application.candidates?.last_name}
                          </h3>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {application.candidates?.title || 'No title specified'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-3 w-3" />
                            <span className="truncate">{application.jobs?.title}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-3 w-3" />
                            <span className="truncate">{application.jobs?.companies?.name || 'No company'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Applied {format(new Date(application.applied_at), 'MMM d')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 ml-4">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                  {application.notes && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-gray-600">{application.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsPipeline;
