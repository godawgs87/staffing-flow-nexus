
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Mail, Phone, Building2, User } from 'lucide-react';
import NotesPanel from './notes/NotesPanel';
import { useContacts } from '@/hooks/useContacts';

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const { data: contacts = [], isLoading, error } = useContacts();

  const filteredContacts = contacts.filter(contact =>
    `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.companies?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'partner': return 'bg-green-100 text-green-800';
      case 'vendor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
            <p className="text-red-600">Error loading contacts: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600">Manage your business contacts and relationships ({contacts.length} total)</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search contacts by name, company, or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contacts List */}
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <Card 
                key={contact.id} 
                className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${
                  selectedContact?.id === contact.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-medium">{contact.first_name} {contact.last_name}</h3>
                          <Badge className={getTypeColor(contact.contact_type)}>
                            {contact.contact_type}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{contact.title || 'No title specified'}</p>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Building2 className="h-4 w-4" />
                          <span>{contact.companies?.name || 'No company'}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          {contact.email && (
                            <div className="flex items-center space-x-1">
                              <Mail className="h-4 w-4" />
                              <span>{contact.email}</span>
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{contact.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-2">
                        Added: {new Date(contact.created_at).toLocaleDateString()}
                      </div>
                      <Badge variant="outline">0 notes</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notes Panel */}
        <div className="lg:col-span-1">
          {selectedContact ? (
            <NotesPanel
              entityType="contact"
              entityId={selectedContact.id}
              entityName={`${selectedContact.first_name} ${selectedContact.last_name}`}
            />
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a contact to view and add notes</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
