
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';

const AutomationRules = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Automation Rules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Workflow Automation</h3>
          <p className="text-gray-600">Configure rules for automatic workflow generation based on contract terms</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationRules;
