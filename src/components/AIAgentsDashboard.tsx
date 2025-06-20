
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Users, 
  FileCheck, 
  TrendingUp, 
  ArrowRight, 
  Play,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';
import { aiAgentsOrchestrator } from '@/services/aiAgents';

const AIAgentsDashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [selectedATS, setSelectedATS] = useState('greenhouse');

  const atsOptions = [
    { value: 'greenhouse', label: 'Greenhouse', color: 'bg-green-100 text-green-800' },
    { value: 'lever', label: 'Lever', color: 'bg-blue-100 text-blue-800' },
    { value: 'bamboohr', label: 'BambooHR', color: 'bg-orange-100 text-orange-800' },
    { value: 'workday', label: 'Workday', color: 'bg-purple-100 text-purple-800' }
  ];

  const runWorkflowSimulation = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 90 ? 90 : newProgress;
      });
    }, 400);

    try {
      const workflowResults = await aiAgentsOrchestrator.simulateFullWorkflow(selectedATS);
      setResults(workflowResults);
      setProgress(100);
    } catch (error) {
      console.error('Workflow simulation error:', error);
    } finally {
      clearInterval(progressInterval);
      setIsRunning(false);
    }
  };

  const agentStats = [
    {
      name: 'Contract Compliance Agent',
      icon: FileCheck,
      status: results ? 'active' : 'idle',
      processed: results?.contract_analysis?.length || 0,
      color: 'bg-red-50 border-red-200'
    },
    {
      name: 'Recruiting Agent',
      icon: Users,
      status: results ? 'active' : 'idle',
      processed: results?.candidate_matching?.length || 0,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Project Management Agent',
      icon: TrendingUp,
      status: results ? 'active' : 'idle',
      processed: results?.capacity_planning?.length || 0,
      color: 'bg-green-50 border-green-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Agents Cloud Service</h1>
          <p className="text-gray-600">Multi-agent AI system for ATS enhancement and automation</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
          <Zap className="h-3 w-3 mr-1" />
          Cloud Add-on Service
        </Badge>
      </div>

      {/* ATS Integration Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            ATS Integration Simulation
          </CardTitle>
          <p className="text-sm text-gray-600">
            Simulate how our AI agents would integrate with your existing ATS system
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {atsOptions.map(ats => (
                <Button
                  key={ats.value}
                  variant={selectedATS === ats.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedATS(ats.value)}
                  className="flex items-center"
                >
                  {ats.label}
                </Button>
              ))}
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <Button 
              onClick={runWorkflowSimulation}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRunning ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Running AI Workflow...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run AI Workflow
                </>
              )}
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing ATS data with AI agents...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Agents Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agentStats.map((agent) => (
          <Card key={agent.name} className={agent.color}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <agent.icon className="h-8 w-8 text-gray-600" />
                  <div>
                    <p className="font-medium text-sm">{agent.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{agent.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{agent.processed}</p>
                  <p className="text-xs text-gray-500">Processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Coordination Flow */}
      {results && results.coordinations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowRight className="h-5 w-5 mr-2" />
              Agent Coordination Flow
            </CardTitle>
            <p className="text-sm text-gray-600">
              How AI agents collaborate and trigger each other
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.coordinations.map((coordination: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className="capitalize">{coordination.trigger_agent.replace('_', ' ')}</Badge>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <Badge variant="outline" className="capitalize">{coordination.target_agent.replace('_', ' ')}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{coordination.action.replace('_', ' ')}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(coordination.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <FileCheck className="h-4 w-4 mr-2" />
                Contract Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.contract_analysis.map((rec: any, index: number) => (
                  <div key={index} className="p-2 bg-red-50 rounded text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Risk Assessment</span>
                      <Badge className="bg-red-100 text-red-800 text-xs">
                        {rec.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-gray-600">{rec.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-2" />
                Candidate Matching
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.candidate_matching.slice(0, 2).map((rec: any, index: number) => (
                  <div key={index} className="p-2 bg-blue-50 rounded text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Match Score</span>
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        {rec.confidence}%
                      </Badge>
                    </div>
                    <p className="text-gray-600">{rec.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Capacity Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.capacity_planning.map((rec: any, index: number) => (
                  <div key={index} className="p-2 bg-green-50 rounded text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Capacity Analysis</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {rec.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-gray-600">{rec.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* API Integration Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            API Integration Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Inbound APIs (From Your ATS)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Candidate data sync</li>
                <li>• Job posting notifications</li>
                <li>• Contract document uploads</li>
                <li>• Real-time status updates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Outbound APIs (To Your ATS)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• AI-powered candidate recommendations</li>
                <li>• Contract compliance alerts</li>
                <li>• Capacity planning insights</li>
                <li>• Automated workflow triggers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAgentsDashboard;
