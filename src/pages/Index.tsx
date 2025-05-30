
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import Candidates from '../components/Candidates';
import Jobs from '../components/Jobs';
import Projects from '../components/Projects';
import Pipeline from '../components/Pipeline';
import WorkflowSettings from '../components/WorkflowSettings';

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/settings" element={<WorkflowSettings />} />
      </Routes>
    </Layout>
  );
};

export default Index;
