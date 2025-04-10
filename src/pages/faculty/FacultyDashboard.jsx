
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Upload, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FacultyDashboard = () => {
  const { user } = useAuth();
  
  // Mock data for dashboard
  const pendingReviews = 12;
  const totalSubmissions = 48;
  const uploadedQuestions = 5;
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#33C3F0] to-[#1eaddc] rounded-lg shadow p-6 text-white">
        <h2 className="text-2xl font-bold">Welcome, {user?.name}!</h2>
        <p className="opacity-90 mt-1">Faculty ID: {user?.facultyId}</p>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.classes?.map((cls) => (
              <span key={cls} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                {cls}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.subjects?.map((subject) => (
              <span key={subject} className="px-3 py-1 bg-white/30 rounded-full text-sm font-medium">
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white hover:shadow-md transition-shadow card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 h-5 w-5 text-[#33C3F0]" />
              Student Submissions
            </CardTitle>
            <CardDescription>Review student work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#33C3F0]">{totalSubmissions}</div>
            <p className="text-sm text-muted-foreground">Total submissions</p>
            <div className="mt-2 flex items-center text-sm font-medium text-amber-500">
              <AlertCircle className="mr-1 h-4 w-4" />
              {pendingReviews} pending reviews
            </div>
            <Link 
              to="/faculty/submissions" 
              className="mt-4 block text-[#33C3F0] text-sm hover:underline"
            >
              View all submissions →
            </Link>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-[#33C3F0]" />
              Questions
            </CardTitle>
            <CardDescription>Manage assessment questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#33C3F0]">{uploadedQuestions}</div>
            <p className="text-sm text-muted-foreground">Questions uploaded</p>
            <Link 
              to="/faculty/questions" 
              className="mt-4 block text-[#33C3F0] text-sm hover:underline"
            >
              Manage questions →
            </Link>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Upload className="mr-2 h-5 w-5 text-[#33C3F0]" />
              Upload Questions
            </CardTitle>
            <CardDescription>Add new assessment questions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload T1, T2, and T3 questions for your classes
            </p>
            <Link 
              to="/faculty/upload" 
              className="block text-[#33C3F0] text-sm hover:underline"
            >
              Upload new questions →
            </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-2 border-[#33C3F0] pl-4 py-2">
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="font-medium">Uploaded T1 questions for Web Technologies</p>
            </div>
            <div className="border-l-2 border-[#33C3F0] pl-4 py-2">
              <p className="text-sm text-muted-foreground">Yesterday</p>
              <p className="font-medium">Reviewed 5 student submissions</p>
            </div>
            <div className="border-l-2 border-[#33C3F0] pl-4 py-2">
              <p className="text-sm text-muted-foreground">3 days ago</p>
              <p className="font-medium">Added extension questions for T2</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
