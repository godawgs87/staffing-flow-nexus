
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Zap, Globe, AlertTriangle } from 'lucide-react';

interface SystemHealthData {
  apiUptime: number;
  responseTime: number;
  activeConnections: number;
  errorRate: number;
}

interface SystemHealthMetricsProps {
  systemHealth: SystemHealthData;
}

const SystemHealthMetrics = ({ systemHealth }: SystemHealthMetricsProps) => {
  return (
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
  );
};

export default SystemHealthMetrics;
