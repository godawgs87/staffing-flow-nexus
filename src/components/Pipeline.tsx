
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';

const Pipeline = () => {
  const stages = [
    {
      name: 'Applied',
      count: 24,
      color: 'bg-gray-100 border-gray-300',
      candidates: [
        { name: 'John Smith', position: 'Frontend Developer', time: '2 hours ago' },
        { name: 'Lisa Wong', position: 'Product Manager', time: '5 hours ago' },
        { name: 'Alex Brown', position: 'UX Designer', time: '1 day ago' }
      ]
    },
    {
      name: 'Screening',
      count: 12,
      color: 'bg-blue-50 border-blue-200',
      candidates: [
        { name: 'Sarah Johnson', position: 'Senior Developer', time: '1 day ago' },
        { name: 'Mike Chen', position: 'Data Scientist', time: '2 days ago' }
      ]
    },
    {
      name: 'Interview',
      count: 8,
      color: 'bg-yellow-50 border-yellow-200',
      candidates: [
        { name: 'Emma Davis', position: 'UX Designer', time: '3 days ago' },
        { name: 'David Wilson', position: 'Backend Developer', time: '4 days ago' }
      ]
    },
    {
      name: 'Offer',
      count: 3,
      color: 'bg-green-50 border-green-200',
      candidates: [
        { name: 'Jennifer Lee', position: 'Product Manager', time: '1 week ago' }
      ]
    },
    {
      name: 'Hired',
      count: 5,
      color: 'bg-purple-50 border-purple-200',
      candidates: [
        { name: 'Robert Taylor', position: 'DevOps Engineer', time: '2 weeks ago' }
      ]
    }
  ];

  const getStageIcon = (stageName: string) => {
    switch (stageName) {
      case 'Applied': return Users;
      case 'Screening': return Clock;
      case 'Interview': return Users;
      case 'Offer': return CheckCircle;
      case 'Hired': return CheckCircle;
      default: return Users;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recruitment Pipeline</h1>
        <p className="text-gray-600">Track candidates through your hiring process</p>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((stage, index) => {
          const Icon = getStageIcon(stage.name);
          return (
            <Card key={index} className={`${stage.color} transition-all duration-200 hover:shadow-md`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900">{stage.count}</div>
                <p className="text-xs text-gray-600">candidates</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {stages.map((stage, stageIndex) => (
          <Card key={stageIndex} className="h-fit">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{stage.name}</CardTitle>
                <Badge variant="secondary">{stage.count}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {stage.candidates.map((candidate, candidateIndex) => (
                <div
                  key={candidateIndex}
                  className="p-3 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900 text-sm">{candidate.name}</h4>
                    <p className="text-xs text-gray-600">{candidate.position}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {candidate.time}
                    </div>
                  </div>
                </div>
              ))}
              
              {stage.candidates.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No candidates in this stage</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">68%</div>
              <p className="text-sm text-gray-600">Application to Screening Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">45%</div>
              <p className="text-sm text-gray-600">Interview to Offer Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">12 days</div>
              <p className="text-sm text-gray-600">Average Time to Hire</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pipeline;
