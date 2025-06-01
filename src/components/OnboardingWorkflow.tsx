import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  FileText, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Smartphone,
  MapPin,
  Upload
} from 'lucide-react';

const OnboardingWorkflow = () => {
  const [activeTab, setActiveTab] = useState('active');

  const onboardingSteps = [
    { id: 1, name: 'Basic Information', icon: User, status: 'completed' },
    { id: 2, name: 'Document Collection', icon: FileText, status: 'completed' },
    { id: 3, name: 'Background Check', icon: Shield, status: 'in-progress' },
    { id: 4, name: 'Compliance Verification', icon: CheckCircle, status: 'pending' },
    { id: 5, name: 'Final Approval', icon: Clock, status: 'pending' }
  ];

  const candidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Software Developer',
      client: 'TechCorp Inc.',
      progress: 60,
      currentStep: 'Background Check',
      urgency: 'high',
      startDate: '2024-06-15',
      documents: {
        i9: 'completed',
        w4: 'completed',
        directDeposit: 'pending',
        handbook: 'completed'
      },
      compliance: {
        backgroundCheck: 'in-progress',
        drugTest: 'completed',
        references: 'completed'
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Project Manager',
      client: 'Global Solutions',
      progress: 80,
      currentStep: 'Final Approval',
      urgency: 'medium',
      startDate: '2024-06-20',
      documents: {
        i9: 'completed',
        w4: 'completed',
        directDeposit: 'completed',
        handbook: 'completed'
      },
      compliance: {
        backgroundCheck: 'completed',
        drugTest: 'completed',
        references: 'completed'
      }
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Marketing Specialist',
      client: 'Creative Agency',
      progress: 25,
      currentStep: 'Document Collection',
      urgency: 'low',
      startDate: '2024-07-01',
      documents: {
        i9: 'pending',
        w4: 'completed',
        directDeposit: 'pending',
        handbook: 'pending'
      },
      compliance: {
        backgroundCheck: 'pending',
        drugTest: 'pending',
        references: 'pending'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Onboarding Workflow</h1>
          <p className="text-gray-600">Streamlined digital onboarding with automated compliance tracking</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <User className="h-4 w-4 mr-2" />
          Start New Onboarding
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Onboarding</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed This Week</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Documents</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Completion Time</p>
                <p className="text-2xl font-bold">3.2</p>
                <p className="text-xs text-gray-500">days</p>
              </div>
              <AlertCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onboarding Pipeline */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Onboarding (3)</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{candidate.name}</h3>
                      <Badge className={getUrgencyColor(candidate.urgency)}>
                        {candidate.urgency} priority
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Position:</strong> {candidate.position}</p>
                      <p><strong>Client:</strong> {candidate.client}</p>
                      <p><strong>Start Date:</strong> {candidate.startDate}</p>
                      <p><strong>Current Step:</strong> {candidate.currentStep}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-2">
                      Progress: {candidate.progress}%
                    </div>
                    <Progress value={candidate.progress} className="w-32" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Documents Section */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Documents
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(candidate.documents).map(([doc, status]) => (
                        <div key={doc} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{doc.replace(/([A-Z])/g, ' $1')}</span>
                          <Badge className={getStatusColor(status)}>
                            {status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compliance Section */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Compliance
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(candidate.compliance).map(([item, status]) => (
                        <div key={item} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{item.replace(/([A-Z])/g, ' $1')}</span>
                          <Badge className={getStatusColor(status)}>
                            {status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Send Reminder
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Completed Onboarding</h3>
              <p className="text-gray-600">View and manage completed onboarding records</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Onboarding Templates</h3>
              <p className="text-gray-600">Create and manage onboarding templates for different positions and clients</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnboardingWorkflow;
