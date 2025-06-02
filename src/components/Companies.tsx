
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Building2, Users, MapPin, Globe } from 'lucide-react';
import NotesPanel from './notes/NotesPanel';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const companies = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      industry: 'Software Development',
      size: '500-1000',
      location: 'San Francisco, CA',
      website: 'www.techcorp.com',
      type: 'Client',
      activeJobs: 5,
      totalCandidates: 23,
      notes: 8
    },
    {
      id: 2,
      name: 'Global Solutions',
      industry: 'Consulting',
      size: '1000+',
      location: 'New York, NY',
      website: 'www.globalsolutions.com',
      type: 'Client',
      activeJobs: 3,
      totalCandidates: 15,
      notes: 4
    },
    {
      id: 3,
      name: 'Creative Agency',
      industry: 'Marketing & Advertising',
      size: '50-100',
      location: 'Austin, TX',
      website: 'www.creativeagency.com',
      type: 'Client',
      activeJobs: 2,
      totalCandidates: 8,
      notes: 6
    }
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Client': return 'bg-blue-100 text-blue-800';
      case 'Partner': return 'bg-green-100 text-green-800';
      case 'Vendor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-600">Manage your client companies and business relationships</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
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
            {filteredCompanies.map((company) => (
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
                          <p className="text-gray-600">{company.industry}</p>
                        </div>
                      </div>
                      <Badge className={getTypeColor(company.type)}>
                        {company.type}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{company.size} employees</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span>{company.website}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">{company.activeJobs}</div>
                        <div className="text-xs text-gray-500">Active Jobs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">{company.totalCandidates}</div>
                        <div className="text-xs text-gray-500">Candidates</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-purple-600">{company.notes}</div>
                        <div className="text-xs text-gray-500">Notes</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notes Panel */}
        <div className="lg:col-span-1">
          {selectedCompany ? (
            <NotesPanel
              entityType="company"
              entityId={selectedCompany.id.toString()}
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
    </div>
  );
};

export default Companies;
