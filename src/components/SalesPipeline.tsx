
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Target,
  Handshake,
  FileText,
  Clock,
  Phone,
  Mail,
  Building
} from 'lucide-react';

const SalesPipeline = () => {
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      client: 'TechCorp Inc.',
      contact: 'Sarah Johnson',
      title: 'Software Development Team - Q3',
      value: 450000,
      stage: 'proposal',
      probability: 75,
      expectedClose: '2024-07-15',
      nextAction: 'Follow up on proposal',
      requirements: {
        roles: ['Senior Developer', 'Frontend Developer', 'DevOps Engineer'],
        duration: '6 months',
        startDate: '2024-08-01',
        location: 'San Francisco, CA'
      },
      activities: [
        { type: 'call', date: '2024-06-01', note: 'Initial discovery call' },
        { type: 'email', date: '2024-06-03', note: 'Sent capability deck' },
        { type: 'meeting', date: '2024-06-05', note: 'Technical requirements meeting' }
      ]
    },
    {
      id: 2,
      client: 'Global Solutions',
      contact: 'Mike Chen',
      title: 'Digital Transformation Consulting',
      value: 275000,
      stage: 'negotiation',
      probability: 90,
      expectedClose: '2024-06-20',
      nextAction: 'Contract review meeting',
      requirements: {
        roles: ['Tech Lead', 'Business Analyst', 'Project Manager'],
        duration: '4 months',
        startDate: '2024-07-01',
        location: 'New York, NY'
      },
      activities: [
        { type: 'call', date: '2024-05-28', note: 'Pricing discussion' },
        { type: 'email', date: '2024-05-30', note: 'Sent revised proposal' },
        { type: 'meeting', date: '2024-06-02', note: 'Contract terms discussion' }
      ]
    }
  ]);

  const stages = [
    { name: 'Lead', count: 12, value: 540000 },
    { name: 'Qualified', count: 8, value: 420000 },
    { name: 'Proposal', count: 5, value: 680000 },
    { name: 'Negotiation', count: 3, value: 380000 },
    { name: 'Closed Won', count: 2, value: 290000 }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'lead': return 'bg-gray-100 text-gray-800';
      case 'qualified': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Calendar;
      default: return FileText;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-gray-600">Track opportunities from lead to contract signature</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Target className="h-4 w-4 mr-2" />
          New Opportunity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold">$2.1M</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weighted Pipeline</p>
                <p className="text-2xl font-bold">$1.4M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Opportunities</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Win Rate</p>
                <p className="text-2xl font-bold">67%</p>
              </div>
              <Handshake className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="forecast">Sales Forecast</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stages.map((stage, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stage.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">{stage.count}</div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(stage.value)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          {opportunities.map((opp) => (
            <Card key={opp.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{opp.title}</h3>
                      <Badge className={getStageColor(opp.stage)}>
                        {opp.stage}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Client:</strong> {opp.client}</p>
                      <p><strong>Contact:</strong> {opp.contact}</p>
                      <p><strong>Value:</strong> {formatCurrency(opp.value)}</p>
                      <p><strong>Expected Close:</strong> {opp.expectedClose}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-2">
                      Win Probability: {opp.probability}%
                    </div>
                    <Progress value={opp.probability} className="w-32" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Requirements
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Roles:</strong> {opp.requirements.roles.join(', ')}</p>
                      <p><strong>Duration:</strong> {opp.requirements.duration}</p>
                      <p><strong>Start Date:</strong> {opp.requirements.startDate}</p>
                      <p><strong>Location:</strong> {opp.requirements.location}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Recent Activities
                    </h4>
                    <div className="space-y-2">
                      {opp.activities.slice(0, 3).map((activity, index) => {
                        const Icon = getActivityIcon(activity.type);
                        return (
                          <div key={index} className="flex items-start space-x-2 text-sm">
                            <Icon className="h-4 w-4 mt-0.5 text-gray-500" />
                            <div>
                              <span className="text-gray-500">{activity.date}:</span>
                              <span className="ml-1">{activity.note}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    <strong>Next Action:</strong> {opp.nextAction}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Update Stage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Sales Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Predictive Sales Analytics</h3>
                <p className="text-gray-600">AI-powered forecasting based on historical data and current pipeline</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Sales Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                <p className="text-gray-600">Detailed insights into sales performance, conversion rates, and revenue trends</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesPipeline;
