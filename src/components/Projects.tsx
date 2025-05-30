
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, MapPin, Clock, DollarSign, Users, Building } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Digital Transformation Consulting',
      client: 'TechCorp Inc.',
      type: 'Consulting',
      workType: 'Contract',
      value: '$250,000',
      duration: '6 months',
      status: 'Active',
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      team: 5,
      location: 'New York, NY',
      description: 'Complete digital transformation initiative including system modernization and process optimization.'
    },
    {
      id: 2,
      title: 'Staff Augmentation - Development Team',
      client: 'StartupXYZ',
      type: 'Staffing',
      workType: 'Contingent',
      value: '$180,000',
      duration: '12 months',
      status: 'Active',
      progress: 40,
      startDate: '2024-03-01',
      endDate: '2025-03-01',
      team: 8,
      location: 'San Francisco, CA',
      description: 'Providing skilled developers for product development and scaling initiatives.'
    },
    {
      id: 3,
      title: 'Executive Search - CTO Position',
      client: 'GrowthCorp',
      type: 'Direct Placement',
      workType: 'Direct Hire',
      value: '$45,000',
      duration: '3 months',
      status: 'Completed',
      progress: 100,
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      team: 2,
      location: 'Austin, TX',
      description: 'Executive search for Chief Technology Officer position.'
    },
    {
      id: 4,
      title: 'Contract-to-Hire Development Team',
      client: 'InnovateInc',
      type: 'Staffing',
      workType: 'Contract-to-Hire',
      value: '$320,000',
      duration: '18 months',
      status: 'Proposal',
      progress: 10,
      startDate: '2024-06-01',
      endDate: '2025-12-01',
      team: 12,
      location: 'Remote',
      description: 'Building a full-stack development team with option to convert to permanent.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Consulting': return 'bg-blue-100 text-blue-800';
      case 'Staffing': return 'bg-orange-100 text-orange-800';
      case 'Direct Placement': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkTypeColor = (workType: string) => {
    switch (workType) {
      case 'Contract': return 'bg-cyan-100 text-cyan-800';
      case 'Contingent': return 'bg-teal-100 text-teal-800';
      case 'Contract-to-Hire': return 'bg-indigo-100 text-indigo-800';
      case 'Direct Hire': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage SOW opportunities and service-based work</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600">Active Projects</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">$1.2M</p>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">8</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">45</p>
              <p className="text-sm text-gray-600">Team Members</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <Badge className={getTypeColor(project.type)}>
                      {project.type}
                    </Badge>
                    <Badge className={getWorkTypeColor(project.workType)}>
                      {project.workType}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {project.client}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {project.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {project.team} team members
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-lg font-semibold text-green-600">{project.value}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>{project.startDate} - {project.endDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Progress: {project.progress}%</p>
                        <Progress value={project.progress} className="w-32 h-2" />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Manage
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

export default Projects;
