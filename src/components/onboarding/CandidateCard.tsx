
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Shield, Smartphone, Upload } from 'lucide-react';

interface CandidateCardProps {
  candidate: {
    id: number;
    name: string;
    position: string;
    client: string;
    progress: number;
    currentStep: string;
    urgency: string;
    startDate: string;
    documents: Record<string, string>;
    compliance: Record<string, string>;
  };
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold">{candidate.name}</h3>
              <Badge className={getUrgencyColor(candidate.urgency)}>
                {candidate.urgency} priority
              </Badge>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Position:</strong> {candidate.position}</p>
              <p><strong>Client:</strong> {candidate.client}</p>
              <p><strong>Start Date:</strong> {candidate.startDate}</p>
              <p><strong>Current Step:</strong> {candidate.currentStep}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-2">
              Progress: {candidate.progress}%
            </div>
            <Progress value={candidate.progress} className="w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documents Section */}
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </h4>
            <div className="space-y-2">
              {Object.entries(candidate.documents).map(([doc, status]) => (
                <div key={doc} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{doc.replace(/([A-Z])/g, ' $1')}</span>
                  <Badge className={getStatusColor(status)}>
                    {status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Section */}
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Compliance
            </h4>
            <div className="space-y-2">
              {Object.entries(candidate.compliance).map(([item, status]) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{item.replace(/([A-Z])/g, ' $1')}</span>
                  <Badge className={getStatusColor(status)}>
                    {status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
          <Button variant="outline" size="sm">
            <Smartphone className="h-4 w-4 mr-2" />
            Send Reminder
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Documents
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
