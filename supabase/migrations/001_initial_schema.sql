
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create custom types
create type entity_type as enum ('candidate', 'contact', 'company', 'job', 'project');
create type note_priority as enum ('low', 'medium', 'high');
create type candidate_status as enum ('new', 'screening', 'interview', 'offer', 'hired', 'rejected');
create type job_status as enum ('draft', 'open', 'paused', 'filled', 'cancelled');
create type contact_type as enum ('client', 'partner', 'vendor', 'internal');

-- Companies table
create table companies (
    id uuid default uuid_generate_v4() primary key,
    name varchar(255) not null,
    website varchar(255),
    industry varchar(100),
    size varchar(50),
    location varchar(255),
    description text,
    logo_url varchar(500),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Contacts table
create table contacts (
    id uuid default uuid_generate_v4() primary key,
    company_id uuid references companies(id) on delete set null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email varchar(255) unique,
    phone varchar(50),
    title varchar(150),
    contact_type contact_type default 'client',
    linkedin_url varchar(500),
    notes text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Candidates table
create table candidates (
    id uuid default uuid_generate_v4() primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email varchar(255) unique,
    phone varchar(50),
    title varchar(150),
    location varchar(255),
    status candidate_status default 'new',
    skills text[],
    experience_years integer,
    salary_expectation_min integer,
    salary_expectation_max integer,
    resume_url varchar(500),
    linkedin_url varchar(500),
    portfolio_url varchar(500),
    availability_date date,
    notes text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Jobs table
create table jobs (
    id uuid default uuid_generate_v4() primary key,
    company_id uuid references companies(id) on delete cascade,
    contact_id uuid references contacts(id) on delete set null,
    title varchar(255) not null,
    description text,
    requirements text,
    location varchar(255),
    job_type varchar(50), -- full-time, part-time, contract, etc.
    salary_min integer,
    salary_max integer,
    status job_status default 'draft',
    priority varchar(20) default 'medium',
    start_date date,
    end_date date,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Projects table
create table projects (
    id uuid default uuid_generate_v4() primary key,
    company_id uuid references companies(id) on delete cascade,
    contact_id uuid references contacts(id) on delete set null,
    name varchar(255) not null,
    description text,
    status varchar(50) default 'planning',
    budget_min integer,
    budget_max integer,
    start_date date,
    end_date date,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Notes table (universal notes system)
create table notes (
    id uuid default uuid_generate_v4() primary key,
    entity_type entity_type not null,
    entity_id uuid not null,
    content text not null,
    priority note_priority default 'medium',
    tags text[],
    author_id uuid references auth.users(id) on delete cascade,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Job applications (linking candidates to jobs)
create table job_applications (
    id uuid default uuid_generate_v4() primary key,
    job_id uuid references jobs(id) on delete cascade,
    candidate_id uuid references candidates(id) on delete cascade,
    status varchar(50) default 'applied',
    applied_at timestamp with time zone default now(),
    notes text,
    unique(job_id, candidate_id)
);

-- Create indexes for better performance
create index idx_contacts_company_id on contacts(company_id);
create index idx_contacts_email on contacts(email);
create index idx_candidates_email on candidates(email);
create index idx_candidates_status on candidates(status);
create index idx_jobs_company_id on jobs(company_id);
create index idx_jobs_status on jobs(status);
create index idx_notes_entity on notes(entity_type, entity_id);
create index idx_notes_author on notes(author_id);
create index idx_job_applications_job_id on job_applications(job_id);
create index idx_job_applications_candidate_id on job_applications(candidate_id);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Add updated_at triggers to all tables
create trigger update_companies_updated_at before update on companies
    for each row execute function update_updated_at_column();

create trigger update_contacts_updated_at before update on contacts
    for each row execute function update_updated_at_column();

create trigger update_candidates_updated_at before update on candidates
    for each row execute function update_updated_at_column();

create trigger update_jobs_updated_at before update on jobs
    for each row execute function update_updated_at_column();

create trigger update_projects_updated_at before update on projects
    for each row execute function update_updated_at_column();

create trigger update_notes_updated_at before update on notes
    for each row execute function update_updated_at_column();
