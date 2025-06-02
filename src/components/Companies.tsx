
import React, { useState } from 'react';
import CompanyDetails from './CompanyDetails';
import CompanyModal from './modals/CompanyModal';
import CompanyListHeader from './companies/CompanyListHeader';
import CompanySearchBar from './companies/CompanySearchBar';
import CompanyListItem from './companies/CompanyListItem';
import CompanyEmptyState from './companies/CompanyEmptyState';
import { useCompanies } from '@/hooks/useCompanies';
import { useJobs } from '@/hooks/useJobs';
import { useContacts } from '@/hooks/useContacts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    company?: any;
  }>({
    isOpen: false,
    mode: 'add',
  });

  const { data: companies = [], isLoading, error } = useCompanies();
  const { data: jobs = [] } = useJobs();
  const { data: contacts = [] } = useContacts();

  // Fetch notes count for each company
  const { data: notesData = [] } = useQuery({
    queryKey: ['notes', 'company'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('entity_id')
        .eq('entity_type', 'company');
      
      if (error) throw error;
      return data;
    }
  });

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.industry || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.location || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to get company stats
  const getCompanyStats = (companyId: string) => {
    const companyJobs = jobs.filter(job => job.company_id === companyId);
    const activeJobs = companyJobs.filter(job => job.status === 'open').length;
    const companyContacts = contacts.filter(contact => contact.company_id === companyId).length;
    const notesCount = notesData.filter(note => note.entity_id === companyId).length;
    
    return {
      activeJobs,
      totalContacts: companyContacts,
      totalJobs: companyJobs.length,
      notesCount
    };
  };

  const openModal = (mode: 'add' | 'edit' | 'view', company?: any) => {
    setModalState({ isOpen: true, mode, company });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'add' });
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <CompanyListHeader totalCount={0} onAddCompany={() => openModal('add')} />
        <p className="text-gray-600">Loading companies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <CompanyListHeader totalCount={0} onAddCompany={() => openModal('add')} />
        <p className="text-red-600">Error loading companies: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      {/* Main Content - Left Side */}
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <CompanyListHeader 
          totalCount={companies.length} 
          onAddCompany={() => openModal('add')} 
        />

        <CompanySearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        {/* Companies List */}
        <div className="space-y-4">
          {filteredCompanies.map((company) => {
            const stats = getCompanyStats(company.id);
            
            return (
              <CompanyListItem
                key={company.id}
                company={company}
                stats={stats}
                isSelected={selectedCompany?.id === company.id}
                onSelect={() => setSelectedCompany(company)}
                onView={() => openModal('view', company)}
                onEdit={() => openModal('edit', company)}
              />
            );
          })}
        </div>
      </div>

      {/* Details Panel - Right Side */}
      <div className="w-96 border-l bg-white flex-shrink-0 overflow-auto">
        {selectedCompany ? (
          <CompanyDetails
            company={selectedCompany}
            onEdit={() => openModal('edit', selectedCompany)}
            stats={getCompanyStats(selectedCompany.id)}
          />
        ) : (
          <CompanyEmptyState />
        )}
      </div>

      <CompanyModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        company={modalState.company}
        mode={modalState.mode}
      />
    </div>
  );
};

export default Companies;
