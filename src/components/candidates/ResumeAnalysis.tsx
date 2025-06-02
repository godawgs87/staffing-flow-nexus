
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  Brain, 
  Loader2, 
  Check, 
  X,
  User,
  BookOpen,
  Award,
  Briefcase
} from 'lucide-react';
import { aiService, ResumeAnalysis as ResumeAnalysisType } from '@/services/aiService';

interface ResumeAnalysisProps {
  jobTitle?: string;
  jobRequirements?: string;
  onAnalysisComplete?: (analysis: ResumeAnalysisType) => void;
}

const ResumeAnalysis = ({ 
  jobTitle = 'Senior Software Engineer',
  jobRequirements = 'React, TypeScript, 5+ years experience, AWS, CI/CD',
  onAnalysisComplete
}: ResumeAnalysisProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisType | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setAnalysis(null);
    }
  };

  const analyzeResume = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        return newProgress > 90 ? 90 : newProgress;
      });
    }, 300);

    try {
      // In a real implementation, you'd extract text from the PDF resume
      const mockResumeText = `
        John Doe
        Senior Software Engineer with 7 years experience
        Skills: JavaScript, TypeScript, React, Node.js, AWS, Docker
        
        Experience:
        Tech Company (2020-Present)
        - Led development of React applications
        - Implemented CI/CD pipelines using GitHub Actions
        
        Previous Company (2017-2020)
        - Full-stack development with Node.js and Angular
        
        Education:
        BS Computer Science, University of Technology
      `;

      const resumeAnalysis = await aiService.analyzeResume(mockResumeText, jobRequirements);
      
      clearInterval(progressInterval);
      setProgress(100);
      setAnalysis(resumeAnalysis);
      onAnalysisComplete?.(resumeAnalysis);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Resume Analysis for {jobTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600">
                {file ? file.name : 'Click to upload resume (PDF, DOC, DOCX)'}
              </p>
            </label>
          </div>

          {file && !analysis && (
            <Button 
              onClick={analyzeResume} 
              disabled={isAnalyzing}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Resume with AI
                </>
              )}
            </Button>
          )}

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Analysis Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Resume Analysis Results
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {analysis.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Candidate Info</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">{analysis.extractedInfo.experience_years} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{analysis.extractedInfo.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <BookOpen className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Education & Certification</h3>
                  </div>
                  <div className="space-y-2">
                    {analysis.extractedInfo.education.map((edu, index) => (
                      <Badge key={index} variant="secondary" className="mr-1 mb-1">
                        {edu}
                      </Badge>
                    ))}
                    {analysis.extractedInfo.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="mr-1 mb-1 bg-green-50">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Briefcase className="h-5 w-5 text-purple-500" />
                    <h3 className="font-medium">Previous Roles</h3>
                  </div>
                  <div className="space-y-2">
                    {analysis.extractedInfo.previous_roles.map((role, index) => (
                      <Badge key={index} variant="secondary" className="mr-1 mb-1">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job Match Analysis */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Job Match Analysis</h3>
                <Badge className={
                  analysis.matching.job_match_score > 80 ? "bg-green-100 text-green-800" :
                  analysis.matching.job_match_score > 60 ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }>
                  {analysis.matching.job_match_score}% Match
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium flex items-center mb-2">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Strengths
                  </h4>
                  <div className="space-y-1">
                    {analysis.matching.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Check className="h-3 w-3 text-green-500 mr-2" />
                        <span>{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium flex items-center mb-2">
                    <X className="h-4 w-4 text-red-500 mr-2" />
                    Missing Skills
                  </h4>
                  <div className="space-y-1">
                    {analysis.matching.missing_skills.map((skill, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <X className="h-3 w-3 text-red-500 mr-2" />
                        <span>{skill}</span>
                      </div>
                    ))}
                    {analysis.matching.missing_skills.length === 0 && (
                      <p className="text-sm text-gray-500">No missing skills detected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="font-medium mb-3">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.extractedInfo.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className={
                    analysis.matching.strengths.includes(skill)
                      ? "border-green-300 bg-green-50"
                      : "border-gray-300"
                  }>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div>
              <h3 className="font-medium mb-3">AI Recommendations</h3>
              <div className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    • {rec}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <User className="h-4 w-4 mr-2" />
                Add to Pipeline
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeAnalysis;
