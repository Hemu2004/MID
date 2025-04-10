
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/auth/LoginForm";
import { BookOpen, Users, FileText, Calendar, Upload } from "lucide-react";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="bg-[#1a98e6] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold">Vignan Mid Exam Central</h1>
          </div>
          <Button 
            onClick={() => setShowLogin(!showLogin)} 
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-[#1a98e6]"
          >
            {showLogin ? "Back to Home" : "Login"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showLogin ? (
          <div className="max-w-md mx-auto mt-8">
            <LoginForm />
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="py-16 md:py-24 text-center">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a98e6]">
                  Manage Your Mid-Term Assessments
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  A centralized platform for students and faculty to streamline 
                  the mid-term assessment process from T1 to T3.
                </p>
                <Button 
                  onClick={() => setShowLogin(true)} 
                  size="lg"
                  className="btn-sky shadow-lg hover:shadow-xl transition-all text-lg py-6 px-8 rounded-full"
                >
                  Get Started
                </Button>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-24">
              <h2 className="text-3xl font-bold text-center mb-16 text-[#1a98e6]">Key Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="bg-[#1a98e6]/10 text-[#1a98e6] rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#1a98e6]">Group Management</h3>
                  <p className="text-gray-600">
                    Manage student groups with 4-5 members per group for collaborative work.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="bg-[#1a98e6]/10 text-[#1a98e6] rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#1a98e6]">Assessment Tracking</h3>
                  <p className="text-gray-600">
                    Monitor T1, T2, and T3 assessments throughout the semester.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="bg-[#1a98e6]/10 text-[#1a98e6] rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#1a98e6]">Deadline Management</h3>
                  <p className="text-gray-600">
                    Keep track of important dates and deadlines for all assessments.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="bg-[#1a98e6]/10 text-[#1a98e6] rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Upload className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#1a98e6]">Easy Submissions</h3>
                  <p className="text-gray-600">
                    Submit and download assignments, presentations, and IEEE papers.
                  </p>
                </div>
              </div>
            </section>

            {/* Workflow Section */}
            <section className="py-16 md:py-24 bg-white rounded-xl shadow-lg p-10 mb-16">
              <h2 className="text-3xl font-bold text-center mb-12 text-[#1a98e6]">Assessment Workflow</h2>
              
              <div className="grid md:grid-cols-3 gap-10">
                <div className="text-center p-6 relative">
                  <div className="absolute top-0 right-0 left-0 h-1 bg-[#1a98e6] opacity-30"></div>
                  <div className="bg-[#1a98e6] text-white text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6">
                    T1
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#1a98e6]">Written Exam</h3>
                  <p className="text-gray-600">
                    Faculty assigns unique written questions to each group, 
                    visible on the student dashboard.
                  </p>
                </div>

                <div className="text-center p-6 relative">
                  <div className="absolute top-0 right-0 left-0 h-1 bg-[#1a98e6] opacity-30"></div>
                  <div className="bg-[#1a98e6] text-white text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6">
                    T2
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#1a98e6]">Extension</h3>
                  <p className="text-gray-600">
                    Based on T1, students receive extension questions requiring 
                    deeper research and analytical thinking.
                  </p>
                </div>

                <div className="text-center p-6 relative">
                  <div className="absolute top-0 right-0 left-0 h-1 bg-[#1a98e6] opacity-30"></div>
                  <div className="bg-[#1a98e6] text-white text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6">
                    T3
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#1a98e6]">PPT & IEEE Paper</h3>
                  <p className="text-gray-600">
                    Students submit presentations and IEEE-format papers 
                    directly through the platform.
                  </p>
                </div>
              </div>
            </section>
            
            {/* CTA Section */}
            <section className="text-center py-16">
              <div className="bg-gradient-to-r from-[#1a98e6] to-[#0e86d4] rounded-xl p-10 shadow-xl">
                <h2 className="text-3xl font-bold mb-4 text-white">Ready to Get Started?</h2>
                <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
                  Access all your assessments, collaborate with group members, and submit your work through our platform.
                </p>
                <Button 
                  onClick={() => setShowLogin(true)} 
                  variant="secondary"
                  size="lg"
                  className="bg-white text-[#1a98e6] hover:bg-gray-100"
                >
                  Login Now
                </Button>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1a98e6] text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Vignan University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
