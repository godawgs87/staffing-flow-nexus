
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigationGroups } from './NavigationData';

interface LayoutSidebarProps {
  sidebarOpen: boolean;
  isMobile: boolean;
  onCloseSidebar: () => void;
}

const LayoutSidebar = ({ sidebarOpen, isMobile, onCloseSidebar }: LayoutSidebarProps) => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className={`${
      isMobile 
        ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`
        : sidebarOpen 
          ? 'w-64' 
          : 'w-16'
    } bg-white shadow-sm border-r h-full transition-all duration-300 flex-shrink-0 flex flex-col`}>
      
      {/* Fixed header section */}
      <div className="p-2 flex-shrink-0">
        {/* Mobile close button */}
        {isMobile && (
          <div className="flex justify-end mb-2">
            <Button variant="ghost" size="sm" onClick={onCloseSidebar}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Logo and title */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          {(sidebarOpen || isMobile) && <h1 className="text-xl font-bold text-gray-900">TalentFlow</h1>}
        </div>
      </div>

      {/* Scrollable navigation section */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {/* Navigation groups */}
        {navigationGroups.map((group) => (
          <div key={group.title} className="mb-4">
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
                      onClick={isMobile ? onCloseSidebar : undefined}
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
  );
};

export default LayoutSidebar;
