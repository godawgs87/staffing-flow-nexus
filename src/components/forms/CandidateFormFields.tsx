
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CandidateFormData } from '@/types/candidate';
import { useCompanies } from '@/hooks/useCompanies';

interface CandidateFormFieldsProps {
  formData: CandidateFormData;
  onChange: (field: keyof CandidateFormData, value: string) => void;
  isReadonly: boolean;
}

const CandidateFormFields = ({ formData, onChange, isReadonly }: CandidateFormFieldsProps) => {
  const { data: companies = [] } = useCompanies();

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
        <Label htmlFor="company_id">Company</Label>
        <Select value={formData.company_id} onValueChange={(value) => onChange('company_id', value)} disabled={isReadonly}>
          <SelectTrigger>
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No Company</SelectItem>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
      
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => onChange('status', value)} disabled={isReadonly}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="screening">Screening</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="hired">Hired</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input
          id="skills"
          value={formData.skills}
          onChange={(e) => onChange('skills', e.target.value)}
          readOnly={isReadonly}
          placeholder="React, TypeScript, Node.js"
        />
      </div>
      
      <div>
        <Label htmlFor="experience_years">Years of Experience</Label>
        <Input
          id="experience_years"
          type="number"
          value={formData.experience_years}
          onChange={(e) => onChange('experience_years', e.target.value)}
          readOnly={isReadonly}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="salary_expectation_min">Min Salary</Label>
          <Input
            id="salary_expectation_min"
            type="number"
            value={formData.salary_expectation_min}
            onChange={(e) => onChange('salary_expectation_min', e.target.value)}
            readOnly={isReadonly}
          />
        </div>
        
        <div>
          <Label htmlFor="salary_expectation_max">Max Salary</Label>
          <Input
            id="salary_expectation_max"
            type="number"
            value={formData.salary_expectation_max}
            onChange={(e) => onChange('salary_expectation_max', e.target.value)}
            readOnly={isReadonly}
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateFormFields;
