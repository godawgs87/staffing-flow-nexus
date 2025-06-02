
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  Eye
} from 'lucide-react';
import { aiService, ContractAnalysis } from '@/services/aiService';

interface ContractUploadProps {
  onAnalysisComplete?: (analysis: ContractAnalysis) => void;
}

const ContractUpload = ({ onAnalysisComplete }: ContractUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setAnalysis(null);
    }
  }, []);

  const analyzeContract = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        return newProgress > 90 ? 90 : newProgress;
      });
    }, 200);

    try {
      // In a real implementation, you'd extract text from the PDF/document
      const mockContractText = `
        This Software Development Agreement requires the contractor to maintain 
        General Liability insurance of $1M and Professional Liability of $2M.
        All personnel must complete SOC 2 compliance training and background checks.
        Work will be performed remotely with occasional travel to California.
        Security awareness training is mandatory for all team members.
        Required roles include Senior Software Engineer and Frontend Developer.
      `;

      const contractAnalysis = await aiService.analyzeContract(mockContractText);
      
      clearInterval(progressInterval);
      setProgress(100);
      setAnalysis(contractAnalysis);
      onAnalysisComplete?.(contractAnalysis);
    } catch (error) {
      console.error('Error analyzing contract:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Contract Upload & AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="contract-upload"
            />
            <label htmlFor="contract-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600">
                {file ? file.name : 'Click to upload contract (PDF, DOC, DOCX, TXT)'}
              </p>
            </label>
          </div>

          {file && !analysis && (
            <Button 
              onClick={analyzeContract} 
              disabled={isAnalyzing}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Contract with AI
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
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI Analysis Results
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {analysis.confidence}% Confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Analysis */}
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Risk Analysis
                </h4>
                <div className="space-y-2">
                  <Badge className={getRiskColor(analysis.riskAnalysis.level)}>
                    {analysis.riskAnalysis.level.toUpperCase()} RISK
                  </Badge>
                  {analysis.riskAnalysis.issues.map((issue, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-start">
                      <AlertTriangle className="h-3 w-3 mr-2 mt-1 text-yellow-500" />
                      {issue}
                    </div>
                  ))}
                </div>
              </div>

              {/* Extracted Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Insurance Requirements</h4>
                  <div className="space-y-1">
                    {analysis.extractedRequirements.insurance.map((req, index) => (
                      <Badge key={index} variant="secondary" className="block w-fit">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Compliance Requirements</h4>
                  <div className="space-y-1">
                    {analysis.extractedRequirements.compliance.map((req, index) => (
                      <Badge key={index} variant="secondary" className="block w-fit">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Training Requirements</h4>
                  <div className="space-y-1">
                    {analysis.extractedRequirements.training.map((req, index) => (
                      <Badge key={index} variant="secondary" className="block w-fit">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Required Roles</h4>
                  <div className="space-y-1">
                    {analysis.extractedRequirements.roles.map((role, index) => (
                      <Badge key={index} variant="secondary" className="block w-fit">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generated Workflow */}
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  AI-Generated Onboarding Workflow
                </h4>
                <div className="space-y-2">
                  {analysis.workflowSteps.map((step, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-sm">{step.step}</p>
                          <p className="text-xs text-gray-500 capitalize">{step.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          step.priority === 'high' ? 'bg-red-100 text-red-800' :
                          step.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {step.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">{step.estimatedDays} days</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContractUpload;
