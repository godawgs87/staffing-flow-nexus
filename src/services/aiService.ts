
import { ContractAnalysisService, ContractAnalysis } from './ai/contractAnalysis';
import { ResumeAnalysisService, ResumeAnalysis } from './ai/resumeAnalysis';
import { JobGenerationService } from './ai/jobGeneration';

export { ContractAnalysis, ResumeAnalysis } from './ai/contractAnalysis';
export type { ResumeAnalysis as ResumeAnalysisType } from './ai/resumeAnalysis';

export class AIService {
  private static instance: AIService;
  private contractAnalysis: ContractAnalysisService;
  private resumeAnalysis: ResumeAnalysisService;
  private jobGeneration: JobGenerationService;

  private constructor() {
    this.contractAnalysis = new ContractAnalysisService();
    this.resumeAnalysis = new ResumeAnalysisService();
    this.jobGeneration = new JobGenerationService();
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async analyzeContract(contractText: string): Promise<ContractAnalysis> {
    return this.contractAnalysis.analyzeContract(contractText);
  }

  async analyzeResume(resumeText: string, jobRequirements?: string): Promise<ResumeAnalysis> {
    return this.resumeAnalysis.analyzeResume(resumeText, jobRequirements);
  }

  async generateJobDescription(jobTitle: string, skills: string[], location: string): Promise<string> {
    return this.jobGeneration.generateJobDescription(jobTitle, skills, location);
  }
}

export const aiService = AIService.getInstance();
