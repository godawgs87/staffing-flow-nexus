
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Zap,
  Target,
  BarChart3,
  Lightbulb,
  Clock,
  Users,
  DollarSign,
  FileText
} from 'lucide-react';

const AIInsights = () => {
  const [insights, setInsights] = useState([
    {
      id: 1,
      type: 'opportunity',
      title: 'High-Value Opportunity Detected',
      description: 'TechCorp Inc. shows strong engagement patterns similar to previously won deals',
      confidence: 87,
      impact: 'high',
      action: 'Schedule follow-up meeting within 48 hours',
      category: 'sales'
    },
    {
      id: 2,
      type: 'compliance',
      title: 'Compliance Risk Identified',
      description: 'New California labor law affects 3 active placements starting July 1st',
      confidence: 95,
      impact: 'high',
      action: 'Update compliance workflows and notify clients',
      category: 'compliance'
    },
    {
      id: 3,
      type: 'talent',
      title: 'Skill Gap Analysis',
      description: 'High demand for React developers but low candidate pool availability',
      confidence: 78,
      impact: 'medium',
      action: 'Expand sourcing channels for frontend developers',
      category: 'talent'
    }
  ]);

  const predictions = [
    {
      metric: 'Revenue Forecast',
      current: 2100000,
      predicted: 2450000,
      period: 'Q3 2024',
      confidence: 82,
      change: '+16.7%'
    },
    {
      metric: 'Placement Success Rate',
      current: 73,
      predicted: 78,
      period: 'Next 30 days',
      confidence: 89,
      change: '+6.8%'
    },
    {
      metric: 'Time to Fill',
      current: 18,
      predicted: 15,
      period: 'Average days',
      confidence: 76,
      change: '-16.7%'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sales': return DollarSign;
      case 'compliance': return AlertCircle;
      case 'talent': return Users;
      case 'operations': return Target;
      default: return Brain;
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
          <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-gray-600">Intelligent recommendations and predictive analytics</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Brain className="h-4 w-4 mr-2" />
          Generate New Insights
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Insights</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Lightbulb className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold">84%</p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actions Taken</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Impact Score</p>
                <p className="text-2xl font-bold">87</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="automation">Smart Automation</TabsTrigger>
          <TabsTrigger value="learning">Machine Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          {insights.map((insight) => {
            const Icon = getCategoryIcon(insight.category);
            return (
              <Card key={insight.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3 flex-1">
                      <Icon className="h-6 w-6 mt-1 text-blue-600" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{insight.title}</h3>
                          <Badge className={getImpactColor(insight.impact)}>
                            {insight.impact} impact
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{insight.description}</p>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-1">Recommended Action:</p>
                          <p className="text-sm text-blue-800">{insight.action}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-gray-600 mb-2">
                        Confidence: {insight.confidence}%
                      </div>
                      <Progress value={insight.confidence} className="w-24" />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Snooze
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Take Action
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {predictions.map((prediction, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{prediction.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-end space-x-2">
                      <div className="text-3xl font-bold">
                        {prediction.metric.includes('Revenue') 
                          ? formatCurrency(prediction.predicted)
                          : prediction.predicted + (prediction.metric.includes('Rate') ? '%' : '')
                        }
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {prediction.change}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Current: {prediction.metric.includes('Revenue') 
                        ? formatCurrency(prediction.current)
                        : prediction.current + (prediction.metric.includes('Rate') ? '%' : '')
                      }</p>
                      <p>Period: {prediction.period}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence</span>
                        <span>{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Smart Automation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Intelligent Process Automation</h3>
                <p className="text-gray-600">AI-powered workflows that automatically handle routine tasks and decision-making</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Machine Learning Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Continuous Learning</h3>
                <p className="text-gray-600">Model performance, training data, and improvement recommendations</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIInsights;
