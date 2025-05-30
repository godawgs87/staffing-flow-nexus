
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, CheckCircle, Users, Briefcase, Building } from 'lucide-react';

const WorkflowSettings = () => {
  const [workTypeSettings, setWorkTypeSettings] = useState({
    contingent: true,
    contractToHire: true,
    staffing: true,
    directPlacement: true,
    consulting: true,
    projectBased: true
  });

  const [featureToggles, setFeatureToggles] = useState({
    candidatePipeline: true,
    projectManagement: true,
    timeTracking: false,
    invoicing: true,
    clientPortal: false,
    advancedReporting: true,
    emailIntegration: true,
    calendarSync: false
  });

  const workTypes = [
    {
      key: 'contingent',
      name: 'Contingent Staffing',
      description: 'Temporary staffing with flexible arrangements',
      icon: Users,
      workflows: ['Candidate sourcing', 'Client matching', 'Placement tracking']
    },
    {
      key: 'contractToHire',
      name: 'Contract-to-Hire',
      description: 'Temporary contracts with permanent conversion option',
      icon: Briefcase,
      workflows: ['Contract placement', 'Performance tracking', 'Conversion management']
    },
    {
      key: 'staffing',
      name: 'Direct Staffing',
      description: 'Traditional staffing and recruitment services',
      icon: Users,
      workflows: ['Recruitment pipeline', 'Interview coordination', 'Onboarding']
    },
    {
      key: 'directPlacement',
      name: 'Direct Placement',
      description: 'Executive search and direct hire services',
      icon: CheckCircle,
      workflows: ['Executive search', 'Candidate assessment', 'Offer negotiation']
    },
    {
      key: 'consulting',
      name: 'Consulting Services',
      description: 'Strategic consulting and advisory services',
      icon: Building,
      workflows: ['Project scoping', 'Deliverable tracking', 'Client engagement']
    },
    {
      key: 'projectBased',
      name: 'Project-Based Work',
      description: 'SOW-based projects and service delivery',
      icon: Settings,
      workflows: ['SOW management', 'Milestone tracking', 'Resource allocation']
    }
  ];

  const features = [
    {
      key: 'candidatePipeline',
      name: 'Candidate Pipeline',
      description: 'Advanced candidate tracking and pipeline management'
    },
    {
      key: 'projectManagement',
      name: 'Project Management',
      description: 'SOW and project-based work management'
    },
    {
      key: 'timeTracking',
      name: 'Time Tracking',
      description: 'Track time spent on projects and placements'
    },
    {
      key: 'invoicing',
      name: 'Invoicing & Billing',
      description: 'Generate invoices and manage billing'
    },
    {
      key: 'clientPortal',
      name: 'Client Portal',
      description: 'Self-service portal for clients'
    },
    {
      key: 'advancedReporting',
      name: 'Advanced Reporting',
      description: 'Detailed analytics and custom reports'
    },
    {
      key: 'emailIntegration',
      name: 'Email Integration',
      description: 'Sync with email providers'
    },
    {
      key: 'calendarSync',
      name: 'Calendar Sync',
      description: 'Integrate with calendar applications'
    }
  ];

  const handleWorkTypeToggle = (key: string) => {
    setWorkTypeSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFeatureToggle = (key: string) => {
    setFeatureToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Workflow Settings</h1>
        <p className="text-gray-600">Configure work types and feature toggles for your organization</p>
      </div>

      {/* Work Types Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Work Types & Workflows
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {workTypes.map((workType) => {
            const Icon = workType.icon;
            const isEnabled = workTypeSettings[workType.key];
            
            return (
              <div key={workType.key} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon className={`h-6 w-6 mt-1 ${isEnabled ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{workType.name}</h3>
                      {isEnabled && <Badge className="bg-green-100 text-green-800">Active</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{workType.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {workType.workflows.map((workflow, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {workflow}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={() => handleWorkTypeToggle(workType.key)}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Feature Toggles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => {
              const isEnabled = featureToggles[feature.key];
              
              return (
                <div key={feature.key} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{feature.name}</h3>
                      {isEnabled && <Badge className="bg-green-100 text-green-800">Enabled</Badge>}
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={() => handleFeatureToggle(feature.key)}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default WorkflowSettings;
