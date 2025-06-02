
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Briefcase, Settings, Users, CheckCircle, Building } from 'lucide-react';

interface WorkType {
  key: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  workflows: string[];
}

interface Feature {
  key: string;
  name: string;
  description: string;
}

interface WorkflowConfigurationProps {
  workTypes: WorkType[];
  features: Feature[];
  workTypeSettings: Record<string, boolean>;
  featureToggles: Record<string, boolean>;
  onWorkTypeToggle: (key: string) => void;
  onFeatureToggle: (key: string) => void;
}

const WorkflowConfiguration = ({
  workTypes,
  features,
  workTypeSettings,
  featureToggles,
  onWorkTypeToggle,
  onFeatureToggle
}: WorkflowConfigurationProps) => {
  return (
    <div className="space-y-4">
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
                  onCheckedChange={() => onWorkTypeToggle(workType.key)}
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
                    onCheckedChange={() => onFeatureToggle(feature.key)}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowConfiguration;
