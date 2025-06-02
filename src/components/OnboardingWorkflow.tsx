
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import OnboardingStats from './onboarding/OnboardingStats';
import OnboardingTabs from './onboarding/OnboardingTabs';
import { candidates } from './onboarding/candidateData';

const OnboardingWorkflow = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Onboarding Workflow</h1>
          <p className="text-gray-600">Streamlined digital onboarding with automated compliance tracking</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <User className="h-4 w-4 mr-2" />
          Start New Onboarding
        </Button>
      </div>

      {/* Quick Stats */}
      <OnboardingStats />

      {/* Onboarding Pipeline */}
      <OnboardingTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        candidates={candidates} 
      />
    </div>
  );
};

export default OnboardingWorkflow;
