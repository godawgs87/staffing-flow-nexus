
import {
  LayoutDashboard,
  User,
  Users,
  Building,
  Briefcase,
  ListChecks,
  BarChart,
  FileSignature,
  ShieldCheck,
  Lightbulb,
  Workflow,
  DollarSign,
  Settings,
  Brain,
} from 'lucide-react';

export const navigationItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
    description: 'Overview of key metrics and activities'
  },
  {
    title: 'AI Agents',
    url: '/ai-agents',
    icon: Brain,
    description: 'Multi-agent AI system for ATS enhancement'
  },
  {
    title: 'Candidates',
    url: '/candidates',
    icon: Users,
    description: 'Manage and track job candidates'
  },
  {
    title: 'Contacts',
    url: '/contacts',
    icon: User,
    description: 'Maintain contact information'
  },
  {
    title: 'Companies',
    url: '/companies',
    icon: Building,
    description: 'Manage company profiles'
  },
  {
    title: 'Jobs',
    url: '/jobs',
    icon: Briefcase,
    description: 'Post and manage job openings'
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: ListChecks,
    description: 'Track project progress and tasks'
  },
  {
    title: 'Pipeline',
    url: '/pipeline',
    icon: Workflow,
    description: 'Visualize application pipeline'
  },
  {
    title: 'Sales',
    url: '/sales',
    icon: BarChart,
    description: 'Track sales performance and opportunities'
  },
  {
    title: 'Contracts',
    url: '/contracts',
    icon: FileSignature,
    description: 'Manage contracts and compliance'
  },
  {
    title: 'Compliance',
    url: '/compliance',
    icon: ShieldCheck,
    description: 'Ensure regulatory compliance'
  },
  {
    title: 'AI Insights',
    url: '/ai-insights',
    icon: Lightbulb,
    description: 'Get AI-powered insights and recommendations'
  },
  {
    title: 'Onboarding',
    url: '/onboarding',
    icon: Workflow,
    description: 'Streamline onboarding process'
  },
  {
    title: 'Payroll',
    url: '/payroll',
    icon: DollarSign,
    description: 'Manage employee payroll and compensation'
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    description: 'Configure application settings'
  }
];

export const navigationGroups = [
  {
    title: 'Overview',
    items: [
      {
        name: 'Dashboard',
        href: '/',
        icon: LayoutDashboard
      },
      {
        name: 'AI Agents',
        href: '/ai-agents',
        icon: Brain
      }
    ]
  },
  {
    title: 'Core ATS',
    items: [
      {
        name: 'Candidates',
        href: '/candidates',
        icon: Users
      },
      {
        name: 'Jobs',
        href: '/jobs',
        icon: Briefcase
      },
      {
        name: 'Pipeline',
        href: '/pipeline',
        icon: Workflow
      },
      {
        name: 'Companies',
        href: '/companies',
        icon: Building
      },
      {
        name: 'Contacts',
        href: '/contacts',
        icon: User
      }
    ]
  },
  {
    title: 'Operations',
    items: [
      {
        name: 'Projects',
        href: '/projects',
        icon: ListChecks
      },
      {
        name: 'Sales',
        href: '/sales',
        icon: BarChart
      },
      {
        name: 'Contracts',
        href: '/contracts',
        icon: FileSignature
      },
      {
        name: 'Compliance',
        href: '/compliance',
        icon: ShieldCheck
      }
    ]
  },
  {
    title: 'AI & Automation',
    items: [
      {
        name: 'AI Insights',
        href: '/ai-insights',
        icon: Lightbulb
      },
      {
        name: 'Onboarding',
        href: '/onboarding',
        icon: Workflow
      }
    ]
  },
  {
    title: 'Management',
    items: [
      {
        name: 'Payroll',
        href: '/payroll',
        icon: DollarSign
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: Settings
      }
    ]
  }
];
