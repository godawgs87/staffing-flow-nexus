
import React from 'react';
import { User } from 'lucide-react';

const ContactEmptyState = () => {
  return (
    <div className="p-6 text-center text-gray-500 h-full flex flex-col justify-center">
      <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <p>Select a contact to view full details</p>
    </div>
  );
};

export default ContactEmptyState;
