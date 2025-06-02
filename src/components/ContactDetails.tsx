
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Building2, Edit, Linkedin, ExternalLink } from 'lucide-react';
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
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{contact.first_name} {contact.last_name}</h1>
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

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contact.email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{contact.email}</p>
              </div>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{contact.phone}</p>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-3">
            <Building2 className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="font-medium">{contact.companies?.name || 'No company assigned'}</p>
            </div>
          </div>
          {contact.linkedin_url && (
            <div className="flex items-center space-x-3">
              <Linkedin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center">
                  Profile <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes Section */}
      <NotesPanel
        entityType="contact"
        entityId={contact.id}
        entityName={`${contact.first_name} ${contact.last_name}`}
      />
    </div>
  );
};

export default ContactDetails;
