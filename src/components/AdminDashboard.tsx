import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Key, 
  Users, 
  Settings, 
  Activity,
  Database,
  Globe,
  Lock,
  UserCheck,
  Zap,
  BarChart3,
  AlertTriangle,
  Briefcase,
  Building,
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState('admin'); // admin, manager, recruiter

  // Job Board API Integrations
  const [jobBoardApis, setJobBoardApis] = useState([
    { name: 'LinkedIn Jobs API', status: 'connected', lastSync: '1 hour ago', jobs: 45 },
    { name: 'Indeed API', status: 'connected', lastSync: '30 minutes ago', jobs: 78 },
    { name: 'ZipRecruiter API', status: 'disconnected', lastSync: '3 days ago', jobs: 0 },
    { name: 'Glassdoor API', status: 'connected', lastSync: '2 hours ago', jobs: 23 }
  ]);

  // Workflow Settings (moved from WorkflowSettings component)
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">API Uptime</p>
                  <p className="text-2xl font-bold text-green-600">{systemHealth.apiUptime}%</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold">{systemHealth.responseTime}ms</p>
                </div>
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Connections</p>
                  <p className="text-2xl font-bold">{systemHealth.activeConnections}</p>
                </div>
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Error Rate</p>
                  <p className="text-2xl font-bold text-yellow-600">{systemHealth.errorRate}%</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  API Keys
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiKeys.map((api, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-medium">{api.name}</h3>
                        <Badge className={api.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {api.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 font-mono">{api.key}</p>
                      <p className="text-xs text-gray-500">Last used: {api.lastUsed}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Regenerate</Button>
                      <Button variant="outline" size="sm">
                        {api.status === 'active' ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Key className="h-4 w-4 mr-2" />
                  Generate New API Key
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  API Usage & Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold">2,847</p>
                    <p className="text-sm text-gray-600">Requests Today</p>
                    <p className="text-xs text-gray-500">of 10,000 limit</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold">89,231</p>
                    <p className="text-sm text-gray-600">Requests This Month</p>
                    <p className="text-xs text-gray-500">of 300,000 limit</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold">$127.45</p>
                    <p className="text-sm text-gray-600">Usage Cost</p>
                    <p className="text-xs text-gray-500">this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Job Board API Management */}
        {hasPermission('job_board_apis') && (
          <TabsContent value="job-boards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Job Board Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobBoardApis.map((jobBoard, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-medium">{jobBoard.name}</h3>
                        <Badge className={jobBoard.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {jobBoard.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Last sync: {jobBoard.lastSync}</p>
                      <p className="text-xs text-gray-500">{jobBoard.jobs} active job postings</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Configure</Button>
                      <Button variant="outline" size="sm">
                        {jobBoard.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Globe className="h-4 w-4 mr-2" />
                  Add New Job Board Integration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Workflows Tab */}
        {hasPermission('workflows') && (
          <TabsContent value="workflows" className="space-y-4">
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
          </TabsContent>
        )}

        {/* Team Management */}
        {hasPermission('user_management') && (
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Team Members
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-medium">{member.name}</h3>
                        <Badge className="bg-blue-100 text-blue-800">{member.role}</Badge>
                        <Badge className={member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {member.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-xs text-gray-500">Last login: {member.lastLogin}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit Role</Button>
                      {hasPermission('api_management') && (
                        <Button variant="outline" size="sm">Remove</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* System Settings */}
        {hasPermission('system_settings') && (
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Require 2FA for all admin users</p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="session-timeout">Auto Session Timeout</Label>
                    <p className="text-sm text-gray-600">Automatically log out inactive users</p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="api-logging">API Request Logging</Label>
                    <p className="text-sm text-gray-600">Log all API requests for audit purposes</p>
                  </div>
                  <Switch id="api-logging" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Analytics */}
        {hasPermission('analytics') && (
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  System Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">Comprehensive system analytics and reporting will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
