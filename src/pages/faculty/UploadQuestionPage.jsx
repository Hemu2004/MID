
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, FileText, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const UploadQuestionPage = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [subject, setSubject] = useState('');
  const [targetClass, setTargetClass] = useState('');
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock data
  const classes = user?.classes || ['CSE-A', 'CSE-B'];
  const subjects = user?.subjects || ['Web Technologies', 'Database Systems'];
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  
  const clearFile = () => {
    setFile(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!title || !type || !subject || !targetClass || !deadline || !file) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Question uploaded successfully!");
      setIsSubmitting(false);
      
      // Reset form
      setTitle('');
      setDescription('');
      setType('');
      setSubject('');
      setTargetClass('');
      setDeadline('');
      setFile(null);
    }, 1500);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Assessment Question</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
          <CardDescription>Fill in the information about the question you want to upload</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Question Type</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="T1">T1</SelectItem>
                  <SelectItem value="T2">T2</SelectItem>
                  <SelectItem value="T3">T3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                placeholder="Enter a title for the question" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                placeholder="Enter a description of the task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            
            {/* Subject & Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject} required>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((sub) => (
                      <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="class">Target Class</Label>
                <Select value={targetClass} onValueChange={setTargetClass} required>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline">Submission Deadline</Label>
              <Input 
                id="deadline" 
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            
            {/* File Upload */}
            <div className="space-y-2">
              <Label>Question File (PDF)</Label>
              
              {!file ? (
                <div className="border-2 border-dashed rounded-md p-6 hover:bg-gray-50 cursor-pointer text-center">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-10 w-10 text-[#33C3F0]" />
                    <p className="mt-2 text-sm font-medium text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX, PPT, PPTX (max 10MB)
                    </p>
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-[#eef7fb] p-3 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-[#33C3F0] mr-2" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={clearFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-[#33C3F0] hover:bg-[#1eaddc]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload Question"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadQuestionPage;
