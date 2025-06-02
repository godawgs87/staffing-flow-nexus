
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Zap, Clock, CheckCircle } from 'lucide-react';

interface Contract {
  id: number;
  name: string;
  status: string;
  uploadDate: string;
  aiConfidence: number;
  onboardingSteps: number;
  estimatedTime: string;
}

interface ContractStatsProps {
  contracts: Contract[];
}

const ContractStats = ({ contracts }: ContractStatsProps) => {
  const avgConfidence = contracts.length > 0 
    ? Math.round(contracts.reduce((sum, contract) => sum + contract.aiConfidence, 0) / contracts.length)
    : 0;

  const totalSteps = contracts.reduce((sum, contract) => sum + contract.onboardingSteps, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Contracts Processed</p>
              <p className="text-2xl font-bold">{contracts.length}</p>
            </div>
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg AI Confidence</p>
              <p className="text-2xl font-bold">{avgConfidence}%</p>
            </div>
            <Zap className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Time Saved</p>
              <p className="text-2xl font-bold">87</p>
              <p className="text-xs text-gray-500">hours</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Auto-Generated Workflows</p>
              <p className="text-2xl font-bold">{totalSteps}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractStats;
