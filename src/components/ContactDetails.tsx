
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
    <div className="h-full w-full space-y-8">
      {/* Header Section - Full width */}
      <div className="bg-white rounded-lg shadow-sm border p-8 w-full">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{contact.first_name} {contact.last_name}</h1>
              <p className="text-lg text-gray-600 mb-2">{contact.title || 'No title specified'}</p>
              <Badge className={getTypeColor(contact.contact_type)}>
                {contact.contact_type}
              </Badge>
            </div>
          </div>
          <Button onClick={onEdit} size="lg">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Contact Information Grid - Full width utilization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 w-full">
          {contact.email && (
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Email</p>
                <p className="font-semibold text-lg">{contact.email}</p>
              </div>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Phone</p>
                <p className="font-semibold text-lg">{contact.phone}</p>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <Building2 className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Company</p>
              <p className="font-semibold text-lg">{contact.companies?.name || 'No company assigned'}</p>
            </div>
          </div>
          {contact.linkedin_url && (
            <div className="flex items-center space-x-4">
              <Linkedin className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500 font-medium">LinkedIn</p>
                <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-lg text-blue-600 hover:underline flex items-center">
                  Profile <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes Section - Full width */}
      <div className="w-full">
        <NotesPanel
          entityType="contact"
          entityId={contact.id}
          entityName={`${contact.first_name} ${contact.last_name}`}
        />
      </div>
    </div>
  );
};

export default ContactDetails;
