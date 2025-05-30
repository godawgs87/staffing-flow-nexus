
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Candidates', value: '1,247', icon: Users, change: '+12%', color: 'text-blue-600' },
    { title: 'Active Jobs', value: '34', icon: Briefcase, change: '+3%', color: 'text-green-600' },
    { title: 'Applications', value: '892', icon: FileText, change: '+18%', color: 'text-purple-600' },
    { title: 'Placements', value: '23', icon: TrendingUp, change: '+5%', color: 'text-orange-600' },
  ];

  const recentApplications = [
    { name: 'Sarah Johnson', position: 'Senior Developer', status: 'Interview', avatar: 'SJ' },
    { name: 'Mike Chen', position: 'Product Manager', status: 'Review', avatar: 'MC' },
    { name: 'Emma Davis', position: 'UX Designer', status: 'Offer', avatar: 'ED' },
    { name: 'David Wilson', position: 'Data Analyst', status: 'Screening', avatar: 'DW' },
  ];

  const topJobs = [
    { title: 'Senior Frontend Developer', applications: 45, filled: 75 },
    { title: 'Product Manager', applications: 32, filled: 60 },
    { title: 'UX/UI Designer', applications: 28, filled: 85 },
    { title: 'DevOps Engineer', applications: 19, filled: 40 },
  ];

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
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">{app.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-600">{app.position}</p>
                    </div>
                  </div>
                  <Badge variant={
                    app.status === 'Offer' ? 'default' :
                    app.status === 'Interview' ? 'secondary' :
                    app.status === 'Review' ? 'outline' : 'secondary'
                  }>
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topJobs.map((job, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <span className="text-sm text-gray-600">{job.applications} applications</span>
                  </div>
                  <Progress value={job.filled} className="h-2" />
                  <p className="text-xs text-gray-500">{job.filled}% filled</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
