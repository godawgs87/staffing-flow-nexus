
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';
import { useCompanies } from '@/hooks/useCompanies';
import { useContacts } from '@/hooks/useContacts';
import { useCandidates } from '@/hooks/useCandidates';
import { useJobs } from '@/hooks/useJobs';

const Dashboard = () => {
  const { data: companies = [] } = useCompanies();
  const { data: contacts = [] } = useContacts();
  const { data: candidates = [] } = useCandidates();
  const { data: jobs = [] } = useJobs();

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
      title: 'Contacts', 
      value: contacts.length.toString(), 
      icon: TrendingUp, 
      change: '+5%', 
      color: 'text-orange-600' 
    },
  ];

  // Get recent candidates
  const recentCandidates = candidates
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4)
    .map(candidate => ({
      name: `${candidate.first_name} ${candidate.last_name}`,
      position: candidate.title || 'No title',
      status: candidate.status,
      avatar: `${candidate.first_name[0]}${candidate.last_name[0]}`
    }));

  // Get top jobs with realistic application counts
  const topJobs = jobs
    .filter(job => job.status === 'open')
    .slice(0, 4)
    .map(job => {
      // Simulate realistic application data
      const applications = Math.floor(Math.random() * 25) + 5;
      const progress = Math.min((applications / 20) * 100, 100);
      
      return {
        title: job.title,
        company: job.companies?.name || 'No company',
        applications: applications,
        filled: Math.round(progress)
      };
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your recruitment.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Candidates */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCandidates.map((candidate, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">{candidate.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{candidate.name}</p>
                      <p className="text-sm text-gray-600">{candidate.position}</p>
                    </div>
                  </div>
                  <Badge variant={
                    candidate.status === 'offer' ? 'default' :
                    candidate.status === 'interview' ? 'secondary' :
                    candidate.status === 'screening' ? 'outline' : 'secondary'
                  }>
                    {candidate.status}
                  </Badge>
                </div>
              ))}
              {recentCandidates.length === 0 && (
                <p className="text-center text-gray-500 py-4">No candidates yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Active Job Openings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topJobs.map((job, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-600">{job.applications} applications</span>
                  </div>
                  <Progress value={job.filled} className="h-2" />
                  <p className="text-xs text-gray-500">{job.filled}% progress</p>
                </div>
              ))}
              {topJobs.length === 0 && (
                <p className="text-center text-gray-500 py-4">No active jobs</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
