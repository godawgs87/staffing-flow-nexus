
import React, { useState } from 'react';
import { Menu, Bell, SearchIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import UniversalSearch from '../search/UniversalSearch';

interface LayoutHeaderProps {
  onToggleSidebar: () => void;
}

const LayoutHeader = ({ onToggleSidebar }: LayoutHeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      console.log('Attempting to sign out...');
      await signOut();
      console.log('Sign out successful');
    } catch (error) {
      console.error('Error signing out:', error);
      window.location.href = '/';
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b flex-shrink-0 z-10">
        <div className="flex items-center justify-between px-1 py-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
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
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut}
                disabled={isLoggingOut}
              >
                <LogOut className="h-5 w-5" />
                {isLoggingOut && <span className="ml-1">...</span>}
              </Button>
            </div>
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut}
                disabled={isLoggingOut}
              >
                <LogOut className="h-5 w-5" />
                {isLoggingOut && <span className="ml-1">...</span>}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <UniversalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default LayoutHeader;
