
// Simulates integration with external ATS systems
export interface ATSCandidate {
  external_id: string;
  ats_system: 'greenhouse' | 'lever' | 'bamboohr' | 'workday';
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  resume_url?: string;
  status: string;
  applied_date: string;
  job_id?: string;
}

export interface ATSJob {
  external_id: string;
  ats_system: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  status: 'open' | 'closed' | 'draft';
  created_date: string;
}

export interface ATSContract {
  external_id: string;
  ats_system: string;
  client_name: string;
  contract_text: string;
  requirements: string[];
  status: 'active' | 'pending' | 'expired';
  start_date: string;
}

export interface AIRecommendation {
  type: 'candidate_match' | 'contract_compliance' | 'capacity_planning';
  confidence: number;
  recommendation: string;
  data: any;
  created_at: string;
}

export class ATSIntegrationService {
  private static instance: ATSIntegrationService;

  static getInstance(): ATSIntegrationService {
    if (!ATSIntegrationService.instance) {
      ATSIntegrationService.instance = new ATSIntegrationService();
    }
    return ATSIntegrationService.instance;
  }

  // Simulate receiving data from external ATS
  async fetchCandidatesFromATS(atsSystem: string): Promise<ATSCandidate[]> {
    console.log(`Fetching candidates from ${atsSystem}...`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data that would come from external ATS
    return [
      {
        external_id: 'gh_12345',
        ats_system: 'greenhouse',
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1-555-0123',
        status: 'application_review',
        applied_date: '2024-06-15',
        job_id: 'job_001'
      },
      {
        external_id: 'lv_67890',
        ats_system: 'lever',
        first_name: 'Michael',
        last_name: 'Chen',
        email: 'michael.chen@email.com',
        status: 'phone_screen',
        applied_date: '2024-06-14',
        job_id: 'job_002'
      }
    ];
  }

  async fetchJobsFromATS(atsSystem: string): Promise<ATSJob[]> {
    console.log(`Fetching jobs from ${atsSystem}...`);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        external_id: 'job_001',
        ats_system: atsSystem,
        title: 'Senior Software Engineer',
        description: 'Looking for an experienced software engineer...',
        requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
        location: 'Remote',
        status: 'open',
        created_date: '2024-06-10'
      }
    ];
  }

  async fetchContractsFromATS(atsSystem: string): Promise<ATSContract[]> {
    console.log(`Fetching contracts from ${atsSystem}...`);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return [
      {
        external_id: 'contract_001',
        ats_system: atsSystem,
        client_name: 'TechCorp Solutions',
        contract_text: 'Software development services agreement...',
        requirements: ['Insurance', 'Background Check', 'Security Training'],
        status: 'active',
        start_date: '2024-06-01'
      }
    ];
  }

  // Simulate sending AI recommendations back to ATS
  async sendRecommendationToATS(atsSystem: string, recommendation: AIRecommendation): Promise<boolean> {
    console.log(`Sending recommendation to ${atsSystem}:`, recommendation);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true; // Success
  }

  // Simulate webhook endpoints for real-time data sync
  async setupWebhooks(atsSystem: string): Promise<{ webhook_url: string; events: string[] }> {
    return {
      webhook_url: `https://your-ai-service.com/webhooks/${atsSystem}`,
      events: ['candidate.created', 'candidate.updated', 'job.created', 'contract.uploaded']
    };
  }
}

export const atsIntegration = ATSIntegrationService.getInstance();
