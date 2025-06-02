
export interface CandidateFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  status: string;
  skills: string;
  experience_years: string;
  salary_expectation_min: string;
  salary_expectation_max: string;
  company_id: string;
}

export interface Candidate {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  title?: string;
  location?: string;
  status?: string;
  skills?: string[];
  experience_years?: number;
  salary_expectation_min?: number;
  salary_expectation_max?: number;
  company_id?: string;
}
