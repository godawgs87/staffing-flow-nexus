
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Contact {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  title?: string;
  company_id?: string;
  contact_type?: 'client' | 'partner' | 'vendor' | 'internal';
  linkedin_url?: string;
  notes?: string;
}

interface Company {
  id: string;
  name: string;
}

interface ContactFormProps {
  formData: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    title: string;
    company_id: string;
    contact_type: 'client' | 'partner' | 'vendor' | 'internal';
    linkedin_url: string;
    notes: string;
  };
  companies: Company[];
  isReadonly: boolean;
  onChange: (field: string, value: string) => void;
}

const ContactForm = ({ formData, companies, isReadonly, onChange }: ContactFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">First Name *</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => onChange('first_name', e.target.value)}
            readOnly={isReadonly}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="last_name">Last Name *</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => onChange('last_name', e.target.value)}
            readOnly={isReadonly}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          readOnly={isReadonly}
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          readOnly={isReadonly}
        />
      </div>
      
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
          readOnly={isReadonly}
        />
      </div>
      
      <div>
        <Label htmlFor="company">Company</Label>
        <Select value={formData.company_id} onValueChange={(value) => onChange('company_id', value)} disabled={isReadonly}>
          <SelectTrigger>
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="contact_type">Contact Type</Label>
        <Select value={formData.contact_type} onValueChange={(value: 'client' | 'partner' | 'vendor' | 'internal') => onChange('contact_type', value)} disabled={isReadonly}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="partner">Partner</SelectItem>
            <SelectItem value="vendor">Vendor</SelectItem>
            <SelectItem value="internal">Internal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="linkedin_url">LinkedIn URL</Label>
        <Input
          id="linkedin_url"
          value={formData.linkedin_url}
          onChange={(e) => onChange('linkedin_url', e.target.value)}
          readOnly={isReadonly}
          placeholder="https://linkedin.com/in/username"
        />
      </div>
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          readOnly={isReadonly}
          rows={3}
        />
      </div>
    </div>
  );
};

export default ContactForm;
