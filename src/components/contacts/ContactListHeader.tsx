
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ContactListHeaderProps {
  totalCount: number;
  onAddContact: () => void;
}

const ContactListHeader = ({ totalCount, onAddContact }: ContactListHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <p className="text-gray-600">Manage your business contacts and relationships ({totalCount} total)</p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={onAddContact}>
        <Plus className="h-4 w-4 mr-2" />
        Add Contact
      </Button>
    </div>
  );
};

export default ContactListHeader;
