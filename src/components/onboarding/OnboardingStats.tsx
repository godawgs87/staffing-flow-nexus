
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, CheckCircle, FileText, AlertCircle } from 'lucide-react';

const OnboardingStats = () => {
  const stats = [
    {
      label: 'Active Onboarding',
      value: '12',
      icon: Clock,
      iconColor: 'text-blue-600'
    },
    {
      label: 'Completed This Week',
      value: '8',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    {
      label: 'Pending Documents',
      value: '5',
      icon: FileText,
      iconColor: 'text-yellow-600'
    },
    {
      label: 'Avg. Completion Time',
      value: '3.2',
      subtext: 'days',
      icon: AlertCircle,
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.subtext && (
                    <p className="text-xs text-gray-500">{stat.subtext}</p>
                  )}
                </div>
                <Icon className={`h-8 w-8 ${stat.iconColor}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OnboardingStats;
