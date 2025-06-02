
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Briefcase } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import JobModal from '@/components/modals/JobModal';
import JobDetails from '@/components/JobDetails';
import JobListItem from '@/components/jobs/JobListItem';

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
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

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

  const deleteMutation = useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job Deleted',
        description: 'Job posting has been successfully deleted.',
      });
      if (selectedJob) {
        setSelectedJob(null);
        setIsDrawerOpen(false);
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to delete job: ${error.message}`,
        variant: 'destructive',
      });
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

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    if (isMobile) {
      setIsDrawerOpen(true);
    }
  };

  const handleJobView = (job: Job) => {
    openModal('view', job);
  };

  const handleJobEdit = (job: Job) => {
    openModal('edit', job);
  };

  const handleJobDelete = (jobId: string) => {
    deleteMutation.mutate(jobId);
  };

  return (
    <div className="flex h-full">
      {/* Left Panel - Jobs List */}
      <div className={`${isMobile ? 'w-full' : selectedJob ? 'w-1/2' : 'w-full'} flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b bg-white">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Jobs</h1>
              <p className="text-sm text-gray-600">Manage job postings and applications</p>
            </div>
            <Button onClick={() => openModal('add')}>
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-3">
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
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
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

        {/* Jobs List */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-gray-500">Loading jobs...</div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
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
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <JobListItem
                  key={job.id}
                  job={job}
                  isSelected={selectedJob?.id === job.id}
                  onSelect={handleJobSelect}
                  onView={handleJobView}
                  onEdit={handleJobEdit}
                  onDelete={handleJobDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Job Details (Desktop) */}
      {!isMobile && selectedJob && (
        <div className="w-1/2 border-l bg-gray-50 overflow-y-auto">
          <JobDetails
            job={selectedJob}
            onEdit={() => handleJobEdit(selectedJob)}
          />
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="max-h-[90vh] overflow-y-auto">
            {selectedJob && (
              <JobDetails
                job={selectedJob}
                onEdit={() => handleJobEdit(selectedJob)}
                onClose={() => setIsDrawerOpen(false)}
              />
            )}
          </DrawerContent>
        </Drawer>
      )}

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
