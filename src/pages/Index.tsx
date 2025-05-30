
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import Candidates from '../components/Candidates';
import Jobs from '../components/Jobs';
import Pipeline from '../components/Pipeline';

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/pipeline" element={<Pipeline />} />
      </Routes>
    </Layout>
  );
};

export default Index;
