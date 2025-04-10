
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, Upload, CheckCircle, AlertCircle, Clock, Users, Download, Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  // Mock student data - in a real app, this would come from your API or context
  const [student] = useState({
    name: "John Doe",
    regNumber: "21BCE7777",
    class: "CSE-A",
    group: "Group A-3",
    groupMembers: [
      "John Doe (21BCE7777)",
      "Jane Smith (21BCE7778)",
      "Robert Johnson (21BCE7779)",
      "Emily Davis (21BCE7780)"
    ]
  });
  
  // Mock assessments data
  const [assessments] = useState([
    {
      id: 1,
      type: "T1",
      title: "Implement a responsive web application using React",
      subject: "Web Technologies",
      deadline: "2025-05-15",
      status: "completed",
      submissionDate: "2025-05-10",
      questions: [
        "Implement a login page with form validation",
        "Create a dashboard with at least 3 widgets showing different data visualizations",
        "Implement responsive design that works on mobile and desktop"
      ]
    },
    {
      id: 2,
      type: "T2",
      title: "Add user authentication and database integration to your web app",
      subject: "Web Technologies",
      deadline: "2025-05-25",
      status: "in-progress",
      submissionDate: null,
      questions: [
        "Implement JWT-based authentication",
        "Add database connection for persistent data storage",
        "Create a user profile page with editable fields"
      ]
    },
    {
      id: 3,
      type: "T3",
      title: "Create a presentation and IEEE paper on your web application",
      subject: "Web Technologies",
      deadline: "2025-06-05",
      status: "upcoming",
      submissionDate: null,
      questions: [
        "Create a 10-slide presentation about your application",
        "Write a 5-page IEEE format paper documenting your development process",
        "Prepare a 5-minute demo video showcasing the application features"
      ]
    }
  ]);

  // State for selected assessment to view questions
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#33C3F0]">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {student.name}
          </p>
        </div>
        <Button className="btn-sky" onClick={() => navigate("/student/submissions/new")}>
          <Upload className="mr-2 h-4 w-4" /> New Submission
        </Button>
      </div>

      {/* Student Info */}
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-4 card-hover shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#33C3F0]">My Information</CardTitle>
            <CardDescription>Your academic details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Registration Number</p>
                <p className="font-semibold text-lg">{student.regNumber}</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Class</p>
                <p className="font-semibold text-lg">{student.class}</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Group</p>
                <p className="font-semibold text-lg">{student.group}</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="font-semibold text-lg text-green-500">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 card-hover shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#33C3F0]">My Group</CardTitle>
            <CardDescription>Group members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {student.groupMembers.map((member, index) => (
                <div key={index} className="flex items-center bg-white p-2 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#33C3F0] text-white flex items-center justify-center mr-3">
                    {member.charAt(0)}
                  </div>
                  <p>{member}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Assessments */}
      <div>
        <h2 className="text-xl font-bold mt-6 mb-4 text-[#33C3F0]">My Assessments</h2>
        <div className="space-y-5">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="card-hover shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <span className="bg-[#33C3F0] text-white text-xs px-2 py-1 rounded mr-2">
                        {assessment.type}
                      </span>
                      {assessment.subject}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {assessment.title}
                    </CardDescription>
                  </div>
                  <div>
                    {assessment.status === "completed" && (
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        <CheckCircle className="h-3 w-3 mr-1" /> Completed
                      </span>
                    )}
                    {assessment.status === "in-progress" && (
                      <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        <Clock className="h-3 w-3 mr-1" /> In Progress
                      </span>
                    )}
                    {assessment.status === "upcoming" && (
                      <span className="inline-flex items-center bg-[#33C3F0]/20 text-[#33C3F0] text-xs px-2 py-1 rounded">
                        <AlertCircle className="h-3 w-3 mr-1" /> Upcoming
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-sky-50 p-3 rounded-lg flex-1">
                      <p className="text-sm font-medium text-[#33C3F0]">Deadline</p>
                      <p className="text-sm">{assessment.deadline}</p>
                    </div>
                    
                    {assessment.status === "completed" && (
                      <div className="bg-sky-50 p-3 rounded-lg flex-1">
                        <p className="text-sm font-medium text-[#33C3F0]">Submitted on</p>
                        <p className="text-sm">{assessment.submissionDate}</p>
                      </div>
                    )}
                    
                    <div className="bg-sky-50 p-3 rounded-lg flex-1">
                      <p className="text-sm font-medium text-[#33C3F0]">Questions</p>
                      <Button 
                        variant="link" 
                        className="text-[#33C3F0] p-0 h-auto" 
                        onClick={() => setSelectedAssessment(selectedAssessment === assessment.id ? null : assessment.id)}
                      >
                        {selectedAssessment === assessment.id ? 'Hide Questions' : 'View Questions'}
                      </Button>
                    </div>
                  </div>
                  
                  {selectedAssessment === assessment.id && (
                    <div className="bg-white p-4 rounded-lg shadow-inner">
                      <h4 className="font-medium text-[#33C3F0] mb-2">Assessment Questions:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {assessment.questions.map((question, index) => (
                          <li key={index} className="text-sm">{question}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap justify-end gap-2 mt-2">
                    {assessment.status === "completed" ? (
                      <>
                        <Button variant="outline" size="sm" className="h-8">
                          <Eye className="h-3 w-3 mr-1" /> View Submission
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                          <Download className="h-3 w-3 mr-1" /> Download
                        </Button>
                      </>
                    ) : assessment.status === "in-progress" ? (
                      <div className="flex space-x-2">
                        <Button size="sm" className="h-8 btn-sky" onClick={() => navigate("/student/assignments/" + assessment.id)}>
                          <FileText className="h-3 w-3 mr-1" /> View Details
                        </Button>
                        <Button variant="outline" size="sm" className="h-8" onClick={() => navigate("/student/submissions/new")}>
                          <Upload className="h-3 w-3 mr-1" /> Submit Work
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="h-8" onClick={() => navigate("/student/assignments/" + assessment.id)}>
                        <FileText className="h-3 w-3 mr-1" /> View Details
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
