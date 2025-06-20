
import { aiService } from './aiService';
import { atsIntegration, ATSCandidate, ATSJob, ATSContract, AIRecommendation } from './atsIntegration';

export interface AgentCoordination {
  trigger_agent: 'project_management' | 'recruiting' | 'contract_compliance';
  target_agent: 'project_management' | 'recruiting' | 'contract_compliance';
  action: string;
  data: any;
  timestamp: string;
}

export class AIAgentsOrchestrator {
  private static instance: AIAgentsOrchestrator;
  private activeCoordinations: AgentCoordination[] = [];

  static getInstance(): AIAgentsOrchestrator {
    if (!AIAgentsOrchestrator.instance) {
      AIAgentsOrchestrator.instance = new AIAgentsOrchestrator();
    }
    return AIAgentsOrchestrator.instance;
  }

  // Contract Compliance Agent processes new contract
  async processNewContract(contract: ATSContract): Promise<AIRecommendation[]> {
    console.log('Contract Compliance Agent: Processing new contract...', contract.client_name);
    
    const analysis = await aiService.analyzeContract(contract.contract_text);
    const recommendations: AIRecommendation[] = [];

    // Generate compliance recommendation
    const complianceRecommendation: AIRecommendation = {
      type: 'contract_compliance',
      confidence: analysis.confidence,
      recommendation: `Contract analysis complete. Found ${analysis.extractedRequirements.roles.length} required roles with ${analysis.riskAnalysis.level} risk level.`,
      data: analysis,
      created_at: new Date().toISOString()
    };
    recommendations.push(complianceRecommendation);

    // Trigger Recruiting Agent if roles are needed
    if (analysis.extractedRequirements.roles.length > 0) {
      const coordination: AgentCoordination = {
        trigger_agent: 'contract_compliance',
        target_agent: 'recruiting',
        action: 'source_candidates',
        data: {
          required_roles: analysis.extractedRequirements.roles,
          required_skills: analysis.extractedRequirements.certificates,
          location: analysis.extractedRequirements.location
        },
        timestamp: new Date().toISOString()
      };
      
      this.activeCoordinations.push(coordination);
      console.log('Contract Compliance Agent → Recruiting Agent: Source candidates for roles');
    }

    return recommendations;
  }

  // Recruiting Agent processes candidate matching
  async processCandidateMatching(job: ATSJob, candidates: ATSCandidate[]): Promise<AIRecommendation[]> {
    console.log('Recruiting Agent: Processing candidate matching...', job.title);
    
    const recommendations: AIRecommendation[] = [];

    for (const candidate of candidates) {
      // Simulate resume analysis
      const mockResumeText = `${candidate.first_name} ${candidate.last_name} - Software Engineer with experience in React, TypeScript`;
      const analysis = await aiService.analyzeResume(mockResumeText, job.description);

      const matchRecommendation: AIRecommendation = {
        type: 'candidate_match',
        confidence: analysis.matching.job_match_score,
        recommendation: `Candidate ${candidate.first_name} ${candidate.last_name} has ${analysis.matching.job_match_score}% match for ${job.title}`,
        data: {
          candidate_id: candidate.external_id,
          job_id: job.external_id,
          match_score: analysis.matching.job_match_score,
          strengths: analysis.matching.strengths,
          missing_skills: analysis.matching.missing_skills
        },
        created_at: new Date().toISOString()
      };
      recommendations.push(matchRecommendation);
    }

    // Trigger Project Management Agent for capacity planning
    const coordination: AgentCoordination = {
      trigger_agent: 'recruiting',
      target_agent: 'project_management',
      action: 'capacity_planning',
      data: {
        job_id: job.external_id,
        matched_candidates: recommendations.length,
        estimated_start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      timestamp: new Date().toISOString()
    };
    
    this.activeCoordinations.push(coordination);
    console.log('Recruiting Agent → Project Management Agent: Plan capacity for new hires');

    return recommendations;
  }

  // Project Management Agent handles capacity and project planning
  async processCapacityPlanning(projectData: any): Promise<AIRecommendation[]> {
    console.log('Project Management Agent: Processing capacity planning...', projectData);
    
    // Simulate capacity analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    const capacityRecommendation: AIRecommendation = {
      type: 'capacity_planning',
      confidence: 85,
      recommendation: `Capacity analysis complete. Team can onboard ${projectData.matched_candidates} new members starting ${new Date(projectData.estimated_start_date).toLocaleDateString()}`,
      data: {
        current_capacity: 75,
        projected_capacity: 85,
        onboarding_timeline: '2-3 weeks',
        resource_conflicts: []
      },
      created_at: new Date().toISOString()
    };

    return [capacityRecommendation];
  }

  // Get all agent coordinations for dashboard
  getActiveCoordinations(): AgentCoordination[] {
    return this.activeCoordinations;
  }

  // Simulate end-to-end workflow
  async simulateFullWorkflow(atsSystem: string): Promise<{
    contract_analysis: AIRecommendation[];
    candidate_matching: AIRecommendation[];
    capacity_planning: AIRecommendation[];
    coordinations: AgentCoordination[];
  }> {
    console.log(`Starting full AI workflow simulation for ${atsSystem}...`);
    
    // Step 1: Fetch data from ATS
    const [contracts, jobs, candidates] = await Promise.all([
      atsIntegration.fetchContractsFromATS(atsSystem),
      atsIntegration.fetchJobsFromATS(atsSystem),
      atsIntegration.fetchCandidatesFromATS(atsSystem)
    ]);

    // Step 2: Process with AI agents
    const contractAnalysis = contracts.length > 0 
      ? await this.processNewContract(contracts[0]) 
      : [];
    
    const candidateMatching = jobs.length > 0 && candidates.length > 0
      ? await this.processCandidateMatching(jobs[0], candidates)
      : [];
    
    const capacityPlanning = await this.processCapacityPlanning({
      matched_candidates: candidateMatching.length,
      estimated_start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    });

    return {
      contract_analysis: contractAnalysis,
      candidate_matching: candidateMatching,
      capacity_planning: capacityPlanning,
      coordinations: this.activeCoordinations
    };
  }
}

export const aiAgentsOrchestrator = AIAgentsOrchestrator.getInstance();
