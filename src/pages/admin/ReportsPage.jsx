
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

const ReportsPage = () => {
  const [filter, setFilter] = useState('all');
  
  // Mock data for the charts
  const submissionData = [
    { name: 'Web Technologies', t1: 45, t2: 38, t3: 28 },
    { name: 'Data Science', t1: 52, t2: 48, t3: 35 },
    { name: 'Computer Networks', t1: 38, t2: 32, t3: 30 },
    { name: 'Database Systems', t1: 42, t2: 40, t3: 38 },
    { name: 'Software Engineering', t1: 35, t2: 30, t3: 25 },
  ];
  
  const studentPerformanceData = [
    { name: 'CSE-A', average: 82 },
    { name: 'CSE-B', average: 78 },
    { name: 'CSE-C', average: 85 },
    { name: 'CSE-D', average: 75 },
    { name: 'CSE-E', average: 80 },
  ];
  
  const submissionStatusData = [
    { name: 'Submitted On Time', value: 75 },
    { name: 'Submitted Late', value: 15 },
    { name: 'Not Submitted', value: 10 },
  ];
  
  const COLORS = ['#33C3F0', '#1eaddc', '#0e86d4'];
  
  const timelineData = [
    { month: 'Jun', submissions: 20 },
    { month: 'Jul', submissions: 35 },
    { month: 'Aug', submissions: 50 },
    { month: 'Sep', submissions: 65 },
    { month: 'Oct', submissions: 75 },
    { month: 'Nov', submissions: 85 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#33C3F0]">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Track student performance and submission statistics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filter Reports
          </Button>
          <Button className="btn-sky">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission Status */}
        <Card className="card-hover shadow-md">
          <CardHeader>
            <CardTitle className="text-[#33C3F0]">Submission Status</CardTitle>
            <CardDescription>Overall submission performance</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={submissionStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {submissionStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Class Performance */}
        <Card className="card-hover shadow-md">
          <CardHeader>
            <CardTitle className="text-[#33C3F0]">Class Performance</CardTitle>
            <CardDescription>Average score by class</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={studentPerformanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" fill="#33C3F0" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* T1, T2, T3 Comparison */}
        <Card className="card-hover shadow-md">
          <CardHeader>
            <CardTitle className="text-[#33C3F0]">Assessment Comparison</CardTitle>
            <CardDescription>T1, T2, T3 submission rates by subject</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={submissionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="t1" fill="#33C3F0" name="T1" />
                <Bar dataKey="t2" fill="#1eaddc" name="T2" />
                <Bar dataKey="t3" fill="#0e86d4" name="T3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Submission Timeline */}
        <Card className="card-hover shadow-md">
          <CardHeader>
            <CardTitle className="text-[#33C3F0]">Submission Timeline</CardTitle>
            <CardDescription>Monthly submission trend</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timelineData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="submissions" stroke="#33C3F0" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-hover shadow-md">
        <CardHeader>
          <CardTitle className="text-[#33C3F0]">Report Summary</CardTitle>
          <CardDescription>Key insights from the data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-sky-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-1">Submission Rate</h3>
            <p className="text-sm">75% of students submitted their assessments on time, showing good overall engagement with the platform.</p>
          </div>
          
          <div className="bg-sky-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-1">Class Performance</h3>
            <p className="text-sm">CSE-C has the highest average performance at 85%, while CSE-D has the lowest at 75%.</p>
          </div>
          
          <div className="bg-sky-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-1">Assessment Completion</h3>
            <p className="text-sm">T1 assessments have the highest completion rate, while T3 assessments have the lowest, indicating a need for better support towards the end of the semester.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
