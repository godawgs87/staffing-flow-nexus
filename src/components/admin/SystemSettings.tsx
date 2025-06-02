
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';

const SystemSettings = () => {
  return (
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
  );
};

export default SystemSettings;
