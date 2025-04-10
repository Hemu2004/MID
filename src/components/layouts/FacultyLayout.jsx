
import { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  BookOpen, 
  Users, 
  Upload, 
  LogOut, 
  Menu, 
  X, 
  Home
} from 'lucide-react';

const FacultyLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Protect the route
  if (!user || user.role !== 'faculty') {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f9fbfc] text-gray-800 flex">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-[#55d1ff]">
            <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              {sidebarOpen && (
                <div className="text-xl font-bold whitespace-nowrap overflow-hidden">Faculty Portal</div>
              )}
              <Button 
                variant="ghost" 
                size="icon"
                className={`rounded-full hover:bg-[#55d1ff] ${sidebarOpen ? 'ml-auto' : 'mx-auto'}`} 
                onClick={toggleSidebar}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1 py-4">
            <nav className="space-y-1 px-2">
              <Link to="/faculty/dashboard" className="flex items-center p-2 rounded-md hover:bg-[#55d1ff] hover:text-white">
                <Home size={20} />
                {sidebarOpen && <span className="ml-3">Dashboard</span>}
              </Link>
              
              <Link to="/faculty/questions" className="flex items-center p-2 rounded-md hover:bg-[#55d1ff] hover:text-white">
                <BookOpen size={20} />
                {sidebarOpen && <span className="ml-3">Questions</span>}
              </Link>
              
              <Link to="/faculty/submissions" className="flex items-center p-2 rounded-md hover:bg-[#55d1ff] hover:text-white">
                <Users size={20} />
                {sidebarOpen && <span className="ml-3">Student Submissions</span>}
              </Link>
              
              <Link to="/faculty/upload" className="flex items-center p-2 rounded-md hover:bg-[#55d1ff] hover:text-white">
                <Upload size={20} />
                {sidebarOpen && <span className="ml-3">Upload Questions</span>}
              </Link>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-[#55d1ff]">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-center hover:bg-[#55d1ff] hover:text-white"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              {sidebarOpen && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'content-with-sidebar-expanded' : 'content-with-sidebar'}`}>
        {/* Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSidebar}
                className="mr-2 md:hidden"
              >
                <Menu size={20} />
              </Button>
              <h1 className="text-xl font-semibold text-[#33C3F0]">
                Faculty Portal - {user?.name || 'Welcome'}
              </h1>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
