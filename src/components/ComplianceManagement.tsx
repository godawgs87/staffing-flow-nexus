
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  FileText,
  Globe,
  Building,
  User,
  Search
} from 'lucide-react';

const ComplianceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const locationRequirements = [
    {
      location: 'California',
      type: 'State',
      requirements: [
        { name: 'Workers Compensation Insurance', status: 'required', category: 'insurance' },
        { name: 'State Disability Insurance', status: 'required', category: 'insurance' },
        { name: 'Privacy Training (CCPA)', status: 'required', category: 'training' },
        { name: 'Sexual Harassment Training', status: 'required', category: 'training' }
      ],
      lastUpdated: '2024-05-15'
    },
    {
      location: 'New York',
      type: 'State',
      requirements: [
        { name: 'Disability Benefits Law', status: 'required', category: 'insurance' },
        { name: 'Paid Family Leave', status: 'required', category: 'insurance' },
        { name: 'Workplace Safety Training', status: 'required', category: 'training' }
      ],
      lastUpdated: '2024-05-10'
    },
    {
      location: 'Remote (Multi-State)',
      type: 'Special',
      requirements: [
        { name: 'Tax Nexus Compliance', status: 'conditional', category: 'tax' },
        { name: 'Data Privacy Training', status: 'required', category: 'training' },
        { name: 'Remote Work Agreement', status: 'required', category: 'legal' }
      ],
      lastUpdated: '2024-06-01'
    }
  ];

  const roleRequirements = [
    {
      role: 'Software Developer',
      level: 'Senior',
      requirements: [
        { name: 'Security Clearance Check', status: 'conditional', category: 'background' },
        { name: 'Technical Certifications', status: 'preferred', category: 'certification' },
        { name: 'Code Review Training', status: 'required', category: 'training' }
      ]
    },
    {
      role: 'Financial Analyst',
      level: 'All Levels',
      requirements: [
        { name: 'FINRA Background Check', status: 'required', category: 'background' },
        { name: 'Anti-Money Laundering Training', status: 'required', category: 'training' },
        { name: 'Series 7 License', status: 'conditional', category: 'certification' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'required': return 'bg-red-100 text-red-800';
      case 'conditional': return 'bg-yellow-100 text-yellow-800';
      case 'preferred': return 'bg-green-100 text-green-800';
      case 'compliant': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'insurance': return Shield;
      case 'training': return FileText;
      case 'tax': return Building;
      case 'legal': return CheckCircle;
      case 'background': return User;
      case 'certification': return AlertTriangle;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Management</h1>
          <p className="text-gray-600">Location and role-based compliance tracking</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Run Compliance Check
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Compliance Rules</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Locations Covered</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Non-Compliant Items</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Auto-Updates</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-gray-500">this month</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search compliance requirements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="location" className="space-y-4">
        <TabsList>
          <TabsTrigger value="location">Location-Based</TabsTrigger>
          <TabsTrigger value="role">Role-Based</TabsTrigger>
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          <TabsTrigger value="updates">Regulation Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="location" className="space-y-4">
          {locationRequirements.map((location, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {location.location}
                    <Badge className="ml-2">{location.type}</Badge>
                  </div>
                  <span className="text-sm text-gray-500">Updated: {location.lastUpdated}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {location.requirements.map((req, reqIndex) => {
                    const Icon = getCategoryIcon(req.category);
                    return (
                      <div key={reqIndex} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Icon className="h-5 w-5 mt-0.5 text-gray-600" />
                          <div>
                            <h4 className="font-medium text-sm">{req.name}</h4>
                            <p className="text-xs text-gray-500 capitalize">{req.category}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(req.status)}>
                          {req.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="role" className="space-y-4">
          {roleRequirements.map((role, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {role.role}
                  <Badge className="ml-2">{role.level}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {role.requirements.map((req, reqIndex) => {
                    const Icon = getCategoryIcon(req.category);
                    return (
                      <div key={reqIndex} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Icon className="h-5 w-5 mt-0.5 text-gray-600" />
                          <div>
                            <h4 className="font-medium text-sm">{req.name}</h4>
                            <p className="text-xs text-gray-500 capitalize">{req.category}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(req.status)}>
                          {req.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Live Compliance Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Real-time Compliance Tracking</h3>
                <p className="text-gray-600">Monitor compliance status across all active placements and contracts</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Regulation Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Automated Regulation Tracking</h3>
                <p className="text-gray-600">Stay updated with the latest compliance requirements and regulatory changes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceManagement;
