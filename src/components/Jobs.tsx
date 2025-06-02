
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Briefcase, Building2, MapPin, DollarSign, Calendar } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import JobModal from '@/components/modals/JobModal';

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

const Jobs = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    job?: Job;
  }>({
    isOpen: false,
    mode: 'add',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          companies (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Job[];
    },
  });

  const filteredJobs = React.useMemo(() => {
    let filtered = jobs;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.companies?.name?.toLowerCase().includes(term) ||
        job.location?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    return filtered;
  }, [jobs, searchTerm, statusFilter]);

  const openModal = (mode: 'add' | 'edit' | 'view', job?: Job) => {
    setModalState({ isOpen: true, mode, job });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'add' });
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) {
        throw new Error(error.message);
      }

      // Invalidate the query to refetch jobs
      queryClient.invalidateQueries({ queryKey: ['jobs'] });

      toast({
        title: 'Job Deleted',
        description: 'Job posting has been successfully deleted.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Failed to delete job: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6 h-full overflow-auto">
      {/* Header - Fixed at top */}
      <div className="sticky top-0 bg-gray-50 z-10 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Active Jobs</h1>
            <p className="text-gray-600">Manage job postings and track applications</p>
          </div>
          <Button onClick={() => openModal('add')}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex space-x-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="filled">Filled</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Jobs Grid - Scrollable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <div className="text-gray-500">Loading jobs...</div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Start by posting your first job'
              }
            </p>
            <Button onClick={() => openModal('add')}>
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <Card 
              key={job.id} 
              className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500"
              onClick={() => openModal('view', job)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                    <div className="text-sm text-gray-600 space-y-1">
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
                  </div>
                  <div className="flex space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal('edit', job);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this job?')) {
                          handleDeleteJob(job.id);
                        }
                      }}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      job.status === 'open' ? 'default' :
                      job.status === 'draft' ? 'secondary' :
                      job.status === 'paused' ? 'outline' :
                      job.status === 'filled' ? 'default' : 'destructive'
                    }>
                      {job.status}
                    </Badge>
                    <Badge variant="outline">
                      {job.job_type}
                    </Badge>
                  </div>
                  
                  {(job.salary_min || job.salary_max) && (
                    <div className="text-sm text-gray-700 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary_min && job.salary_max 
                        ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
                        : job.salary_min 
                        ? `$${job.salary_min.toLocaleString()}+`
                        : `Up to $${job.salary_max?.toLocaleString()}`
                      }
                    </div>
                  )}
                  
                  {job.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
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
          ))
        )}
      </div>

      {/* Job Modal */}
      <JobModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        job={modalState.job}
        mode={modalState.mode}
      />
    </div>
  );
};

export default Jobs;
