
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const RequirementsLibrary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirement Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Compliance Requirement Database</h3>
          <p className="text-gray-600">Manage and update compliance requirements by location, role, and industry</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequirementsLibrary;
