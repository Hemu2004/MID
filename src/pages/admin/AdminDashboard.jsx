
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Upload, CheckCircle, AlertCircle, BookOpen, User, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  // Mock data - in a real app, this would come from your API
  const [stats, setStats] = useState({
    totalClasses: 6,
    totalGroups: 24,
    totalStudents: 112,
    pendingAssessments: 8,
    submittedAssessments: 14,
    pendingReviews: 10,
  });
  
  const [recentSubmissions, setRecentSubmissions] = useState([
    { id: 1, group: "Group A-3", subject: "Web Technologies", type: "T3", date: "2025-05-15", status: "pending" },
    { id: 2, group: "Group B-2", subject: "Data Science", type: "T3", date: "2025-05-14", status: "reviewed" },
    { id: 3, group: "Group C-4", subject: "Computer Networks", type: "T2", date: "2025-05-13", status: "pending" },
    { id: 4, group: "Group A-1", subject: "Web Technologies", type: "T3", date: "2025-05-12", status: "reviewed" },
  ]);

  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    { id: 1, subject: "Web Technologies", assessmentType: "T3", deadline: "2025-05-20", class: "CSE-A" },
    { id: 2, subject: "Data Science", assessmentType: "T2", deadline: "2025-05-22", class: "CSE-B" },
    { id: 3, subject: "Computer Networks", assessmentType: "T3", deadline: "2025-05-25", class: "CSE-C" },
  ]);
  
  const [documentFiles, setDocumentFiles] = useState([
    { id: 1, name: "Sample T1 Questions.pdf", type: "pdf", path: "/backend/uploads/sample/SampleT1Questions.pdf" },
    { id: 2, name: "T2 Extension Questions.pdf", type: "pdf", path: "/backend/uploads/sample/T2Extension.pdf" },
    { id: 3, name: "Sample Presentation.pptx", type: "pptx", path: "/backend/uploads/sample/SamplePresentation.pptx" },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#33C3F0]">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to Vignan's Mid Exam Evaluation System
          </p>
        </div>
        <div className="flex space-x-2">
          <Button className="btn-sky">
            <Upload className="mr-2 h-4 w-4" /> Upload Documents
          </Button>
          <Button variant="outline">
            <AlertCircle className="mr-2 h-4 w-4" /> View Notifications
          </Button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <BookOpen className="h-5 w-5 text-[#33C3F0]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#33C3F0]">{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active classes this semester
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Groups</CardTitle>
            <Users className="h-5 w-5 text-[#33C3F0]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#33C3F0]">{stats.totalGroups}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all classes
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <User className="h-5 w-5 text-[#33C3F0]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#33C3F0]">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total enrolled students
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Assessments</CardTitle>
            <FileText className="h-5 w-5 text-[#33C3F0]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#33C3F0]">{stats.pendingAssessments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting submission
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <Upload className="h-5 w-5 text-[#33C3F0]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#33C3F0]">{stats.submittedAssessments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Submissions received
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <CheckCircle className="h-5 w-5 text-[#33C3F0]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#33C3F0]">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting your review
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Documents & Recent Submissions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Documents */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-[#33C3F0]">Uploaded Documents</CardTitle>
            <CardDescription>
              Assessment materials and submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${file.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-[#33C3F0]/20 text-[#33C3F0]'}`}>
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground uppercase">{file.type}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0" title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0" title="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Submissions */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-[#33C3F0]">Recent Submissions</CardTitle>
            <CardDescription>
              Latest student group submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map(submission => (
                <div key={submission.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div>
                    <p className="font-medium">{submission.group}</p>
                    <p className="text-sm text-muted-foreground">
                      {submission.subject} ({submission.type})
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm mr-2">{submission.date}</p>
                    {submission.status === "pending" ? (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Deadlines */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-[#33C3F0]">Upcoming Deadlines</CardTitle>
          <CardDescription>
            Assessment deadlines for the next 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {upcomingDeadlines.map(deadline => (
              <div key={deadline.id} className="flex flex-col p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center mb-3">
                  <div className="bg-[#33C3F0] text-white text-xs px-2 py-1 rounded-full">
                    {deadline.assessmentType}
                  </div>
                  <div className="ml-2 text-sm text-muted-foreground">
                    {deadline.class}
                  </div>
                </div>
                <p className="font-medium">{deadline.subject}</p>
                <div className="mt-auto pt-2 text-sm">
                  <p className="bg-sky-50 text-[#33C3F0] px-2 py-1 rounded text-center">
                    {deadline.deadline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
