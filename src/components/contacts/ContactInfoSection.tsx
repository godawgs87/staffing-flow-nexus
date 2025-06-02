
import React from 'react';
import { Mail, Phone, Building2, Linkedin, ExternalLink } from 'lucide-react';

interface ContactInfoSectionProps {
  contact: any;
}

const ContactInfoSection = ({ contact }: ContactInfoSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="space-y-4">
        {contact.email && (
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Mail className="h-6 w-6 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Email</p>
              <p className="font-semibold text-lg">{contact.email}</p>
            </div>
          </div>
        )}
        
        {contact.phone && (
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Phone className="h-6 w-6 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Phone</p>
              <p className="font-semibold text-lg">{contact.phone}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <Building2 className="h-6 w-6 text-gray-400" />
          <div className="flex-1">
            <p className="text-sm text-gray-500 font-medium">Company</p>
            <p className="font-semibold text-lg">{contact.companies?.name || 'No company assigned'}</p>
          </div>
        </div>
        
        {contact.linkedin_url && (
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Linkedin className="h-6 w-6 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">LinkedIn</p>
              <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-lg text-blue-600 hover:underline flex items-center">
                Profile <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfoSection;
