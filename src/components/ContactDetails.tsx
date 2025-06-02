
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Building2, Edit, Linkedin } from 'lucide-react';
import NotesPanel from './notes/NotesPanel';

interface ContactDetailsProps {
  contact: any;
  onEdit: () => void;
}

const ContactDetails = ({ contact, onEdit }: ContactDetailsProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'partner': return 'bg-green-100 text-green-800';
      case 'vendor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">{contact.first_name} {contact.last_name}</CardTitle>
                <p className="text-gray-600">{contact.title || 'No title specified'}</p>
                <Badge className={getTypeColor(contact.contact_type)}>
                  {contact.contact_type}
                </Badge>
              </div>
            </div>
            <Button onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contact.email && (
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{contact.email}</span>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{contact.phone}</span>
              </div>
            )}
            {contact.linkedin_url && (
              <div className="flex items-center space-x-3">
                <Linkedin className="h-5 w-5 text-gray-400" />
                <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building2 className="h-5 w-5 text-gray-400" />
              <span>{contact.companies?.name || 'No company assigned'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <div className="lg:col-span-2">
          <NotesPanel
            entityType="contact"
            entityId={contact.id}
            entityName={`${contact.first_name} ${contact.last_name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
