
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Mail, Phone, Building2, User } from 'lucide-react';
import NotesPanel from './notes/NotesPanel';

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const contacts = [
    {
      id: 1,
      name: 'Jennifer Walsh',
      title: 'Hiring Manager',
      company: 'TechCorp Inc.',
      email: 'jennifer.walsh@techcorp.com',
      phone: '+1 (555) 123-4567',
      type: 'Client',
      lastContact: '2 days ago',
      notes: 4
    },
    {
      id: 2,
      name: 'Robert Kim',
      title: 'VP of Engineering',
      company: 'Global Solutions',
      email: 'robert.kim@globalsolutions.com',
      phone: '+1 (555) 987-6543',
      type: 'Client',
      lastContact: '1 week ago',
      notes: 2
    },
    {
      id: 3,
      name: 'Lisa Chen',
      title: 'Recruiter',
      company: 'Creative Agency',
      email: 'lisa.chen@creativeagency.com',
      phone: '+1 (555) 456-7890',
      type: 'Partner',
      lastContact: '3 days ago',
      notes: 6
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Client': return 'bg-blue-100 text-blue-800';
      case 'Partner': return 'bg-green-100 text-green-800';
      case 'Vendor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600">Manage your business contacts and relationships</p>
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
                          <h3 className="text-lg font-medium">{contact.name}</h3>
                          <Badge className={getTypeColor(contact.type)}>
                            {contact.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{contact.title}</p>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Building2 className="h-4 w-4" />
                          <span>{contact.company}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-2">
                        Last contact: {contact.lastContact}
                      </div>
                      <Badge variant="outline">{contact.notes} notes</Badge>
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
              entityId={selectedContact.id.toString()}
              entityName={selectedContact.name}
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
