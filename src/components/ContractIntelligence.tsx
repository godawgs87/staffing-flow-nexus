
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Brain, 
  Upload, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Eye,
  Download,
  Zap
} from 'lucide-react';
import ContractUpload from './contracts/ContractUpload';
import { ContractAnalysis } from '@/services/aiService';

const ContractIntelligence = () => {
  const [contracts, setContracts] = useState([
    {
      id: 1,
      name: 'TechCorp Software Development Contract',
      status: 'processed',
      uploadDate: '2024-06-01',
      aiConfidence: 95,
      extractedRequirements: {
        insurance: ['General Liability $1M', 'E&O Insurance $500K'],
        compliance: ['SOC 2 Type II', 'Background Check Required'],
        location: 'California, Remote OK',
        training: ['Security Awareness Training', 'Company Onboarding'],
        roles: ['Senior Software Engineer', 'Frontend Developer']
      },
      onboardingSteps: 8,
      estimatedTime: '3-4 days'
    },
    {
      id: 2,
      name: 'Global Solutions Consulting Agreement',
      status: 'processing',
      uploadDate: '2024-06-02',
      aiConfidence: 87,
      extractedRequirements: {
        insurance: ['Professional Liability $2M'],
        compliance: ['PCI DSS Compliance', 'NDA Required'],
        location: 'New York, On-site Required',
        training: ['Client Communication Training'],
        roles: ['Technical Consultant']
      },
      onboardingSteps: 6,
      estimatedTime: '2-3 days'
    }
  ]);
  const [activeTab, setActiveTab] = useState('contracts');
  const [showUpload, setShowUpload] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAnalysisComplete = (analysis: ContractAnalysis) => {
    const newContract = {
      id: contracts.length + 1,
      name: 'New Contract ' + (contracts.length + 1),
      status: 'processed',
      uploadDate: new Date().toISOString().split('T')[0],
      aiConfidence: analysis.confidence,
      extractedRequirements: {
        insurance: analysis.extractedRequirements.insurance,
        compliance: analysis.extractedRequirements.compliance,
        location: analysis.extractedRequirements.location,
        training: analysis.extractedRequirements.training,
        roles: analysis.extractedRequirements.roles
      },
      onboardingSteps: analysis.workflowSteps.length,
      estimatedTime: `${analysis.workflowSteps.reduce((sum, step) => sum + step.estimatedDays, 0)} days`
    };

    setContracts([newContract, ...contracts]);
    setShowUpload(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contract Intelligence</h1>
          <p className="text-gray-600">AI-powered contract parsing and onboarding automation</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowUpload(!showUpload)}
        >
          <Upload className="h-4 w-4 mr-2" />
          {showUpload ? 'Hide Upload Form' : 'Upload Contract'}
        </Button>
      </div>

      {showUpload && (
        <ContractUpload onAnalysisComplete={handleAnalysisComplete} />
      )}

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
                <p className="text-2xl font-bold">
                  {Math.round(
                    contracts.reduce((sum, contract) => sum + contract.aiConfidence, 0) / contracts.length
                  )}%
                </p>
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
                <p className="text-2xl font-bold">
                  {contracts.reduce((sum, contract) => sum + contract.onboardingSteps, 0)}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs 
        defaultValue="contracts" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="contracts">Contract Analysis</TabsTrigger>
          <TabsTrigger value="requirements">Requirement Library</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
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
                    <Badge className={
                      contract.aiConfidence > 90 ? 'bg-green-100 text-green-800' :
                      contract.aiConfidence > 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {contract.aiConfidence > 90 ? 'High Confidence' : 
                       contract.aiConfidence > 80 ? 'Medium Confidence' : 'Low Confidence'}
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
        </TabsContent>

        <TabsContent value="requirements">
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
        </TabsContent>

        <TabsContent value="automation">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContractIntelligence;
