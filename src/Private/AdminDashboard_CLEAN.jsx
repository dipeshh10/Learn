import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaUser, FaUsers, FaChartBar, FaCalendarAlt, FaClipboardList, FaBook } from "react-icons/fa";
import Slidebar from "../components/Slidebar.jsx";
import logoIcon from '../assets/LearnX.png';

const AdminDashboard = () => {
  // Main section state
  const [section, setSection] = useState('home');

  // Data states
  const [students, setStudents] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [reports, setReports] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);

  // Loading states
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingRoutines, setLoadingRoutines] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  // Modal states for students
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', course: '' });
  const [studentEditId, setStudentEditId] = useState(null);
  const [studentError, setStudentError] = useState('');

  // Modal states for reports
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [showEditReportModal, setShowEditReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({ title: '', student: '', grades: '' });
  const [reportEditId, setReportEditId] = useState(null);
  const [reportError, setReportError] = useState('');

  // Modal states for routines
  const [showAddRoutineModal, setShowAddRoutineModal] = useState(false);
  const [showEditRoutineModal, setShowEditRoutineModal] = useState(false);
  const [routineForm, setRoutineForm] = useState({ subject: '', time: '', teacher: '', room: '' });
  const [routineEditId, setRoutineEditId] = useState(null);
  const [routineError, setRoutineError] = useState('');

  // Modal states for attendance
  const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
  const [showEditAttendanceModal, setShowEditAttendanceModal] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({ studentName: '', class: '', status: 'Present', date: '' });
  const [attendanceEditId, setAttendanceEditId] = useState(null);
  const [attendanceError, setAttendanceError] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}
            onClick={e => { if (e.target.classList.contains('modal-overlay')) onClose(); }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              style={{
                background: 'white',
                borderRadius: '12px',
                width: '500px',
                maxWidth: '90vw',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{
                padding: '20px 24px 16px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#f9fafb'
              }}>
                <h2 style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#111827'
                }}>{title}</h2>
                <button 
                  onClick={onClose} 
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: '4px',
                    borderRadius: '4px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >&times;</button>
              </div>
              <div style={{ padding: '24px' }}>
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // CRUD Functions for Students
  const handleAddStudent = async () => {
    try {
      setStudentError('');
      if (!studentForm.name || !studentForm.email || !studentForm.course) {
        setStudentError('All fields are required');
        return;
      }
      
      setLoadingStudents(true);
      const newStudent = {
        _id: Date.now(),
        name: studentForm.name,
        email: studentForm.email,
        course: studentForm.course
      };
      setStudents([...students, newStudent]);
      setStudentForm({ name: '', email: '', course: '' });
      setShowAddStudentModal(false);
    } catch (error) {
      setStudentError(error.message || 'Failed to add student');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      setStudentError('');
      if (!studentForm.name || !studentForm.email || !studentForm.course) {
        setStudentError('All fields are required');
        return;
      }
      
      setLoadingStudents(true);
      setStudents(students.map(s => 
        s._id === studentEditId ? { ...s, ...studentForm } : s
      ));
      setStudentForm({ name: '', email: '', course: '' });
      setShowEditStudentModal(false);
      setStudentEditId(null);
    } catch (error) {
      setStudentError(error.message || 'Failed to update student');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    try {
      setLoadingStudents(true);
      setStudents(students.filter(s => s._id !== id));
    } catch (error) {
      alert('Failed to delete student: ' + error.message);
    } finally {
      setLoadingStudents(false);
    }
  };

  // CRUD Functions for Reports
  const handleAddReport = async () => {
    try {
      setReportError('');
      if (!reportForm.title || !reportForm.student || !reportForm.grades) {
        setReportError('All fields are required');
        return;
      }
      
      setLoadingReports(true);
      const newReport = {
        id: Date.now(),
        title: reportForm.title,
        student: reportForm.student,
        grades: reportForm.grades,
        date: new Date().toISOString().split('T')[0]
      };
      setReports([...reports, newReport]);
      setReportForm({ title: '', student: '', grades: '' });
      setShowAddReportModal(false);
    } catch (error) {
      setReportError(error.message || 'Failed to add report');
    } finally {
      setLoadingReports(false);
    }
  };

  const handleUpdateReport = async () => {
    try {
      setReportError('');
      if (!reportForm.title || !reportForm.student || !reportForm.grades) {
        setReportError('All fields are required');
        return;
      }
      
      setLoadingReports(true);
      setReports(reports.map(r => 
        r.id === reportEditId ? { ...r, ...reportForm } : r
      ));
      setReportForm({ title: '', student: '', grades: '' });
      setShowEditReportModal(false);
      setReportEditId(null);
    } catch (error) {
      setReportError(error.message || 'Failed to update report');
    } finally {
      setLoadingReports(false);
    }
  };

  const handleDeleteReport = async (id) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    
    try {
      setLoadingReports(true);
      setReports(reports.filter(r => r.id !== id));
    } catch (error) {
      alert('Failed to delete report: ' + error.message);
    } finally {
      setLoadingReports(false);
    }
  };

  // CRUD Functions for Routines
  const handleAddRoutine = async () => {
    try {
      setRoutineError('');
      if (!routineForm.subject || !routineForm.time || !routineForm.teacher || !routineForm.room) {
        setRoutineError('All fields are required');
        return;
      }
      
      setLoadingRoutines(true);
      const newRoutine = {
        _id: Date.now(),
        subject: routineForm.subject,
        time: routineForm.time,
        teacher: routineForm.teacher,
        room: routineForm.room
      };
      setRoutines([...routines, newRoutine]);
      setRoutineForm({ subject: '', time: '', teacher: '', room: '' });
      setShowAddRoutineModal(false);
    } catch (error) {
      setRoutineError(error.message || 'Failed to add routine');
    } finally {
      setLoadingRoutines(false);
    }
  };

  const handleUpdateRoutine = async () => {
    try {
      setRoutineError('');
      if (!routineForm.subject || !routineForm.time || !routineForm.teacher || !routineForm.room) {
        setRoutineError('All fields are required');
        return;
      }
      
      setLoadingRoutines(true);
      setRoutines(routines.map(r => 
        r._id === routineEditId ? { ...r, ...routineForm } : r
      ));
      setRoutineForm({ subject: '', time: '', teacher: '', room: '' });
      setShowEditRoutineModal(false);
      setRoutineEditId(null);
    } catch (error) {
      setRoutineError(error.message || 'Failed to update routine');
    } finally {
      setLoadingRoutines(false);
    }
  };

  const handleDeleteRoutine = async (id) => {
    if (!confirm('Are you sure you want to delete this routine?')) return;
    
    try {
      setLoadingRoutines(true);
      setRoutines(routines.filter(r => r._id !== id));
    } catch (error) {
      alert('Failed to delete routine: ' + error.message);
    } finally {
      setLoadingRoutines(false);
    }
  };

  // CRUD Functions for Attendance
  const handleAddAttendance = async () => {
    try {
      setAttendanceError('');
      if (!attendanceForm.studentName || !attendanceForm.class || !attendanceForm.status || !attendanceForm.date) {
        setAttendanceError('All fields are required');
        return;
      }
      
      setLoadingAttendance(true);
      const newAttendance = {
        _id: Date.now(),
        studentName: attendanceForm.studentName,
        class: attendanceForm.class,
        status: attendanceForm.status,
        date: attendanceForm.date
      };
      setAttendanceList([...attendanceList, newAttendance]);
      setAttendanceForm({ studentName: '', class: '', status: 'Present', date: attendanceDate });
      setShowAddAttendanceModal(false);
    } catch (error) {
      setAttendanceError(error.message || 'Failed to mark attendance');
    } finally {
      setLoadingAttendance(false);
    }
  };

  const handleUpdateAttendance = async () => {
    try {
      setAttendanceError('');
      if (!attendanceForm.studentName || !attendanceForm.class || !attendanceForm.status || !attendanceForm.date) {
        setAttendanceError('All fields are required');
        return;
      }
      
      setLoadingAttendance(true);
      setAttendanceList(attendanceList.map(a => 
        a._id === attendanceEditId ? { ...a, ...attendanceForm } : a
      ));
      setAttendanceForm({ studentName: '', class: '', status: 'Present', date: attendanceDate });
      setShowEditAttendanceModal(false);
      setAttendanceEditId(null);
    } catch (error) {
      setAttendanceError(error.message || 'Failed to update attendance');
    } finally {
      setLoadingAttendance(false);
    }
  };

  const handleDeleteAttendance = async (id) => {
    if (!confirm('Are you sure you want to delete this attendance record?')) return;
    
    try {
      setLoadingAttendance(true);
      setAttendanceList(attendanceList.filter(a => a._id !== id));
    } catch (error) {
      alert('Failed to delete attendance: ' + error.message);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const loadAttendanceForDate = () => {
    // In a real app, this would fetch from API based on date
    const filteredAttendance = attendanceList.filter(a => a.date === attendanceDate);
    setAttendanceList(filteredAttendance);
  };

  // Home Section
  const renderHome = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          padding: '20px',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          borderRadius: '12px',
          color: 'white'
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            margin: '0 0 8px 0',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Welcome to LearnX Admin Dashboard!
          </h1>
          <p style={{ 
            fontSize: '16px', 
            margin: 0, 
            opacity: 0.9 
          }}>
            Manage your educational platform with ease
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px', 
          marginBottom: '32px' 
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
            borderRadius: '16px', 
            padding: '24px', 
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(59, 130, 246, 0.25)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>👥</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>Total Students</h3>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: '700' }}>{students.length}</p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
            borderRadius: '16px', 
            padding: '24px', 
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📚</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>Class Routines</h3>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: '700' }}>{routines.length}</p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
            borderRadius: '16px', 
            padding: '24px', 
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(245, 158, 11, 0.25)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📊</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>Reports</h3>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: '700' }}>{reports.length}</p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
            borderRadius: '16px', 
            padding: '24px', 
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(139, 92, 246, 0.25)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>Attendance Records</h3>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: '700' }}>{attendanceList.length}</p>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ 
            color: '#2563eb', 
            fontSize: '20px', 
            fontWeight: '600', 
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Quick Actions
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            <button
              onClick={() => setSection('students')}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              👥 Manage Students
            </button>
            <button
              onClick={() => setSection('routines')}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              📚 Class Routines
            </button>
            <button
              onClick={() => setSection('attendance')}
              style={{
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8b5cf6'}
            >
              ✅ Attendance
            </button>
            <button
              onClick={() => setSection('reports')}
              style={{
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
            >
              📊 View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Students Section
  const renderStudents = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        key="students-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}
      >
        <h2 style={{ 
          color: '#2563eb', 
          fontSize: '24px', 
          fontWeight: '600', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Manage Students
        </h2>
        {loadingStudents ? <p>Loading...</p> : (
          <>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#374151', color: 'white' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>#</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>NAME</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>EMAIL</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>COURSE</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ 
                      padding: '20px', 
                      textAlign: 'center', 
                      color: '#6b7280',
                      fontStyle: 'italic'
                    }}>
                      No students found. Add your first student!
                    </td>
                  </tr>
                )}
                {students.map((student, index) => (
                  <tr key={student._id || index} style={{ 
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <td style={{ padding: '16px', fontWeight: '500' }}>{index + 1}</td>
                    <td style={{ padding: '16px' }}>{student.name}</td>
                    <td style={{ padding: '16px', color: '#2563eb' }}>{student.email}</td>
                    <td style={{ padding: '16px' }}>{student.course}</td>
                    <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setStudentForm(student);
                          setStudentEditId(student._id);
                          setShowEditStudentModal(true);
                          setStudentError('');
                        }}
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f9fafb';
                          e.target.style.borderColor = '#9ca3af';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#ffffff';
                          e.target.style.borderColor = '#d1d5db';
                        }}
                      >
                        <FaEdit style={{ marginRight: '4px' }} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student._id)}
                        disabled={loadingStudents}
                        style={{
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: loadingStudents ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          opacity: loadingStudents ? 0.6 : 1,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (!loadingStudents) e.target.style.backgroundColor = '#dc2626';
                        }}
                        onMouseLeave={(e) => {
                          if (!loadingStudents) e.target.style.backgroundColor = '#ef4444';
                        }}
                      >
                        <FaTrash style={{ marginRight: '4px' }} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => { 
                  setShowAddStudentModal(true); 
                  setStudentError(''); 
                  setStudentForm({ name: '', email: '', course: '' });
                }}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 auto',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
              >
                <span style={{ fontSize: '18px' }}>➕</span> Add Student
              </button>
            </div>

            {/* Add Student Modal */}
            <Modal isOpen={showAddStudentModal} onClose={() => setShowAddStudentModal(false)} title="Add Student">
              <form onSubmit={e => { e.preventDefault(); handleAddStudent(); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    value={studentForm.name}
                    onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                    placeholder="e.g., John Doe"
                    required
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: '#ffffff',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Email <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={studentForm.email}
                    onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                    placeholder="e.g., john@example.com"
                    required
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: '#ffffff',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Course <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    value={studentForm.course}
                    onChange={e => setStudentForm({ ...studentForm, course: e.target.value })}
                    placeholder="e.g., Computer Science"
                    required
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: '#ffffff',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                {studentError && <div style={{ color: '#ef4444', fontSize: '14px' }}>{studentError}</div>}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowAddStudentModal(false)}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#374151',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loadingStudents}
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '6px',
                      background: loadingStudents ? '#9ca3af' : '#2563eb',
                      color: '#ffffff',
                      cursor: loadingStudents ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {loadingStudents ? 'Adding...' : 'Add Student'}
                  </button>
                </div>
              </form>
            </Modal>

            {/* Edit Student Modal */}
            <Modal isOpen={showEditStudentModal} onClose={() => setShowEditStudentModal(false)} title="Edit Student">
              <form onSubmit={e => { e.preventDefault(); handleUpdateStudent(); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    value={studentForm.name}
                    onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                    placeholder="e.g., John Doe"
                    required
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: '#ffffff',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Email <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={studentForm.email}
                    onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                    placeholder="e.g., john@example.com"
                    required
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: '#ffffff',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Course <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    value={studentForm.course}
                    onChange={e => setStudentForm({ ...studentForm, course: e.target.value })}
                    placeholder="e.g., Computer Science"
                    required
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: '#ffffff',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                {studentError && <div style={{ color: '#ef4444', fontSize: '14px' }}>{studentError}</div>}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowEditStudentModal(false)}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#374151',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loadingStudents}
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '6px',
                      background: loadingStudents ? '#9ca3af' : '#2563eb',
                      color: '#ffffff',
                      cursor: loadingStudents ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {loadingStudents ? 'Updating...' : 'Update Student'}
                  </button>
                </div>
              </form>
            </Modal>
          </>
        )}
      </motion.div>
    </div>
  );

  // Reports Section (simplified for demo)
  const renderReports = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}
      >
        <h2 style={{ 
          color: '#2563eb', 
          fontSize: '24px', 
          fontWeight: '600', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Manage Reports
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280' }}>
          Report management functionality will be implemented here.
        </p>
      </motion.div>
    </div>
  );

  // Routines Section (simplified for demo)
  const renderRoutines = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}
      >
        <h2 style={{ 
          color: '#2563eb', 
          fontSize: '24px', 
          fontWeight: '600', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Class Routines
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280' }}>
          Routine management functionality will be implemented here.
        </p>
      </motion.div>
    </div>
  );

  // Attendance Section (simplified for demo)
  const renderAttendance = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}
      >
        <h2 style={{ 
          color: '#2563eb', 
          fontSize: '24px', 
          fontWeight: '600', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Student Attendance
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280' }}>
          Attendance management functionality will be implemented here.
        </p>
      </motion.div>
    </div>
  );

  // Main render function
  const renderContent = () => {
    switch(section) {
      case 'home':
        return renderHome();
      case 'students':
        return renderStudents();
      case 'reports':
        return renderReports();
      case 'routines':
        return renderRoutines();
      case 'attendance':
        return renderAttendance();
      default:
        return renderHome();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Slidebar 
        setSection={setSection} 
        currentSection={section}
      />
      
      <div style={{ 
        flex: 1,
        marginLeft: '280px',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: '280px',
          right: 0,
          height: '70px',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={logoIcon} alt="LearnX Logo" style={{ width: '40px', height: '40px' }} />
            <h1 style={{ 
              margin: 0, 
              fontSize: '24px', 
              fontWeight: '700',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              LearnX Admin Dashboard
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', opacity: 0.9 }}>Welcome, Admin</span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              👤
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div style={{ paddingTop: '70px' }}>
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
