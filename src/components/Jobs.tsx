
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, MapPin, Clock, Users } from 'lucide-react';

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$120k - $150k',
      applications: 45,
      status: 'Active',
      posted: '3 days ago',
      filled: 75,
      description: 'We are looking for a Senior Frontend Developer to join our dynamic team...'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$140k - $180k',
      applications: 32,
      status: 'Active',
      posted: '1 week ago',
      filled: 60,
      description: 'Join our product team and help shape the future of our platform...'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'Remote',
      type: 'Contract',
      salary: '$80k - $100k',
      applications: 28,
      status: 'Filled',
      posted: '2 weeks ago',
      filled: 100,
      description: 'Create amazing user experiences for our digital products...'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110k - $140k',
      applications: 19,
      status: 'Active',
      posted: '5 days ago',
      filled: 40,
      description: 'Help us scale our infrastructure and improve deployment processes...'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Filled': return 'bg-purple-100 text-purple-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time': return 'bg-blue-100 text-blue-800';
      case 'Contract': return 'bg-orange-100 text-orange-800';
      case 'Part-time': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Openings</h1>
          <p className="text-gray-600">Manage your open positions and requirements</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">34</p>
              <p className="text-sm text-gray-600">Active Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-sm text-gray-600">Filled This Month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">124</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">18</p>
              <p className="text-sm text-gray-600">Interviews Scheduled</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                    <Badge className={getTypeColor(job.type)}>
                      {job.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className="font-medium">{job.company}</span>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {job.applications} applications
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-green-600">{job.salary}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Progress: {job.filled}%</p>
                        <Progress value={job.filled} className="w-32 h-2" />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Applications
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Edit Job
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
