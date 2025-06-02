
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Building2, User } from 'lucide-react';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  title?: string;
  email?: string;
  phone?: string;
  contact_type: string;
  companies?: {
    name: string;
  };
}

interface ContactListItemProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: (contact: Contact) => void;
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
}

const ContactListItem = ({ contact, isSelected, onSelect, onView, onEdit }: ContactListItemProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'partner': return 'bg-green-100 text-green-800';
      case 'vendor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => onSelect(contact)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-base font-medium">{contact.first_name} {contact.last_name}</h3>
                <Badge className={`${getTypeColor(contact.contact_type)} text-xs`}>
                  {contact.contact_type}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">{contact.title || 'No title specified'}</p>
              <div className="flex items-center space-x-1 text-gray-600 mb-2">
                <Building2 className="h-3 w-3" />
                <span className="text-sm">{contact.companies?.name || 'No company'}</span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                {contact.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>{contact.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button size="sm" variant="ghost" onClick={(e) => {
              e.stopPropagation();
              onView(contact);
            }}>
              View
            </Button>
            <Button size="sm" variant="ghost" onClick={(e) => {
              e.stopPropagation();
              onEdit(contact);
            }}>
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactListItem;
