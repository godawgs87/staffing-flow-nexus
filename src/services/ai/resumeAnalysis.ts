
export interface ResumeAnalysis {
  confidence: number;
  extractedInfo: {
    skills: string[];
    experience_years: number;
    education: string[];
    certifications: string[];
    previous_roles: string[];
    location: string;
  };
  matching: {
    job_match_score: number;
    missing_skills: string[];
    strengths: string[];
  };
  recommendations: string[];
}

export class ResumeAnalysisService {
  async analyzeResume(resumeText: string, jobRequirements?: string): Promise<ResumeAnalysis> {
    console.log('Analyzing resume with AI...', resumeText.substring(0, 100));
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockAnalysis: ResumeAnalysis = {
      confidence: Math.floor(Math.random() * 15) + 85,
      extractedInfo: {
        skills: this.extractSkills(resumeText),
        experience_years: this.extractExperience(resumeText),
        education: this.extractEducation(resumeText),
        certifications: this.extractCertifications(resumeText),
        previous_roles: this.extractPreviousRoles(resumeText),
        location: this.extractLocation(resumeText)
      },
      matching: jobRequirements ? this.matchToJob(resumeText, jobRequirements) : {
        job_match_score: 0,
        missing_skills: [],
        strengths: []
      },
      recommendations: this.generateRecommendations(resumeText)
    };

    return mockAnalysis;
  }

  private extractSkills(text: string): string[] {
    const skillKeywords = ['javascript', 'react', 'python', 'sql', 'aws', 'docker', 'kubernetes'];
    const lowerText = text.toLowerCase();
    
    return skillKeywords.filter(skill => lowerText.includes(skill));
  }

  private extractExperience(text: string): number {
    const experienceMatch = text.match(/(\d+)\s*(?:years?|yrs?)\s*(?:of\s*)?experience/i);
    return experienceMatch ? parseInt(experienceMatch[1]) : Math.floor(Math.random() * 10) + 2;
  }

  private extractEducation(text: string): string[] {
    const education = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('bachelor') || lowerText.includes('bs') || lowerText.includes('ba')) {
      education.push('Bachelor\'s Degree');
    }
    if (lowerText.includes('master') || lowerText.includes('ms') || lowerText.includes('ma')) {
      education.push('Master\'s Degree');
    }
    if (lowerText.includes('phd') || lowerText.includes('doctorate')) {
      education.push('PhD');
    }
    
    return education;
  }

  private extractCertifications(text: string): string[] {
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

  private extractPreviousRoles(text: string): string[] {
    const roles = ['Software Engineer', 'Developer', 'Analyst', 'Manager', 'Consultant'];
    const lowerText = text.toLowerCase();
    
    return roles.filter(role => lowerText.includes(role.toLowerCase()));
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

  private matchToJob(resumeText: string, jobRequirements: string): { job_match_score: number; missing_skills: string[]; strengths: string[] } {
    const resumeSkills = this.extractSkills(resumeText);
    const requiredSkills = this.extractSkills(jobRequirements);
    
    const matchingSkills = resumeSkills.filter(skill => requiredSkills.includes(skill));
    const missingSkills = requiredSkills.filter(skill => !resumeSkills.includes(skill));
    
    const matchScore = requiredSkills.length > 0 ? Math.round((matchingSkills.length / requiredSkills.length) * 100) : 75;
    
    return {
      job_match_score: matchScore,
      missing_skills: missingSkills,
      strengths: matchingSkills
    };
  }

  private generateRecommendations(text: string): string[] {
    const recommendations = [
      'Consider highlighting quantifiable achievements',
      'Add more technical skills relevant to target roles',
      'Include specific project examples with results'
    ];
    
    return recommendations.slice(0, Math.floor(Math.random() * 3) + 1);
  }
}
