
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck } from 'lucide-react';

interface TeamMember {
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface TeamManagementProps {
  teamMembers: TeamMember[];
  hasApiManagementPermission: boolean;
}

const TeamManagement = ({ teamMembers, hasApiManagementPermission }: TeamManagementProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Team Members
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserCheck className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="font-medium">{member.name}</h3>
                <Badge className="bg-blue-100 text-blue-800">{member.role}</Badge>
                <Badge className={member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {member.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{member.email}</p>
              <p className="text-xs text-gray-500">Last login: {member.lastLogin}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Edit Role</Button>
              {hasApiManagementPermission && (
                <Button variant="outline" size="sm">Remove</Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TeamManagement;
