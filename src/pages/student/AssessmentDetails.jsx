
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, Upload, Download, Clock, ArrowLeft
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AssessmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, fetch this data from your API
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API request
    setTimeout(() => {
      // Mock data for T2 assessment
      setAssessment({
        id: 2,
        type: "T2",
        title: "Add user authentication and database integration to your web app",
        description: "Extend your T1 web application by adding user authentication and database integration. Implement login, registration, and user profile functionality. Use MongoDB or Firebase for the database to store user information and application data.",
        subject: "Web Technologies",
        deadline: "2023-10-25",
        status: "in-progress",
        submissionDate: null,
        t1Question: "Implement a responsive web application using React",
        t1Solution: "https://example.com/t1-solution.pdf",
        t2Question: "Based on your T1 solution, you need to add user authentication and database integration.",
        resources: [
          {
            name: "Authentication Best Practices",
            link: "https://example.com/auth-guide.pdf"
          },
          {
            name: "Database Integration Guide",
            link: "https://example.com/db-guide.pdf"
          }
        ],
        submissions: []
      });
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you'd upload this file to your backend
      toast.success(`File "${file.name}" selected. Click submit to upload.`);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd submit this to your backend
    toast.success("Submission successful!");
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading assessment details...</p>
      </div>
    );
  }
  
  if (!assessment) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg mb-4">Assessment not found</p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-[#33C3F0] text-white text-sm px-2 py-1 rounded mr-2">
              {assessment.type}
            </span>
            {assessment.subject}
          </h1>
          <p className="text-muted-foreground">{assessment.title}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Assessment Details</CardTitle>
              <CardDescription>Due on {assessment.deadline}</CardDescription>
            </div>
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded h-fit">
              <Clock className="h-3 w-3 mr-1" /> In Progress
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="submission">Submission</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p>{assessment.description}</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Previous Assessment (T1)</h3>
                  <p className="mb-2">Question: {assessment.t1Question}</p>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" /> Download T1 Solution
                  </Button>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Current Assignment (T2)</h3>
                  <p>{assessment.t2Question}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="submission">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Upload Your Work</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please upload your completed work for this assessment. 
                    Accepted formats: PDF, DOCX, ZIP (max 10MB).
                  </p>
                  
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm font-semibold">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      PDF, DOCX or ZIP (max 10MB)
                    </p>
                    <input 
                      type="file" 
                      className="hidden" 
                      id="file-upload" 
                      accept=".pdf,.docx,.zip"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" component="span">
                        Choose File
                      </Button>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="btn-sky">
                    <Upload className="h-4 w-4 mr-2" /> Submit Assignment
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="resources">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Reference Materials</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These resources will help you complete the assessment.
                </p>
                <div className="space-y-2">
                  {assessment.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <span className="font-medium">{resource.name}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentDetails;
