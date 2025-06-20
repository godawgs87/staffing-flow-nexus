
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface CandidateSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CandidateSearchBar = ({ searchTerm, onSearchChange }: CandidateSearchBarProps) => {
  return (
    <Card className="mx-0">
      <CardContent className="p-3">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search candidates by name, position, or skills..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateSearchBar;
