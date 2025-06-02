
import { Users, Briefcase, BarChart3, GitBranch, FolderOpen, Settings, DollarSign, Shield, Brain, Building2, Contact, UserCheck } from 'lucide-react';

export const navigationGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/', icon: BarChart3 },
    ]
  },
  {
    title: 'People & Companies',
    items: [
      { name: 'Candidates', href: '/candidates', icon: Users },
      { name: 'Contacts', href: '/contacts', icon: Contact },
      { name: 'Companies', href: '/companies', icon: Building2 },
    ]
  },
  {
    title: 'Projects & Jobs',
    items: [
      { name: 'Active Jobs', href: '/jobs', icon: Briefcase },
      { name: 'Pipeline', href: '/pipeline', icon: GitBranch },
      { name: 'Projects', href: '/projects', icon: FolderOpen },
    ]
  },
  {
    title: 'Business Operations',
    items: [
      { name: 'Sales Pipeline', href: '/sales', icon: DollarSign },
      { name: 'Contracts', href: '/contracts', icon: Brain },
      { name: 'Compliance', href: '/compliance', icon: Shield },
      { name: 'Payroll', href: '/payroll', icon: DollarSign },
    ]
  },
  {
    title: 'Workforce',
    items: [
      { name: 'Onboarding', href: '/onboarding', icon: UserCheck },
      { name: 'AI Insights', href: '/ai-insights', icon: Brain },
    ]
  },
  {
    title: 'Administration',
    items: [
      { name: 'Admin', href: '/admin', icon: Shield },
      { name: 'Settings', href: '/settings', icon: Settings },
    ]
  }
];
