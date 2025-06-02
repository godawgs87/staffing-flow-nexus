
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Brain, Eye, Download } from 'lucide-react';

interface Contract {
  id: number;
  name: string;
  status: string;
  uploadDate: string;
  aiConfidence: number;
  extractedRequirements: {
    insurance: string[];
    compliance: string[];
    location: string;
    training: string[];
    roles: string[];
  };
  onboardingSteps: number;
  estimatedTime: string;
}

interface ContractListProps {
  contracts: Contract[];
}

const ContractList = ({ contracts }: ContractListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 90) return 'bg-green-100 text-green-800';
    if (confidence > 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence > 90) return 'High Confidence';
    if (confidence > 80) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <div className="space-y-4">
      {contracts.map((contract) => (
        <Card key={contract.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold">{contract.name}</h3>
                  <Badge className={getStatusColor(contract.status)}>
                    {contract.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Uploaded:</strong> {contract.uploadDate}</p>
                  <p><strong>AI Confidence:</strong> {contract.aiConfidence}%</p>
                  <p><strong>Estimated Onboarding:</strong> {contract.estimatedTime}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-2">
                  Processing: {contract.aiConfidence}%
                </div>
                <Badge className={getConfidenceColor(contract.aiConfidence)}>
                  {getConfidenceLabel(contract.aiConfidence)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Insurance Requirements
                </h4>
                <div className="space-y-2">
                  {contract.extractedRequirements.insurance.map((req, index) => (
                    <Badge key={index} variant="secondary" className="block w-fit">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Compliance
                </h4>
                <div className="space-y-2">
                  {contract.extractedRequirements.compliance.map((req, index) => (
                    <Badge key={index} variant="secondary" className="block w-fit">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Brain className="h-4 w-4 mr-2" />
                  Training Required
                </h4>
                <div className="space-y-2">
                  {contract.extractedRequirements.training.map((req, index) => (
                    <Badge key={index} variant="secondary" className="block w-fit">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Full Analysis
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Workflow
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Generate Onboarding
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContractList;
