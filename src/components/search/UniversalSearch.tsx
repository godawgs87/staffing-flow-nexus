
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, User, Building2, Briefcase, FileText, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface SearchResult {
  id: string;
  type: 'candidate' | 'contact' | 'company' | 'job' | 'project';
  name: string;
  subtitle: string;
  status?: string;
}

interface UniversalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UniversalSearch = ({ open, onOpenChange }: UniversalSearchProps) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['universal-search', search, selectedType],
    queryFn: async () => {
      if (!search.trim()) return [];
      
      try {
        const { data, error } = await supabase.functions.invoke('universal-search', {
          body: {
            query: search.trim(),
            types: selectedType === 'all' ? null : [selectedType],
            limit: 20
          }
        });

        if (error) {
          console.error('Search error:', error);
          throw error;
        }
        return data?.results || [];
      } catch (error) {
        console.error('Search failed:', error);
        return [];
      }
    },
    enabled: search.length > 1
  });

  const filteredResults = selectedType === 'all' 
    ? results 
    : results.filter((result: SearchResult) => result.type === selectedType);

  const getIcon = (type: string) => {
    switch (type) {
      case 'candidate': return User;
      case 'contact': return User;
      case 'company': return Building2;
      case 'job': return Briefcase;
      case 'project': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'candidate': return 'bg-blue-100 text-blue-800';
      case 'contact': return 'bg-green-100 text-green-800';
      case 'company': return 'bg-purple-100 text-purple-800';
      case 'job': return 'bg-orange-100 text-orange-800';
      case 'project': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleResultClick = (result: SearchResult) => {
    const routes = {
      candidate: '/candidates',
      contact: '/contacts',
      company: '/companies',
      job: '/jobs',
      project: '/projects'
    };
    
    console.log(`Navigate to ${routes[result.type]}/${result.id}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[70vh] overflow-hidden fixed top-[15%] left-[50%] translate-x-[-50%] translate-y-0">
        <DialogHeader>
          <DialogTitle>Universal Search</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search candidates, companies, jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2 overflow-x-auto">
            {['all', 'candidate', 'contact', 'company', 'job', 'project'].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="capitalize whitespace-nowrap"
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto space-y-2">
            {isLoading && search && (
              <div className="text-center py-4 text-gray-500">Searching...</div>
            )}
            
            {!isLoading && search && filteredResults.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No results found for "{search}"
              </div>
            )}
            
            {filteredResults.map((result: SearchResult) => {
              const Icon = getIcon(result.type);
              return (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-gray-600">{result.subtitle}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(result.type)} variant="secondary">
                      {result.type}
                    </Badge>
                    {result.status && (
                      <Badge variant="outline">{result.status}</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="border-t pt-4">
            <div className="text-sm font-medium text-gray-900 mb-2">Quick Actions</div>
            <div className="flex space-x-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Candidate
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Company
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Contact
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UniversalSearch;
