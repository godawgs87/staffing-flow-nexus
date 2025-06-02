
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Building2, Users, MapPin, Globe } from 'lucide-react';
import NotesPanel from './notes/NotesPanel';
import CompanyModal from './modals/CompanyModal';
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
            <p className="text-gray-600">Loading companies...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
            <p className="text-red-600">Error loading companies: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-600">Manage your client companies and business relationships ({companies.length} total)</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => openModal('add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search companies by name, industry, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCompanies.map((company) => {
              const stats = getCompanyStats(company.id);
              
              return (
                <Card 
                  key={company.id} 
                  className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${
                    selectedCompany?.id === company.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCompany(company)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">{company.name}</h3>
                            <p className="text-gray-600">{company.industry || 'No industry specified'}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" onClick={(e) => {
                            e.stopPropagation();
                            openModal('view', company);
                          }}>
                            View
                          </Button>
                          <Button size="sm" variant="ghost" onClick={(e) => {
                            e.stopPropagation();
                            openModal('edit', company);
                          }}>
                            Edit
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{company.size || 'Size not specified'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{company.location || 'Location not specified'}</span>
                        </div>
                        {company.website && (
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4" />
                            <span>{company.website}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">{stats.activeJobs}</div>
                          <div className="text-xs text-gray-500">Active Jobs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{stats.totalContacts}</div>
                          <div className="text-xs text-gray-500">Contacts</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-purple-600">{stats.notesCount}</div>
                          <div className="text-xs text-gray-500">Notes</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Notes Panel */}
        <div className="lg:col-span-1">
          {selectedCompany ? (
            <NotesPanel
              entityType="company"
              entityId={selectedCompany.id}
              entityName={selectedCompany.name}
            />
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a company to view and add notes</p>
              </CardContent>
            </Card>
          )}
        </div>
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
