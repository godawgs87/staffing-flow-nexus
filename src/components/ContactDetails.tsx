
import React from 'react';
import ContactHeader from './contacts/ContactHeader';
import ContactInfoSection from './contacts/ContactInfoSection';
import NotesPanel from './notes/NotesPanel';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ContactDetailsProps {
  contact: any;
  onEdit: () => void;
  onClose?: () => void;
}

const ContactDetails = ({ contact, onEdit, onClose }: ContactDetailsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full space-y-4">
      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <div className="flex justify-end p-2 pb-0">
          <Button onClick={onClose} size="sm" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Header Section */}
      <ContactHeader contact={contact} onEdit={onEdit} />

      {/* Contact Information Section */}
      <ContactInfoSection contact={contact} />

      {/* Notes Section */}
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
