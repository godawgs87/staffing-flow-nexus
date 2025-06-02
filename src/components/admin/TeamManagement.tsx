
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Users, UserCheck, UserX, Edit, Trash2, Mail } from 'lucide-react';
import { useTeamMembers, useTeamInvitations, useInviteTeamMember, useUpdateMemberRole, useRemoveTeamMember } from '@/hooks/useTeamManagement';
import { useToast } from '@/hooks/use-toast';

const TeamManagement = () => {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [inviteForm, setInviteForm] = useState({ email: '', role: 'recruiter' });
  const { toast } = useToast();

  const { data: teamMembers = [], isLoading: membersLoading, refetch: refetchMembers } = useTeamMembers();
  const { data: invitations = [], isLoading: invitationsLoading } = useTeamInvitations();
  const inviteTeamMember = useInviteTeamMember();
  const updateMemberRole = useUpdateMemberRole();
  const removeTeamMember = useRemoveTeamMember();

  const handleInviteMember = async () => {
    if (!inviteForm.email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    try {
      await inviteTeamMember.mutateAsync(inviteForm);
      toast({
        title: "Success",
        description: "Team member invited successfully",
      });
      setInviteDialogOpen(false);
      setInviteForm({ email: '', role: 'recruiter' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to invite team member",
        variant: "destructive"
      });
    }
  };

  const handleUpdateRole = async (newRole: string) => {
    if (!selectedMember) return;

    try {
      await updateMemberRole.mutateAsync({ userId: selectedMember.id, role: newRole });
      toast({
        title: "Success",
        description: "Member role updated successfully",
      });
      setEditDialogOpen(false);
      setSelectedMember(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update member role",
        variant: "destructive"
      });
    }
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      await removeTeamMember.mutateAsync(userId);
      toast({
        title: "Success",
        description: "Team member removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive"
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'recruiter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (membersLoading || invitationsLoading) {
    return <div className="p-4">Loading team management...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Team Members ({teamMembers.length})
            </div>
            <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={inviteForm.role} onValueChange={(value) => setInviteForm(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recruiter">Recruiter</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleInviteMember} 
                    className="w-full"
                    disabled={inviteTeamMember.isPending}
                  >
                    {inviteTeamMember.isPending ? 'Sending...' : 'Send Invitation'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="font-medium">
                    {member.first_name && member.last_name 
                      ? `${member.first_name} ${member.last_name}` 
                      : member.email}
                  </h3>
                  <Badge className={getRoleColor(member.role)}>
                    {member.role}
                  </Badge>
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{member.email}</p>
                <p className="text-xs text-gray-500">
                  Last login: {member.last_login ? new Date(member.last_login).toLocaleDateString() : 'Never'}
                </p>
                {member.invited_at && (
                  <p className="text-xs text-gray-500">
                    Invited: {new Date(member.invited_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <Dialog open={editDialogOpen && selectedMember?.id === member.id} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedMember(member)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Team Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Current Role: {selectedMember?.role}</Label>
                        <Select onValueChange={handleUpdateRole}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select new role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recruiter">Recruiter</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleRemoveMember(member.id)}
                  disabled={removeTeamMember.isPending}
                >
                  <UserX className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Pending Invitations ({invitations.filter(inv => inv.status === 'pending').length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {invitations
              .filter(inv => inv.status === 'pending')
              .map((invitation) => (
                <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-medium">{invitation.email}</h3>
                      <Badge className={getRoleColor(invitation.role)}>
                        {invitation.role}
                      </Badge>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {invitation.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      Invited: {new Date(invitation.invited_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Expires: {new Date(invitation.expires_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeamManagement;
