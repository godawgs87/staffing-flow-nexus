
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, MapPin, Clock, Users, Eye, Edit } from 'lucide-react';
import JobModal from './modals/JobModal';
import { useJobs } from '@/hooks/useJobs';
import { useCandidates } from '@/hooks/useCandidates';

const Jobs = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    job?: any;
  }>({
    isOpen: false,
    mode: 'add',
  });

  const { data: jobs = [], isLoading, error } = useJobs();
  const { data: candidates = [] } = useCandidates();

  // Calculate application counts for each job (simulated for now since we don't have job_applications data)
  const getJobStats = (jobId: string) => {
    // For demo purposes, we'll simulate some applications
    const applicationCount = Math.floor(Math.random() * 15) + 1;
    const progress = Math.min((applicationCount / 10) * 100, 100);
    return { applicationCount, progress };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'filled': return 'bg-purple-100 text-purple-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      case 'part-time': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openModal = (mode: 'add' | 'edit' | 'view', job?: any) => {
    setModalState({ isOpen: true, mode, job });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'add' });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Openings</h1>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Openings</h1>
            <p className="text-red-600">Error loading jobs: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total applications and interviews (simulated)
  const totalApplications = jobs.reduce((sum) => sum + getJobStats('dummy').applicationCount, 0);
  const totalInterviews = Math.floor(totalApplications * 0.3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Openings</h1>
          <p className="text-gray-600">Manage your open positions and requirements ({jobs.length} total)</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => openModal('add')}>
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{jobs.filter(job => job.status === 'open').length}</p>
              <p className="text-sm text-gray-600">Active Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{jobs.filter(job => job.status === 'filled').length}</p>
              <p className="text-sm text-gray-600">Filled Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{totalApplications}</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{totalInterviews}</p>
              <p className="text-sm text-gray-600">Interviews Scheduled</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => {
          const stats = getJobStats(job.id);
          
          return (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                      <Badge className={getTypeColor(job.job_type)}>
                        {job.job_type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="font-medium">{job.companies?.name || 'No company'}</span>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location || 'Location not specified'}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(job.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {stats.applicationCount} applications
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{job.description || 'No description provided'}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {job.salary_min && job.salary_max && (
                          <span className="text-lg font-semibold text-green-600">
                            ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Progress: {Math.round(stats.progress)}%</p>
                          <Progress value={stats.progress} className="w-32 h-2" />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Applications
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openModal('view', job)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => openModal('edit', job)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

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
