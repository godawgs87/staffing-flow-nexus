
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Users, Briefcase, BarChart3, GitBranch, FolderOpen, Settings, Menu, Bell, Search, User, UserCheck, DollarSign, Shield, Brain, Building2, Contact, SearchIcon, LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import UniversalSearch from './search/UniversalSearch';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { signOut, user } = useAuth();
  const isMobile = useIsMobile();

  const navigationGroups = [
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

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <nav className={`${
        isMobile 
          ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : sidebarOpen 
            ? 'w-64' 
            : 'w-16'
      } bg-white shadow-sm border-r min-h-screen transition-all duration-300 flex-shrink-0`}>
        <div className="p-4">
          {/* Mobile close button */}
          {isMobile && (
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="sm" onClick={closeSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Logo and title */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            {(sidebarOpen || isMobile) && <h1 className="text-xl font-bold text-gray-900">TalentFlow</h1>}
          </div>

          {/* Navigation groups */}
          {navigationGroups.map((group) => (
            <div key={group.title} className="mb-6">
              {(sidebarOpen || isMobile) && (
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        onClick={isMobile ? closeSidebar : undefined}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        {(sidebarOpen || isMobile) && <span className="ml-3">{item.name}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Header */}
        <header className="bg-white shadow-sm border-b flex-shrink-0">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSearchOpen(true)}
                className="w-32 md:w-64 justify-start text-gray-500"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Search candidates, companies...</span>
                <span className="md:hidden">Search...</span>
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500">
                  3
                </Badge>
              </Button>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-600">{user?.email}</span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto w-full bg-gray-50">
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Universal Search Modal */}
      <UniversalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
};

export default Layout;
