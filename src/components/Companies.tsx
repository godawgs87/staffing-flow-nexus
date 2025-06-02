
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
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

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
  const isMobile = useIsMobile();

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

  const handleCompanySelect = (company: any) => {
    setSelectedCompany(company);
  };

  const closeDetailsPanel = () => {
    setSelectedCompany(null);
  };

  if (isLoading) {
    return (
      <div className="p-3 space-y-3">
        <CompanyListHeader totalCount={0} onAddCompany={() => openModal('add')} />
        <p className="text-gray-600">Loading companies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 space-y-3">
        <CompanyListHeader totalCount={0} onAddCompany={() => openModal('add')} />
        <p className="text-red-600">Error loading companies: {error.message}</p>
      </div>
    );
  }

  const DetailsComponent = () => (
    <CompanyDetails
      company={selectedCompany}
      onEdit={() => openModal('edit', selectedCompany)}
      stats={getCompanyStats(selectedCompany.id)}
      onClose={isMobile ? closeDetailsPanel : undefined}
    />
  );

  return (
    <div className="flex h-full w-full">
      {/* Main Content */}
      <div className={`${isMobile ? 'w-full' : 'flex-1'} p-3 space-y-3 overflow-auto`}>
        <CompanyListHeader 
          totalCount={companies.length} 
          onAddCompany={() => openModal('add')} 
        />

        <CompanySearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        {/* Companies List */}
        <div className="space-y-2">
          {filteredCompanies.map((company) => {
            const stats = getCompanyStats(company.id);
            
            return (
              <CompanyListItem
                key={company.id}
                company={company}
                stats={stats}
                isSelected={!isMobile && selectedCompany?.id === company.id}
                onSelect={() => handleCompanySelect(company)}
                onView={() => isMobile ? setSelectedCompany(company) : openModal('view', company)}
                onEdit={() => openModal('edit', company)}
              />
            );
          })}
        </div>
      </div>

      {/* Desktop Details Panel */}
      {!isMobile && (
        <div className="w-96 border-l bg-white flex-shrink-0 overflow-auto">
          {selectedCompany ? (
            <DetailsComponent />
          ) : (
            <CompanyEmptyState />
          )}
        </div>
      )}

      {/* Mobile Details Modal/Drawer */}
      {isMobile && selectedCompany && (
        <Drawer open={!!selectedCompany} onOpenChange={(open) => !open && closeDetailsPanel()}>
          <DrawerContent className="h-[85vh]">
            <div className="overflow-auto">
              <DetailsComponent />
            </div>
          </DrawerContent>
        </Drawer>
      )}

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
