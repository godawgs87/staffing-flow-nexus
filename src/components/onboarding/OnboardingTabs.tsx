
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, FileText } from 'lucide-react';
import CandidateCard from './CandidateCard';

interface OnboardingTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  candidates: Array<{
    id: number;
    name: string;
    position: string;
    client: string;
    progress: number;
    currentStep: string;
    urgency: string;
    startDate: string;
    documents: Record<string, string>;
    compliance: Record<string, string>;
  }>;
}

const OnboardingTabs = ({ activeTab, setActiveTab, candidates }: OnboardingTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="active">Active Onboarding (3)</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="space-y-4">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </TabsContent>

      <TabsContent value="completed">
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Completed Onboarding</h3>
            <p className="text-gray-600">View and manage completed onboarding records</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="templates">
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Onboarding Templates</h3>
            <p className="text-gray-600">Create and manage onboarding templates for different positions and clients</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default OnboardingTabs;
