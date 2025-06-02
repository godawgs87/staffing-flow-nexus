
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CompanyListHeaderProps {
  totalCount: number;
  onAddCompany: () => void;
}

const CompanyListHeader = ({ totalCount, onAddCompany }: CompanyListHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        <p className="text-gray-600">Manage your client companies and business relationships ({totalCount} total)</p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={onAddCompany}>
        <Plus className="h-4 w-4 mr-2" />
        Add Company
      </Button>
    </div>
  );
};

export default CompanyListHeader;
