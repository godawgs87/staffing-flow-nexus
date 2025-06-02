
import React from 'react';
import ContactHeader from './contacts/ContactHeader';
import ContactInfoSection from './contacts/ContactInfoSection';
import NotesPanel from './notes/NotesPanel';

interface ContactDetailsProps {
  contact: any;
  onEdit: () => void;
}

const ContactDetails = ({ contact, onEdit }: ContactDetailsProps) => {
  return (
    <div className="w-full space-y-6">
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
