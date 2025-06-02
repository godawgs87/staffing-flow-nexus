
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

interface JobBoard {
  name: string;
  status: string;
  lastSync: string;
  jobs: number;
}

interface JobBoardIntegrationsProps {
  jobBoardApis: JobBoard[];
}

const JobBoardIntegrations = ({ jobBoardApis }: JobBoardIntegrationsProps) => {
  return (
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
  );
};

export default JobBoardIntegrations;
