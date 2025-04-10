
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, Download, Search, Filter, ChevronDown, Check, X, Eye
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SubmissionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  // Mock data
  const submissions = [
    {
      id: '1',
      title: 'T2 Web App - Group A-3',
      type: 'T2',
      subject: 'Web Technologies',
      class: 'CSE-A',
      group: 'Group A-3',
      submittedDate: '2025-04-15',
      status: 'pending',
      students: [
        { id: '1', name: 'John Doe', regNumber: '21BCE7777' },
        { id: '2', name: 'Jane Smith', regNumber: '21BCE7778' }
      ],
      files: [
        { name: 'project_report.pdf', size: '1.2 MB', type: 'pdf' },
        { name: 'source_code.zip', size: '3.5 MB', type: 'zip' }
      ]
    },
    {
      id: '2',
      title: 'T3 Presentation - Group A-3',
      type: 'T3',
      subject: 'Web Technologies',
      class: 'CSE-A',
      group: 'Group A-3',
      submittedDate: '2025-04-18',
      status: 'pending',
      students: [
        { id: '1', name: 'John Doe', regNumber: '21BCE7777' },
        { id: '2', name: 'Jane Smith', regNumber: '21BCE7778' }
      ],
      files: [
        { name: 'final_presentation.pptx', size: '2.7 MB', type: 'pptx' },
        { name: 'demo_video.mp4', size: '15.8 MB', type: 'mp4' }
      ]
    },
    {
      id: '3',
      title: 'T2 Database Project - Group B-2',
      type: 'T2',
      subject: 'Database Systems',
      class: 'CSE-B',
      group: 'Group B-2',
      submittedDate: '2025-04-16',
      status: 'reviewed',
      grade: 85,
      feedback: 'Good work on the database design. The normalization could be improved.',
      students: [
        { id: '3', name: 'Alex Johnson', regNumber: '21BCE7779' },
        { id: '4', name: 'Sarah Williams', regNumber: '21BCE7780' }
      ],
      files: [
        { name: 'db_project_report.pdf', size: '1.8 MB', type: 'pdf' },
        { name: 'database_scripts.sql', size: '400 KB', type: 'sql' }
      ]
    }
  ];
  
  // Filter submissions based on search and filters
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          submission.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          submission.group.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = selectedClass === 'All Classes' || submission.class === selectedClass;
    
    const matchesType = selectedType === 'All' || submission.type === selectedType;
    
    return matchesSearch && matchesClass && matchesType;
  });
  
  // Get unique classes for filter
  const classes = ['All Classes', ...new Set(submissions.map(s => s.class))];
  
  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission);
    setDetailsOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Student Submissions</h2>
      </div>
      
      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Class: {selectedClass}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Class</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {classes.map((cls) => (
                <DropdownMenuItem 
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Tabs for submission types */}
      <Tabs defaultValue="All" onValueChange={setSelectedType}>
        <TabsList className="bg-[#eef7fb]">
          <TabsTrigger value="All">All Types</TabsTrigger>
          <TabsTrigger value="T2">T2 Submissions</TabsTrigger>
          <TabsTrigger value="T3">T3 Submissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="All" className="mt-4">
          <SubmissionsTable 
            submissions={filteredSubmissions} 
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
        
        <TabsContent value="T2" className="mt-4">
          <SubmissionsTable 
            submissions={filteredSubmissions} 
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
        
        <TabsContent value="T3" className="mt-4">
          <SubmissionsTable 
            submissions={filteredSubmissions} 
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
      </Tabs>
      
      {/* Submission Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedSubmission.title}</DialogTitle>
                <DialogDescription>
                  Submitted on {selectedSubmission.submittedDate}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Subject</p>
                    <p className="font-medium">{selectedSubmission.subject}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Class</p>
                    <p className="font-medium">{selectedSubmission.class}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Group</p>
                    <p className="font-medium">{selectedSubmission.group}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className={`flex items-center ${
                      selectedSubmission.status === 'pending' ? 'text-amber-500' : 'text-green-500'
                    }`}>
                      {selectedSubmission.status === 'pending' ? (
                        <>
                          <span className="h-2 w-2 rounded-full bg-amber-500 mr-1.5"></span>
                          Pending Review
                        </>
                      ) : (
                        <>
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                          Reviewed
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Group Members</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedSubmission.students.map((student) => (
                      <div key={student.id} className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#eef7fb] flex items-center justify-center text-[#33C3F0] font-medium text-sm mr-2">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.regNumber}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Submitted Files</h4>
                  <div className="space-y-2">
                    {selectedSubmission.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-[#eef7fb] p-3 rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-[#33C3F0] mr-2" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download size={14} className="mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedSubmission.status === 'reviewed' && (
                  <>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Grade</h4>
                      <div className="bg-[#eef7fb] p-3 rounded-md">
                        <p className="text-lg font-bold text-[#33C3F0]">{selectedSubmission.grade}/100</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Feedback</h4>
                      <div className="bg-[#eef7fb] p-3 rounded-md">
                        <p>{selectedSubmission.feedback}</p>
                      </div>
                    </div>
                  </>
                )}
                
                {selectedSubmission.status === 'pending' && (
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Skip for Now</Button>
                    <Button className="bg-[#33C3F0] hover:bg-[#1eaddc]">
                      Add Review
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SubmissionsTable = ({ submissions, onViewDetails }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-[#eef7fb] text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Submission</th>
                <th className="py-3 px-4 text-left font-medium">Type</th>
                <th className="py-3 px-4 text-left font-medium">Group</th>
                <th className="py-3 px-4 text-left font-medium">Class</th>
                <th className="py-3 px-4 text-left font-medium">Date</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length > 0 ? (
                submissions.map((submission) => (
                  <tr key={submission.id} className="border-t hover:bg-[#f9fbfc] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FileText size={16} className="text-[#33C3F0] mr-2" />
                        {submission.title}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        submission.type === 'T2' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {submission.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">{submission.group}</td>
                    <td className="py-3 px-4">{submission.class}</td>
                    <td className="py-3 px-4">{submission.submittedDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {submission.status === 'pending' ? (
                          <>
                            <span className="h-2 w-2 rounded-full bg-amber-500 mr-1.5"></span>
                            <span>Pending</span>
                          </>
                        ) : (
                          <>
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                            <span>Reviewed</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8"
                                onClick={() => onViewDetails(submission)}
                              >
                                <Eye size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        {submission.status === 'pending' && (
                          <>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    size="icon" 
                                    className="h-8 w-8 bg-green-500 hover:bg-green-600"
                                  >
                                    <Check size={16} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Mark as Reviewed</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    size="icon" 
                                    variant="destructive"
                                    className="h-8 w-8"
                                  >
                                    <X size={16} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Reject Submission</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-muted-foreground">
                    No submissions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionsPage;
