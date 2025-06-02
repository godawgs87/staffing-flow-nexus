
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Key, Database } from 'lucide-react';

interface APIKey {
  name: string;
  key: string;
  status: string;
  lastUsed: string;
}

interface APIManagementProps {
  apiKeys: APIKey[];
}

const APIManagement = ({ apiKeys }: APIManagementProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default APIManagement;
