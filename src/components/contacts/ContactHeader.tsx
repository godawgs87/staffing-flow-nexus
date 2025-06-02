
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Edit } from 'lucide-react';

interface ContactHeaderProps {
  contact: any;
  onEdit: () => void;
}

const ContactHeader = ({ contact, onEdit }: ContactHeaderProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'partner': return 'bg-green-100 text-green-800';
      case 'vendor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
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
    </div>
  );
};

export default ContactHeader;
