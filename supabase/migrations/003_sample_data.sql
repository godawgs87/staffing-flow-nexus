
-- Insert sample companies
insert into companies (name, website, industry, size, location, description) values
('TechCorp Inc.', 'https://techcorp.com', 'Technology', '500-1000', 'San Francisco, CA', 'Leading technology solutions provider'),
('Global Solutions', 'https://globalsolutions.com', 'Consulting', '1000-5000', 'New York, NY', 'Global business consulting firm'),
('Creative Agency', 'https://creativeagency.com', 'Marketing', '50-200', 'Austin, TX', 'Full-service creative marketing agency'),
('DataTech Systems', 'https://datatech.com', 'Technology', '200-500', 'Seattle, WA', 'Data analytics and AI solutions'),
('Innovation Labs', 'https://innovationlabs.com', 'Technology', '100-300', 'Boston, MA', 'Research and development company');

-- Insert sample contacts
insert into contacts (company_id, first_name, last_name, email, phone, title, contact_type) values
((select id from companies where name = 'TechCorp Inc.'), 'Jennifer', 'Walsh', 'jennifer.walsh@techcorp.com', '+1 (555) 123-4567', 'Hiring Manager', 'client'),
((select id from companies where name = 'Global Solutions'), 'Robert', 'Kim', 'robert.kim@globalsolutions.com', '+1 (555) 987-6543', 'VP of Engineering', 'client'),
((select id from companies where name = 'Creative Agency'), 'Lisa', 'Chen', 'lisa.chen@creativeagency.com', '+1 (555) 456-7890', 'Recruiter', 'partner'),
((select id from companies where name = 'DataTech Systems'), 'Michael', 'Johnson', 'michael.johnson@datatech.com', '+1 (555) 234-5678', 'CTO', 'client'),
((select id from companies where name = 'Innovation Labs'), 'Sarah', 'Davis', 'sarah.davis@innovationlabs.com', '+1 (555) 345-6789', 'Head of HR', 'client');

-- Insert sample candidates
insert into candidates (first_name, last_name, email, phone, title, location, status, skills, experience_years, salary_expectation_min, salary_expectation_max) values
('Alex', 'Thompson', 'alex.thompson@email.com', '+1 (555) 111-2222', 'Senior Software Engineer', 'San Francisco, CA', 'screening', ARRAY['React', 'TypeScript', 'Node.js', 'AWS'], 8, 150000, 180000),
('Emily', 'Rodriguez', 'emily.rodriguez@email.com', '+1 (555) 333-4444', 'Product Manager', 'New York, NY', 'interview', ARRAY['Product Strategy', 'Agile', 'Data Analysis'], 6, 130000, 160000),
('David', 'Park', 'david.park@email.com', '+1 (555) 555-6666', 'UX Designer', 'Austin, TX', 'new', ARRAY['Figma', 'User Research', 'Prototyping'], 4, 90000, 120000),
('Maria', 'Garcia', 'maria.garcia@email.com', '+1 (555) 777-8888', 'Data Scientist', 'Seattle, WA', 'offer', ARRAY['Python', 'Machine Learning', 'SQL', 'Tableau'], 5, 140000, 170000),
('James', 'Wilson', 'james.wilson@email.com', '+1 (555) 999-0000', 'DevOps Engineer', 'Boston, MA', 'new', ARRAY['Docker', 'Kubernetes', 'AWS', 'Terraform'], 7, 130000, 155000);

-- Insert sample jobs
insert into jobs (company_id, contact_id, title, description, location, job_type, salary_min, salary_max, status) values
((select id from companies where name = 'TechCorp Inc.'), (select id from contacts where email = 'jennifer.walsh@techcorp.com'), 'Senior Frontend Developer', 'Looking for an experienced frontend developer to join our team', 'San Francisco, CA', 'full-time', 140000, 180000, 'open'),
((select id from companies where name = 'Global Solutions'), (select id from contacts where email = 'robert.kim@globalsolutions.com'), 'Product Manager', 'Lead product development for our flagship platform', 'New York, NY', 'full-time', 130000, 160000, 'open'),
((select id from companies where name = 'DataTech Systems'), (select id from contacts where email = 'michael.johnson@datatech.com'), 'Data Scientist', 'Build ML models for our analytics platform', 'Seattle, WA', 'full-time', 140000, 170000, 'open'),
((select id from companies where name = 'Innovation Labs'), (select id from contacts where email = 'sarah.davis@innovationlabs.com'), 'UX Designer', 'Design user experiences for our research tools', 'Boston, MA', 'full-time', 90000, 120000, 'open');
