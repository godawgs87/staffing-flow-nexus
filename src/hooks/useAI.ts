
import { useState } from 'react';
import { aiService, ContractAnalysis, ResumeAnalysis } from '@/services/aiService';

export const useAI = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const analyzeContract = async (contractText: string): Promise<ContractAnalysis | null> => {
    setIsProcessing(true);
    setProgress(0);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 10, 90));
    }, 300);
    
    try {
      const result = await aiService.analyzeContract(contractText);
      setProgress(100);
      return result;
    } catch (error) {
      console.error('Error analyzing contract:', error);
      return null;
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };
  
  const analyzeResume = async (resumeText: string, jobRequirements?: string): Promise<ResumeAnalysis | null> => {
    setIsProcessing(true);
    setProgress(0);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 10, 90));
    }, 300);
    
    try {
      const result = await aiService.analyzeResume(resumeText, jobRequirements);
      setProgress(100);
      return result;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      return null;
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  const generateJobDescription = async (jobTitle: string, skills: string[], location: string): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Mock implementation - in production, this would call the AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return `
# ${jobTitle}

## About the Role
We are seeking an exceptional ${jobTitle} to join our growing team. This role is ${location}-based and requires expertise in ${skills.join(', ')}.

## Requirements
- Proven experience with ${skills[0]} and ${skills[1]}
- Strong background in collaborative development
- Excellent communication skills
- Problem-solving attitude

## Benefits
- Competitive salary
- Remote work flexibility
- Professional development opportunities
- Health and wellness benefits
      `;
    } catch (error) {
      console.error('Error generating job description:', error);
      return '';
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    analyzeContract,
    analyzeResume,
    generateJobDescription,
    isProcessing,
    progress
  };
};
