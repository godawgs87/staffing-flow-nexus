
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import Candidates from '../components/Candidates';
import Contacts from '../components/Contacts';
import Companies from '../components/Companies';
import Jobs from '../components/Jobs';
import Projects from '../components/Projects';
import Pipeline from '../components/Pipeline';
import SalesPipeline from '../components/SalesPipeline';
import ContractIntelligence from '../components/ContractIntelligence';
import ComplianceManagement from '../components/ComplianceManagement';
import AIInsights from '../components/AIInsights';
import OnboardingWorkflow from '../components/OnboardingWorkflow';
import PayrollManagement from '../components/PayrollManagement';
import UserSettings from '../components/UserSettings';
import AdminDashboard from '../components/AdminDashboard';

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/sales" element={<SalesPipeline />} />
        <Route path="/contracts" element={<ContractIntelligence />} />
        <Route path="/compliance" element={<ComplianceManagement />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/onboarding" element={<OnboardingWorkflow />} />
        <Route path="/payroll" element={<PayrollManagement />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
    </Layout>
  );
};

export default Index;
