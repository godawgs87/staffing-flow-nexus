
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Briefcase, CheckCircle, Building, Settings } from 'lucide-react';
import SystemHealthMetrics from './admin/SystemHealthMetrics';
import APIManagement from './admin/APIManagement';
import JobBoardIntegrations from './admin/JobBoardIntegrations';
import WorkflowConfiguration from './admin/WorkflowConfiguration';
import TeamManagement from './admin/TeamManagement';
import SystemSettings from './admin/SystemSettings';
import AnalyticsOverview from './admin/AnalyticsOverview';

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState('admin'); // admin, manager, recruiter

  // Job Board API Integrations
  const [jobBoardApis, setJobBoardApis] = useState([
    { name: 'LinkedIn Jobs API', status: 'connected', lastSync: '1 hour ago', jobs: 45 },
    { name: 'Indeed API', status: 'connected', lastSync: '30 minutes ago', jobs: 78 },
    { name: 'ZipRecruiter API', status: 'disconnected', lastSync: '3 days ago', jobs: 0 },
    { name: 'Glassdoor API', status: 'connected', lastSync: '2 hours ago', jobs: 23 }
  ]);

  // Workflow Settings
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

  const [apiKeys, setApiKeys] = useState([
    { name: 'Production API', key: 'sk-prod-***************', status: 'active', lastUsed: '2 minutes ago' },
    { name: 'Development API', key: 'sk-dev-***************', status: 'active', lastUsed: '1 hour ago' },
    { name: 'Webhook API', key: 'sk-hook-***************', status: 'inactive', lastUsed: '3 days ago' }
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { name: 'Sarah Johnson', email: 'sarah@company.com', role: 'admin', status: 'active', lastLogin: '5 minutes ago' },
    { name: 'Mike Chen', email: 'mike@company.com', role: 'manager', status: 'active', lastLogin: '2 hours ago' },
    { name: 'Emily Rodriguez', email: 'emily@company.com', role: 'recruiter', status: 'active', lastLogin: '1 day ago' },
    { name: 'David Kim', email: 'david@company.com', role: 'recruiter', status: 'pending', lastLogin: 'Never' }
  ]);

  const [systemHealth, setSystemHealth] = useState({
    apiUptime: 99.9,
    responseTime: 145,
    activeConnections: 23,
    errorRate: 0.1
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

  const rolePermissions = {
    admin: ['api_management', 'user_management', 'system_settings', 'analytics', 'workflows', 'candidates', 'jobs', 'job_board_apis'],
    manager: ['user_management', 'analytics', 'workflows', 'candidates', 'jobs'],
    recruiter: ['candidates', 'jobs', 'workflows']
  };

  const hasPermission = (permission: string) => {
    return rolePermissions[userRole]?.includes(permission) || false;
  };

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
      {/* Header with Role Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">System administration and API management</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="role-toggle">View as:</Label>
            <select 
              id="role-toggle"
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value)}
              className="border rounded px-3 py-1"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)} View
          </Badge>
        </div>
      </div>

      {/* System Health - Admin Only */}
      {hasPermission('api_management') && (
        <SystemHealthMetrics systemHealth={systemHealth} />
      )}

      <Tabs defaultValue="api" className="space-y-4">
        <TabsList>
          {hasPermission('api_management') && <TabsTrigger value="api">API Management</TabsTrigger>}
          {hasPermission('job_board_apis') && <TabsTrigger value="job-boards">Job Board APIs</TabsTrigger>}
          {hasPermission('workflows') && <TabsTrigger value="workflows">Workflows</TabsTrigger>}
          {hasPermission('user_management') && <TabsTrigger value="users">Team Management</TabsTrigger>}
          {hasPermission('system_settings') && <TabsTrigger value="settings">System Settings</TabsTrigger>}
          {hasPermission('analytics') && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
        </TabsList>

        {/* API Management */}
        {hasPermission('api_management') && (
          <TabsContent value="api" className="space-y-4">
            <APIManagement apiKeys={apiKeys} />
          </TabsContent>
        )}

        {/* Job Board API Management */}
        {hasPermission('job_board_apis') && (
          <TabsContent value="job-boards" className="space-y-4">
            <JobBoardIntegrations jobBoardApis={jobBoardApis} />
          </TabsContent>
        )}

        {/* Workflows Tab */}
        {hasPermission('workflows') && (
          <TabsContent value="workflows" className="space-y-4">
            <WorkflowConfiguration
              workTypes={workTypes}
              features={features}
              workTypeSettings={workTypeSettings}
              featureToggles={featureToggles}
              onWorkTypeToggle={handleWorkTypeToggle}
              onFeatureToggle={handleFeatureToggle}
            />
          </TabsContent>
        )}

        {/* Team Management */}
        {hasPermission('user_management') && (
          <TabsContent value="users" className="space-y-4">
            <TeamManagement 
              teamMembers={teamMembers} 
              hasApiManagementPermission={hasPermission('api_management')} 
            />
          </TabsContent>
        )}

        {/* System Settings */}
        {hasPermission('system_settings') && (
          <TabsContent value="settings" className="space-y-4">
            <SystemSettings />
          </TabsContent>
        )}

        {/* Analytics */}
        {hasPermission('analytics') && (
          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsOverview />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
