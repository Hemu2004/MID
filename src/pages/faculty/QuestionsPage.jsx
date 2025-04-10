
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Trash2, Filter, Search, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const QuestionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedType, setSelectedType] = useState('All');
  
  // Mock data
  const questions = [
    {
      id: '1',
      title: 'T1: Implement a responsive web application',
      type: 'T1',
      subject: 'Web Technologies',
      class: 'CSE-A',
      uploadedDate: '2025-04-01',
      fileSize: '1.2 MB',
      fileName: 'T1_WebTech_CSE-A.pdf'
    },
    {
      id: '2',
      title: 'T2: Add authentication to web application',
      type: 'T2',
      subject: 'Web Technologies',
      class: 'CSE-A',
      uploadedDate: '2025-04-05',
      fileSize: '800 KB',
      fileName: 'T2_WebTech_CSE-A.pdf'
    },
    {
      id: '3',
      title: 'T3: Create presentation of your project',
      type: 'T3',
      subject: 'Web Technologies',
      class: 'CSE-A',
      uploadedDate: '2025-04-10',
      fileSize: '1.5 MB',
      fileName: 'T3_WebTech_CSE-A.pdf'
    },
    {
      id: '4',
      title: 'T1: Database normalization exercise',
      type: 'T1',
      subject: 'Database Systems',
      class: 'CSE-B',
      uploadedDate: '2025-04-03',
      fileSize: '950 KB',
      fileName: 'T1_DB_CSE-B.pdf'
    },
    {
      id: '5',
      title: 'T2: Implement MongoDB integration',
      type: 'T2',
      subject: 'Database Systems',
      class: 'CSE-B',
      uploadedDate: '2025-04-08',
      fileSize: '1.1 MB',
      fileName: 'T2_DB_CSE-B.pdf'
    }
  ];
  
  // Filter questions based on search and filters
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          question.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = selectedClass === 'All Classes' || question.class === selectedClass;
    
    const matchesType = selectedType === 'All' || question.type === selectedType;
    
    return matchesSearch && matchesClass && matchesType;
  });
  
  // Get unique classes for filter
  const classes = ['All Classes', ...new Set(questions.map(q => q.class))];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Assessment Questions</h2>
        <Button className="bg-[#33C3F0] hover:bg-[#1eaddc]">
          Upload New Question
        </Button>
      </div>
      
      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
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
      
      {/* Tabs for question types */}
      <Tabs defaultValue="All" onValueChange={setSelectedType}>
        <TabsList className="bg-[#eef7fb]">
          <TabsTrigger value="All">All Types</TabsTrigger>
          <TabsTrigger value="T1">T1</TabsTrigger>
          <TabsTrigger value="T2">T2</TabsTrigger>
          <TabsTrigger value="T3">T3</TabsTrigger>
        </TabsList>
        
        <TabsContent value="All" className="mt-4">
          <QuestionsTable questions={filteredQuestions} />
        </TabsContent>
        
        <TabsContent value="T1" className="mt-4">
          <QuestionsTable questions={filteredQuestions} />
        </TabsContent>
        
        <TabsContent value="T2" className="mt-4">
          <QuestionsTable questions={filteredQuestions} />
        </TabsContent>
        
        <TabsContent value="T3" className="mt-4">
          <QuestionsTable questions={filteredQuestions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const QuestionsTable = ({ questions }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-[#eef7fb] text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Title</th>
                <th className="py-3 px-4 text-left font-medium">Type</th>
                <th className="py-3 px-4 text-left font-medium">Subject</th>
                <th className="py-3 px-4 text-left font-medium">Class</th>
                <th className="py-3 px-4 text-left font-medium">Uploaded</th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.length > 0 ? (
                questions.map((question) => (
                  <tr key={question.id} className="border-t hover:bg-[#f9fbfc] transition-colors">
                    <td className="py-3 px-4 flex items-center">
                      <FileText size={16} className="text-[#33C3F0] mr-2" />
                      {question.title}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        question.type === 'T1' ? 'bg-blue-100 text-blue-700' :
                        question.type === 'T2' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {question.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">{question.subject}</td>
                    <td className="py-3 px-4">{question.class}</td>
                    <td className="py-3 px-4">{question.uploadedDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 px-2">
                          <Download size={16} className="mr-1" />
                          Download
                        </Button>
                        <Button size="icon" variant="destructive" className="h-8 w-8">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-muted-foreground">
                    No questions found matching your criteria.
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

export default QuestionsPage;
