import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../private/HomePage';
import Login from '../public/Login';
import Signup from '../public/Signup';
import AdminDashboard from '../private/AdminDashboard';
import TeacherDashboard from '../private/TeacherDashboard';
import StudentDashboard from '../private/StudentDashboard';


function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
        </Routes>
      </Router>
    
  );
}

export default App;