
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
  AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState('admin'); // admin, manager, recruiter
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

  const rolePermissions = {
    admin: ['api_management', 'user_management', 'system_settings', 'analytics', 'workflows', 'candidates', 'jobs'],
    manager: ['user_management', 'analytics', 'workflows', 'candidates', 'jobs'],
    recruiter: ['candidates', 'jobs', 'workflows']
  };

  const hasPermission = (permission: string) => {
    return rolePermissions[userRole]?.includes(permission) || false;
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
