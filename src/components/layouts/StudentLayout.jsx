
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, BookOpen, FileText, LogOut, 
  Upload, User, Home, Menu, X 
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const StudentLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated and has student role
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");
    
    if (!isAuthenticated || userRole !== "student") {
      navigate("/");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const studentName = "John Doe"; // In real app, get from state/context
  const regNumber = "21BCE7777"; // In real app, get from state/context

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Menu Trigger */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="menu-trigger" 
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <div className="p-4">
          <h1 className={`text-xl font-bold flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <BookOpen className="mr-2" /> 
            {sidebarOpen && "Vignan Exams"}
          </h1>
        </div>
        
        {sidebarOpen && (
          <div className="p-4 border-b border-[#1eaddc]">
            <div className="flex items-center mb-2">
              <User className="mr-2" />
              <span>{studentName}</span>
            </div>
            <div className="text-sm opacity-75">
              Reg: {regNumber}
            </div>
          </div>
        )}
        
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            <li>
              <Link to="/student/dashboard" className={`flex items-center p-2 rounded-lg hover:bg-[#1eaddc] transition-colors ${!sidebarOpen && 'justify-center'}`}>
                <Home className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link to="/student/assignments" className={`flex items-center p-2 rounded-lg hover:bg-[#1eaddc] transition-colors ${!sidebarOpen && 'justify-center'}`}>
                <FileText className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Assignments</span>}
              </Link>
            </li>
            <li>
              <Link to="/student/group" className={`flex items-center p-2 rounded-lg hover:bg-[#1eaddc] transition-colors ${!sidebarOpen && 'justify-center'}`}>
                <Users className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">My Group</span>}
              </Link>
            </li>
            <li>
              <Link to="/student/submissions" className={`flex items-center p-2 rounded-lg hover:bg-[#1eaddc] transition-colors ${!sidebarOpen && 'justify-center'}`}>
                <Upload className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Submissions</span>}
              </Link>
            </li>
            <li>
              <Link to="/student/profile" className={`flex items-center p-2 rounded-lg hover:bg-[#1eaddc] transition-colors ${!sidebarOpen && 'justify-center'}`}>
                <User className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Profile</span>}
              </Link>
            </li>
          </ul>
        </nav>
        <div className={`mt-auto p-4 border-t border-[#1eaddc] ${!sidebarOpen && 'flex justify-center'}`}>
          <Button 
            variant="ghost" 
            className={`text-white hover:bg-[#1eaddc] hover:text-white ${sidebarOpen ? 'w-full justify-start' : 'w-10 h-10 p-0'}`}
            onClick={handleLogout}
          >
            <LogOut className={`h-5 w-5 ${sidebarOpen && 'mr-2'}`} /> 
            {sidebarOpen && "Sign Out"}
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className={`flex-1 p-6 bg-white ${sidebarOpen ? 'content-with-sidebar-expanded' : 'content-with-sidebar'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
