
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated && userRole) {
      // In a real app, we would validate the token with the server
      // For now, we'll just set a mock user based on the role
      if (userRole === 'admin') {
        setUser({
          id: 'admin-1',
          name: 'Admin User',
          role: 'admin',
        });
      } else if (userRole === 'faculty') {
        setUser({
          id: 'faculty-1',
          name: 'Dr. Smith',
          role: 'faculty',
          facultyId: 'FAC2023001',
          department: 'Computer Science',
          subjects: ['Web Technologies', 'Database Systems'],
          classes: ['CSE-A', 'CSE-B']
        });
      } else if (userRole === 'student') {
        setUser({
          id: 'student-1',
          name: 'John Doe',
          role: 'student',
          regNumber: '21BCE7777',
          class: 'CSE-A',
          group: 'Group A-3'
        });
      }
    }
    
    setIsLoading(false);
  }, []);
  
  // Login function
  const login = async (username, password) => {
    try {
      // In a real app, we would make an API call to authenticate
      // For the prototype, we'll just use mock data
      
      if (username === 'admin' && password === 'admin123') {
        const user = {
          id: 'admin-1',
          name: 'Admin User',
          role: 'admin',
        };
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'admin');
        setUser(user);
        return { success: true, user };
        
      } else if (username === 'faculty' && password === 'faculty123') {
        const user = {
          id: 'faculty-1',
          name: 'Dr. Smith',
          role: 'faculty',
          facultyId: 'FAC2023001',
          department: 'Computer Science',
          subjects: ['Web Technologies', 'Database Systems'],
          classes: ['CSE-A', 'CSE-B']
        };
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'faculty');
        setUser(user);
        return { success: true, user };
        
      } else if (username === '21BCE7777' && password === 'student123') {
        const user = {
          id: 'student-1',
          name: 'John Doe',
          role: 'student',
          regNumber: '21BCE7777',
          class: 'CSE-A',
          group: 'Group A-3'
        };
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'student');
        setUser(user);
        return { success: true, user };
        
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
      
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setUser(null);
  };
  
  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
