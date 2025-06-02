import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Calendar, User } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CandidatePipelineStatusProps {
  candidate: any;
}

type CandidateStatus = 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';

const CandidatePipelineStatus = ({ candidate }: CandidatePipelineStatusProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: CandidateStatus) => {
      const { error } = await supabase
        .from('candidates')
        .update({ status: newStatus })
        .eq('id', candidate.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({
        title: 'Status Updated',
        description: 'Candidate status has been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to update status: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const statusOptions = [
    { value: 'new', label: 'New', description: 'Recently added to system' },
    { value: 'screening', label: 'Screening', description: 'Initial review in progress' },
    { value: 'interview', label: 'Interview', description: 'Scheduled or completed interviews' },
    { value: 'offer', label: 'Offer', description: 'Offer extended or negotiating' },
    { value: 'hired', label: 'Hired', description: 'Successfully hired' },
    { value: 'rejected', label: 'Rejected', description: 'Not suitable for current positions' },
  ];

  const currentStatusInfo = statusOptions.find(option => option.value === candidate.status);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-gray-100 text-gray-800';
      case 'screening': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-yellow-100 text-yellow-800';
      case 'offer': return 'bg-orange-100 text-orange-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Pipeline Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Current Status</label>
          <Select 
            value={candidate.status} 
            onValueChange={(value) => updateStatusMutation.mutate(value as CandidateStatus)}
            disabled={updateStatusMutation.isPending}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentStatusInfo && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                {currentStatusInfo.label}
              </span>
            </div>
            <p className="text-sm text-gray-600">{currentStatusInfo.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-3 w-3" />
              <span>Added</span>
            </div>
            <p className="text-sm font-medium mt-1">
              {new Date(candidate.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-3 w-3" />
              <span>Experience</span>
            </div>
            <p className="text-sm font-medium mt-1">
              {candidate.experience_years || 0} years
            </p>
          </div>
        </div>

        {candidate.status === 'interview' && (
          <Button variant="outline" size="sm" className="w-full">
            <Calendar className="h-3 w-3 mr-2" />
            Schedule Interview
          </Button>
        )}
        
        {candidate.status === 'offer' && (
          <Button variant="outline" size="sm" className="w-full">
            <TrendingUp className="h-3 w-3 mr-2" />
            Manage Offer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidatePipelineStatus;
