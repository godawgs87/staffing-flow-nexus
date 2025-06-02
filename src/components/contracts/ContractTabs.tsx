
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContractList from './ContractList';
import RequirementsLibrary from './RequirementsLibrary';
import AutomationRules from './AutomationRules';

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

interface ContractTabsProps {
  contracts: Contract[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ContractTabs = ({ contracts, activeTab, onTabChange }: ContractTabsProps) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={onTabChange}
      className="space-y-4"
    >
      <TabsList>
        <TabsTrigger value="contracts">Contract Analysis</TabsTrigger>
        <TabsTrigger value="requirements">Requirement Library</TabsTrigger>
        <TabsTrigger value="automation">Automation Rules</TabsTrigger>
      </TabsList>

      <TabsContent value="contracts" className="space-y-4">
        <ContractList contracts={contracts} />
      </TabsContent>

      <TabsContent value="requirements">
        <RequirementsLibrary />
      </TabsContent>

      <TabsContent value="automation">
        <AutomationRules />
      </TabsContent>
    </Tabs>
  );
};

export default ContractTabs;
