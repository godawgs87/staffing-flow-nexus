
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface JobFormData {
  title: string;
  company_id: string;
  contact_id: string;
  description: string;
  location: string;
  job_type: string;
  salary_min: string;
  salary_max: string;
  status: string;
}

interface Company {
  id: string;
  name: string;
}

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
}

interface JobFormProps {
  formData: JobFormData;
  companies: Company[];
  contacts: Contact[];
  isReadonly: boolean;
  onChange: (field: string, value: string) => void;
}

const JobForm = ({ formData, companies, contacts, isReadonly, onChange }: JobFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Job Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
          readOnly={isReadonly}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="company">Company *</Label>
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
        <Label htmlFor="contact">Contact</Label>
        <Select value={formData.contact_id} onValueChange={(value) => onChange('contact_id', value)} disabled={isReadonly}>
          <SelectTrigger>
            <SelectValue placeholder="Select contact" />
          </SelectTrigger>
          <SelectContent>
            {contacts.map((contact) => (
              <SelectItem key={contact.id} value={contact.id}>
                {contact.first_name} {contact.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          readOnly={isReadonly}
          rows={4}
        />
      </div>
      
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => onChange('location', e.target.value)}
          readOnly={isReadonly}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="job_type">Job Type</Label>
          <Select value={formData.job_type} onValueChange={(value) => onChange('job_type', value)} disabled={isReadonly}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => onChange('status', value)} disabled={isReadonly}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="filled">Filled</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="salary_min">Min Salary</Label>
          <Input
            id="salary_min"
            type="number"
            value={formData.salary_min}
            onChange={(e) => onChange('salary_min', e.target.value)}
            readOnly={isReadonly}
            placeholder="50000"
          />
        </div>
        
        <div>
          <Label htmlFor="salary_max">Max Salary</Label>
          <Input
            id="salary_max"
            type="number"
            value={formData.salary_max}
            onChange={(e) => onChange('salary_max', e.target.value)}
            readOnly={isReadonly}
            placeholder="80000"
          />
        </div>
      </div>
    </div>
  );
};

export default JobForm;
