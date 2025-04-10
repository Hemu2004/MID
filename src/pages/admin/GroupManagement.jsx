
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, TrashIcon, Edit, Search } from "lucide-react";
import { toast } from "sonner";

const GroupManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  
  // Mock data - in a real app, this would come from your API
  const classes = [
    { id: 1, name: "CSE-A" },
    { id: 2, name: "CSE-B" },
    { id: 3, name: "CSE-C" },
  ];
  
  const groups = [
    { 
      id: 1, 
      name: "Group A-1", 
      className: "CSE-A", 
      members: [
        { id: 1, name: "John Doe", regNo: "21BCE7001" },
        { id: 2, name: "Jane Smith", regNo: "21BCE7002" },
        { id: 3, name: "Robert Johnson", regNo: "21BCE7003" },
        { id: 4, name: "Emily Davis", regNo: "21BCE7004" },
      ]
    },
    { 
      id: 2, 
      name: "Group A-2", 
      className: "CSE-A", 
      members: [
        { id: 5, name: "Michael Brown", regNo: "21BCE7005" },
        { id: 6, name: "Sarah Wilson", regNo: "21BCE7006" },
        { id: 7, name: "David Lee", regNo: "21BCE7007" },
        { id: 8, name: "Jennifer Garcia", regNo: "21BCE7008" },
      ]
    },
    { 
      id: 3, 
      name: "Group B-1", 
      className: "CSE-B", 
      members: [
        { id: 9, name: "William Martinez", regNo: "21BCE7009" },
        { id: 10, name: "Linda Robinson", regNo: "21BCE7010" },
        { id: 11, name: "Thomas Clark", regNo: "21BCE7011" },
        { id: 12, name: "Patricia Lewis", regNo: "21BCE7012" },
      ]
    },
    { 
      id: 4, 
      name: "Group C-1", 
      className: "CSE-C", 
      members: [
        { id: 13, name: "James Walker", regNo: "21BCE7013" },
        { id: 14, name: "Elizabeth Hall", regNo: "21BCE7014" },
        { id: 15, name: "Joseph Young", regNo: "21BCE7015" },
        { id: 16, name: "Barbara Allen", regNo: "21BCE7016" },
      ]
    },
  ];
  
  // Filter groups based on search and class
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || group.className === selectedClass;
    return matchesSearch && matchesClass;
  });
  
  const [newGroup, setNewGroup] = useState({
    name: "",
    className: "",
    members: [
      { regNo: "", name: "" },
      { regNo: "", name: "" },
      { regNo: "", name: "" },
      { regNo: "", name: "" },
    ]
  });
  
  const handleCreateGroup = () => {
    // In a real app, you'd send this to your backend
    console.log("Creating group:", newGroup);
    toast.success(`Group ${newGroup.name} created successfully!`);
    setOpenDialog(false);
    // Reset form
    setNewGroup({
      name: "",
      className: "",
      members: [
        { regNo: "", name: "" },
        { regNo: "", name: "" },
        { regNo: "", name: "" },
        { regNo: "", name: "" },
      ]
    });
  };
  
  const handleDeleteGroup = (groupId) => {
    // In a real app, you'd send this to your backend
    console.log("Deleting group:", groupId);
    toast.success("Group deleted successfully!");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Group Management</h1>
        <p className="text-muted-foreground">
          Manage student groups for assessments
        </p>
      </div>
      
      <Tabs defaultValue="all-groups">
        <TabsList>
          <TabsTrigger value="all-groups">All Groups</TabsTrigger>
          <TabsTrigger value="by-class">By Class</TabsTrigger>
        </TabsList>
        <TabsContent value="all-groups" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Create Group
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Create New Group</DialogTitle>
                  <DialogDescription>
                    Add a new student group. Groups should have 4-5 members.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="groupName">Group Name</Label>
                      <Input
                        id="groupName"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="className">Class</Label>
                      <Select
                        value={newGroup.className}
                        onValueChange={(value) => setNewGroup({...newGroup, className: value})}
                      >
                        <SelectTrigger id="className">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map(cls => (
                            <SelectItem key={cls.id} value={cls.name}>
                              {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Group Members</Label>
                    {newGroup.members.map((member, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder={`Member ${index + 1} Reg. No`}
                          value={member.regNo}
                          onChange={(e) => {
                            const updatedMembers = [...newGroup.members];
                            updatedMembers[index].regNo = e.target.value;
                            setNewGroup({...newGroup, members: updatedMembers});
                          }}
                        />
                        <Input
                          placeholder={`Member ${index + 1} Name`}
                          value={member.name}
                          onChange={(e) => {
                            const updatedMembers = [...newGroup.members];
                            updatedMembers[index].name = e.target.value;
                            setNewGroup({...newGroup, members: updatedMembers});
                          }}
                        />
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      type="button"
                      onClick={() => {
                        if (newGroup.members.length < 5) {
                          setNewGroup({
                            ...newGroup, 
                            members: [...newGroup.members, { regNo: "", name: "" }]
                          });
                        } else {
                          toast.error("Maximum 5 members allowed per group");
                        }
                      }}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Member
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button onClick={handleCreateGroup}>Create Group</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map(group => (
              <Card key={group.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{group.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteGroup(group.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{group.className}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {group.members.map(member => (
                      <div key={member.id} className="flex justify-between text-sm">
                        <span>{member.name}</span>
                        <span className="text-muted-foreground">{member.regNo}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <p className="text-xs text-muted-foreground">
                    {group.members.length} members
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="by-class" className="space-y-4">
          <div className="flex space-x-2">
            <Button 
              variant={selectedClass === "all" ? "default" : "outline"} 
              onClick={() => setSelectedClass("all")}
            >
              All Classes
            </Button>
            {classes.map(cls => (
              <Button 
                key={cls.id}
                variant={selectedClass === cls.name ? "default" : "outline"} 
                onClick={() => setSelectedClass(cls.name)}
              >
                {cls.name}
              </Button>
            ))}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map(group => (
              <Card key={group.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{group.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteGroup(group.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{group.className}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {group.members.map(member => (
                      <div key={member.id} className="flex justify-between text-sm">
                        <span>{member.name}</span>
                        <span className="text-muted-foreground">{member.regNo}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <p className="text-xs text-muted-foreground">
                    {group.members.length} members
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupManagement;
