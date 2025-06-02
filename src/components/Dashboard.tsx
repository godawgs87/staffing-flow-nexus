
import React from 'react';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';
import { useCompanies } from '@/hooks/useCompanies';
import { useContacts } from '@/hooks/useContacts';
import { useCandidates } from '@/hooks/useCandidates';
import { useJobs } from '@/hooks/useJobs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import MetricsCard from './dashboard/MetricsCard';
import ApplicationsChart from './dashboard/ApplicationsChart';
import PipelineChart from './dashboard/PipelineChart';
import RecentActivity from './dashboard/RecentActivity';

const Dashboard = () => {
  const { data: companies = [] } = useCompanies();
  const { data: contacts = [] } = useContacts();
  const { data: candidates = [] } = useCandidates();
  const { data: jobs = [] } = useJobs();

  // Fetch notes count
  const { data: notesData = [] } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('id');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch applications for analytics
  const { data: applications = [] } = useQuery({
    queryKey: ['applications-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('applied_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const stats = [
    { 
      title: 'Total Candidates', 
      value: candidates.length.toString(), 
      icon: Users, 
      change: '+12%', 
      color: 'text-blue-600' 
    },
    { 
      title: 'Active Jobs', 
      value: jobs.filter(job => job.status === 'open').length.toString(), 
      icon: Briefcase, 
      change: '+3%', 
      color: 'text-green-600' 
    },
    { 
      title: 'Companies', 
      value: companies.length.toString(), 
      icon: FileText, 
      change: '+8%', 
      color: 'text-purple-600' 
    },
    { 
      title: 'Total Applications', 
      value: applications.length.toString(), 
      icon: TrendingUp, 
      change: '+15%', 
      color: 'text-orange-600' 
    },
  ];

  // Generate chart data
  const chartData = [
    { month: 'Jan', applications: 45, hired: 8 },
    { month: 'Feb', applications: 52, hired: 12 },
    { month: 'Mar', applications: 38, hired: 6 },
    { month: 'Apr', applications: 61, hired: 15 },
    { month: 'May', applications: 47, hired: 9 },
    { month: 'Jun', applications: 55, hired: 11 },
  ];

  // Pipeline distribution data
  const pipelineData = [
    { name: 'Applied', value: applications.filter(app => app.status === 'applied').length, color: '#3b82f6' },
    { name: 'Screening', value: applications.filter(app => app.status === 'screening').length, color: '#eab308' },
    { name: 'Interview', value: applications.filter(app => app.status === 'interview').length, color: '#a855f7' },
    { name: 'Offer', value: applications.filter(app => app.status === 'offer').length, color: '#f97316' },
    { name: 'Hired', value: applications.filter(app => app.status === 'hired').length, color: '#10b981' },
    { name: 'Rejected', value: applications.filter(app => app.status === 'rejected').length, color: '#ef4444' },
  ];

  // Generate recent activity data
  const recentActivities = React.useMemo(() => {
    const activities = [];
    
    // Add recent applications
    applications.slice(0, 3).forEach(app => {
      activities.push({
        id: `app-${app.id}`,
        type: 'application' as const,
        message: `New application received`,
        timestamp: new Date(app.applied_at),
        status: app.status
      });
    });

    // Add recent candidates
    candidates.slice(0, 2).forEach(candidate => {
      activities.push({
        id: `candidate-${candidate.id}`,
        type: 'application' as const,
        message: `${candidate.first_name} ${candidate.last_name} added to system`,
        timestamp: new Date(candidate.created_at),
        status: candidate.status
      });
    });

    // Add recent jobs
    jobs.slice(0, 2).forEach(job => {
      activities.push({
        id: `job-${job.id}`,
        type: 'new_job' as const,
        message: `New job posted: ${job.title}`,
        timestamp: new Date(job.created_at),
        status: job.status
      });
    });

    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 8);
  }, [applications, candidates, jobs]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your recruitment.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <MetricsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationsChart data={chartData} />
        <PipelineChart data={pipelineData} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  );
};

export default Dashboard;
