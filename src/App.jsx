import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Private/HomePage';
import Login from './Public/Login';
import Signup from './Public/Signup';
import AdminDashboard from './Private/AdminDashboard';
import TeacherDashboard from './Private/TeacherDashboard';
import StudentDashboard from './Private/StudentDashboard';


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