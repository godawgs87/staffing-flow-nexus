
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import LayoutSidebar from './layout/LayoutSidebar';
import LayoutHeader from './layout/LayoutHeader';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="h-screen bg-gray-50 flex w-full overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <LayoutSidebar 
        sidebarOpen={sidebarOpen} 
        isMobile={isMobile} 
        onCloseSidebar={closeSidebar} 
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 w-full h-full">
        {/* Header */}
        <LayoutHeader onToggleSidebar={toggleSidebar} />

        {/* Main Content - Now properly scrollable */}
        <main className="flex-1 h-0 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
