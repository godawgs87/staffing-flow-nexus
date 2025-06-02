
export interface ContractAnalysis {
  confidence: number;
  extractedRequirements: {
    insurance: string[];
    compliance: string[];
    location: string;
    training: string[];
    roles: string[];
    certificates: string[];
    background_checks: string[];
  };
  riskAnalysis: {
    level: 'low' | 'medium' | 'high';
    issues: string[];
    recommendations: string[];
  };
  workflowSteps: {
    step: string;
    category: string;
    priority: 'high' | 'medium' | 'low';
    estimatedDays: number;
  }[];
}

export class ContractAnalysisService {
  async analyzeContract(contractText: string): Promise<ContractAnalysis> {
    console.log('Analyzing contract with AI...', contractText.substring(0, 100));
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockAnalysis: ContractAnalysis = {
      confidence: Math.floor(Math.random() * 20) + 80,
      extractedRequirements: {
        insurance: this.extractInsuranceRequirements(contractText),
        compliance: this.extractComplianceRequirements(contractText),
        location: this.extractLocation(contractText),
        training: this.extractTrainingRequirements(contractText),
        roles: this.extractRoles(contractText),
        certificates: this.extractCertificates(contractText),
        background_checks: this.extractBackgroundChecks(contractText)
      },
      riskAnalysis: this.analyzeRisks(contractText),
      workflowSteps: this.generateWorkflowSteps(contractText)
    };

    return mockAnalysis;
  }

  private extractInsuranceRequirements(text: string): string[] {
    const insuranceKeywords = ['liability', 'insurance', 'coverage', 'workers comp'];
    const requirements = [];
    
    if (insuranceKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
      requirements.push('General Liability $1M', 'Professional Liability $2M');
      if (text.toLowerCase().includes('workers')) {
        requirements.push('Workers Compensation');
      }
    }
    
    return requirements;
  }

  private extractComplianceRequirements(text: string): string[] {
    const requirements = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('soc') || lowerText.includes('security')) {
      requirements.push('SOC 2 Type II');
    }
    if (lowerText.includes('background') || lowerText.includes('check')) {
      requirements.push('Background Check Required');
    }
    if (lowerText.includes('pci') || lowerText.includes('payment')) {
      requirements.push('PCI DSS Compliance');
    }
    
    return requirements;
  }

  private extractLocation(text: string): string {
    const states = ['california', 'new york', 'texas', 'florida'];
    const lowerText = text.toLowerCase();
    
    for (const state of states) {
      if (lowerText.includes(state)) {
        return state.charAt(0).toUpperCase() + state.slice(1);
      }
    }
    
    if (lowerText.includes('remote')) {
      return 'Remote';
    }
    
    return 'Multiple Locations';
  }

  private extractTrainingRequirements(text: string): string[] {
    const requirements = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('security') || lowerText.includes('training')) {
      requirements.push('Security Awareness Training');
    }
    if (lowerText.includes('onboard') || lowerText.includes('orientation')) {
      requirements.push('Company Onboarding');
    }
    if (lowerText.includes('harassment') || lowerText.includes('workplace')) {
      requirements.push('Workplace Safety Training');
    }
    
    return requirements;
  }

  private extractRoles(text: string): string[] {
    const roles = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('developer') || lowerText.includes('engineer')) {
      roles.push('Software Engineer', 'Senior Developer');
    }
    if (lowerText.includes('consultant')) {
      roles.push('Technical Consultant');
    }
    if (lowerText.includes('analyst')) {
      roles.push('Business Analyst');
    }
    
    return roles;
  }

  private extractCertificates(text: string): string[] {
    const certs = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('aws') || lowerText.includes('cloud')) {
      certs.push('AWS Certification');
    }
    if (lowerText.includes('security') || lowerText.includes('cissp')) {
      certs.push('Security Certification');
    }
    
    return certs;
  }

  private extractBackgroundChecks(text: string): string[] {
    const checks = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('criminal') || lowerText.includes('background')) {
      checks.push('Criminal Background Check');
    }
    if (lowerText.includes('drug') || lowerText.includes('screening')) {
      checks.push('Drug Screening');
    }
    if (lowerText.includes('reference')) {
      checks.push('Reference Check');
    }
    
    return checks;
  }

  private analyzeRisks(text: string): { level: 'low' | 'medium' | 'high'; issues: string[]; recommendations: string[] } {
    const issues = [];
    const recommendations = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('unlimited') || lowerText.includes('indefinite')) {
      issues.push('Unlimited liability clause detected');
      recommendations.push('Consider negotiating liability caps');
    }
    
    if (lowerText.includes('penalty') || lowerText.includes('fine')) {
      issues.push('Financial penalties mentioned');
      recommendations.push('Review penalty terms carefully');
    }
    
    const riskLevel = issues.length > 2 ? 'high' : issues.length > 0 ? 'medium' : 'low';
    
    return { level: riskLevel, issues, recommendations };
  }

  private generateWorkflowSteps(text: string): { step: string; category: string; priority: 'high' | 'medium' | 'low'; estimatedDays: number }[] {
    const steps = [
      { step: 'Insurance Verification', category: 'compliance', priority: 'high' as const, estimatedDays: 2 },
      { step: 'Background Check Initiation', category: 'screening', priority: 'high' as const, estimatedDays: 5 },
      { step: 'Training Module Assignment', category: 'training', priority: 'medium' as const, estimatedDays: 1 },
      { step: 'Equipment Procurement', category: 'logistics', priority: 'medium' as const, estimatedDays: 3 },
      { step: 'System Access Setup', category: 'technical', priority: 'low' as const, estimatedDays: 1 }
    ];
    
    return steps;
  }
}
