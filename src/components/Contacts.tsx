
import React, { useState } from 'react';
import ContactDetails from './ContactDetails';
import ContactModal from './modals/ContactModal';
import ContactListHeader from './contacts/ContactListHeader';
import ContactSearchBar from './contacts/ContactSearchBar';
import ContactListItem from './contacts/ContactListItem';
import ContactEmptyState from './contacts/ContactEmptyState';
import { useContacts } from '@/hooks/useContacts';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    contact?: any;
  }>({
    isOpen: false,
    mode: 'add',
  });
  
  const { data: contacts = [], isLoading, error } = useContacts();
  const isMobile = useIsMobile();

  const filteredContacts = contacts.filter(contact =>
    `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.companies?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (mode: 'add' | 'edit' | 'view', contact?: any) => {
    setModalState({ isOpen: true, mode, contact });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'add' });
  };

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
  };

  const closeDetailsPanel = () => {
    setSelectedContact(null);
  };

  if (isLoading) {
    return (
      <div className="p-3 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
            <p className="text-gray-600">Loading contacts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
            <p className="text-red-600">Error loading contacts: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const DetailsComponent = () => (
    <ContactDetails
      contact={selectedContact}
      onEdit={() => openModal('edit', selectedContact)}
      onClose={isMobile ? closeDetailsPanel : undefined}
    />
  );

  return (
    <div className="flex h-full w-full">
      {/* Main Content */}
      <div className={`${isMobile ? 'w-full' : 'flex-1'} p-3 space-y-3 overflow-auto`}>
        <ContactListHeader 
          totalCount={contacts.length} 
          onAddContact={() => openModal('add')} 
        />

        <ContactSearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        {/* Contacts List */}
        <div className="space-y-2">
          {filteredContacts.map((contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              isSelected={!isMobile && selectedContact?.id === contact.id}
              onSelect={handleContactSelect}
              onView={(contact) => isMobile ? setSelectedContact(contact) : openModal('view', contact)}
              onEdit={(contact) => openModal('edit', contact)}
            />
          ))}
        </div>
      </div>

      {/* Desktop Details Panel */}
      {!isMobile && (
        <div className="w-96 border-l bg-white flex-shrink-0 overflow-auto">
          {selectedContact ? (
            <DetailsComponent />
          ) : (
            <ContactEmptyState />
          )}
        </div>
      )}

      {/* Mobile Details Modal/Drawer */}
      {isMobile && selectedContact && (
        <Drawer open={!!selectedContact} onOpenChange={(open) => !open && closeDetailsPanel()}>
          <DrawerContent className="h-[85vh]">
            <div className="overflow-auto">
              <DetailsComponent />
            </div>
          </DrawerContent>
        </Drawer>
      )}

      <ContactModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        contact={modalState.contact}
        mode={modalState.mode}
      />
    </div>
  );
};

export default Contacts;
