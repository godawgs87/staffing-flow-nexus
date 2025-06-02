
import React from 'react';
import { Building2 } from 'lucide-react';

const CompanyEmptyState = () => {
  return (
    <div className="p-6 text-center text-gray-500 h-full flex flex-col justify-center">
      <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <p>Select a company to view full details</p>
    </div>
  );
};

export default CompanyEmptyState;
