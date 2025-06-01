
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  DollarSign, 
  Clock, 
  Users, 
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Download,
  Send,
  Calculator
} from 'lucide-react';

const PayrollManagement = () => {
  const [activeTab, setActiveTab] = useState('current');

  const payrollSummary = {
    currentPeriod: {
      totalHours: 1248,
      totalPay: 52800,
      contractors: 24,
      pendingApprovals: 8
    },
    lastPeriod: {
      totalHours: 1156,
      totalPay: 48720,
      contractors: 22,
      pendingApprovals: 0
    }
  };

  const timesheets = [
    {
      id: 1,
      contractor: 'Sarah Johnson',
      client: 'TechCorp Inc.',
      position: 'Software Developer',
      weekEnding: '2024-06-07',
      regularHours: 40,
      overtimeHours: 5,
      rate: 65,
      totalPay: 2925,
      status: 'pending-approval',
      location: 'Remote'
    },
    {
      id: 2,
      contractor: 'Michael Chen',
      client: 'Global Solutions',
      position: 'Project Manager',
      weekEnding: '2024-06-07',
      regularHours: 45,
      overtimeHours: 0,
      rate: 75,
      totalPay: 3375,
      status: 'approved',
      location: 'On-site'
    },
    {
      id: 3,
      contractor: 'Emily Rodriguez',
      client: 'Creative Agency',
      position: 'Marketing Specialist',
      weekEnding: '2024-06-07',
      regularHours: 38,
      overtimeHours: 2,
      rate: 55,
      totalPay: 2255,
      status: 'submitted',
      location: 'Hybrid'
    }
  ];

  const payrollRuns = [
    {
      id: 1,
      period: 'June 1-7, 2024',
      contractors: 24,
      totalAmount: 52800,
      status: 'processing',
      payDate: '2024-06-12'
    },
    {
      id: 2,
      period: 'May 25-31, 2024',
      contractors: 22,
      totalAmount: 48720,
      status: 'completed',
      payDate: '2024-06-05'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': case 'completed': return 'bg-green-100 text-green-800';
      case 'pending-approval': case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600">Automated timesheet processing and multi-state compliance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4 mr-2" />
            Run Payroll
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold">{payrollSummary.currentPeriod.totalHours.toLocaleString()}</p>
                <p className="text-xs text-green-600">
                  +{calculateGrowth(payrollSummary.currentPeriod.totalHours, payrollSummary.lastPeriod.totalHours)}%
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Payroll</p>
                <p className="text-2xl font-bold">${payrollSummary.currentPeriod.totalPay.toLocaleString()}</p>
                <p className="text-xs text-green-600">
                  +{calculateGrowth(payrollSummary.currentPeriod.totalPay, payrollSummary.lastPeriod.totalPay)}%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Contractors</p>
                <p className="text-2xl font-bold">{payrollSummary.currentPeriod.contractors}</p>
                <p className="text-xs text-green-600">
                  +{payrollSummary.currentPeriod.contractors - payrollSummary.lastPeriod.contractors}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold">{payrollSummary.currentPeriod.pendingApprovals}</p>
                <p className="text-xs text-red-600">Requires attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current Period</TabsTrigger>
          <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
          <TabsTrigger value="payroll-runs">Payroll Runs</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Current Pay Period: June 1-7, 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timesheets.map((timesheet) => (
                  <div key={timesheet.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{timesheet.contractor}</h4>
                        <p className="text-sm text-gray-600">{timesheet.position} • {timesheet.client}</p>
                      </div>
                      <Badge className={getStatusColor(timesheet.status)}>
                        {timesheet.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Regular Hours</p>
                        <p className="font-medium">{timesheet.regularHours}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">OT Hours</p>
                        <p className="font-medium">{timesheet.overtimeHours}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rate</p>
                        <p className="font-medium">${timesheet.rate}/hr</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Pay</p>
                        <p className="font-medium">${timesheet.totalPay.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-medium">{timesheet.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      {timesheet.status === 'pending-approval' && (
                        <>
                          <Button variant="outline" size="sm">Reject</Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timesheets">
          <Card>
            <CardHeader>
              <CardTitle>Timesheet Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Input placeholder="Search contractor..." className="max-w-sm" />
                <Button variant="outline">Filter by Status</Button>
                <Button variant="outline">Filter by Client</Button>
              </div>
              <p className="text-gray-600">Detailed timesheet review and approval interface</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll-runs">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Run History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {payrollRuns.map((run) => (
                <div key={run.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{run.period}</h4>
                      <p className="text-sm text-gray-600">
                        {run.contractors} contractors • ${run.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(run.status)}>
                        {run.status}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">Pay Date: {run.payDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Payroll Analytics & Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Calculator className="h-6 w-6 mb-2" />
                  Labor Cost Analysis
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Margin Reports
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  Certified Payroll
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollManagement;
