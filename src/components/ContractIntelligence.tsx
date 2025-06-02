
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import ContractUpload from './contracts/ContractUpload';
import ContractStats from './contracts/ContractStats';
import ContractTabs from './contracts/ContractTabs';
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

      <ContractStats contracts={contracts} />

      <ContractTabs 
        contracts={contracts} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
};

export default ContractIntelligence;
