
-- Enable RLS on all tables
alter table companies enable row level security;
alter table contacts enable row level security;
alter table candidates enable row level security;
alter table jobs enable row level security;
alter table projects enable row level security;
alter table notes enable row level security;
alter table job_applications enable row level security;

-- Companies policies
create policy "Users can view all companies" on companies
    for select using (true);

create policy "Authenticated users can insert companies" on companies
    for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update companies" on companies
    for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete companies" on companies
    for delete using (auth.role() = 'authenticated');

-- Contacts policies
create policy "Users can view all contacts" on contacts
    for select using (true);

create policy "Authenticated users can insert contacts" on contacts
    for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update contacts" on contacts
    for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete contacts" on contacts
    for delete using (auth.role() = 'authenticated');

-- Candidates policies
create policy "Users can view all candidates" on candidates
    for select using (true);

create policy "Authenticated users can insert candidates" on candidates
    for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update candidates" on candidates
    for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete candidates" on candidates
    for delete using (auth.role() = 'authenticated');

-- Jobs policies
create policy "Users can view all jobs" on jobs
    for select using (true);

create policy "Authenticated users can insert jobs" on jobs
    for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update jobs" on jobs
    for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete jobs" on jobs
    for delete using (auth.role() = 'authenticated');

-- Projects policies
create policy "Users can view all projects" on projects
    for select using (true);

create policy "Authenticated users can insert projects" on projects
    for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update projects" on projects
    for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete projects" on projects
    for delete using (auth.role() = 'authenticated');

-- Notes policies
create policy "Users can view all notes" on notes
    for select using (true);

create policy "Users can insert their own notes" on notes
    for insert with check (auth.uid() = author_id);

create policy "Users can update their own notes" on notes
    for update using (auth.uid() = author_id);

create policy "Users can delete their own notes" on notes
    for delete using (auth.uid() = author_id);

-- Job applications policies
create policy "Users can view all job applications" on job_applications
    for select using (true);

create policy "Authenticated users can insert job applications" on job_applications
    for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update job applications" on job_applications
    for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete job applications" on job_applications
    for delete using (auth.role() = 'authenticated');
