
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Slidebar';
import logoIcon from '../assets/LearnX.png';
import totImg from '../assets/tot.png';
import attImg from '../assets/att.png';
import notiImg from '../assets/noti.png';
import oneImg from '../assets/one.png';
import twoImg from '../assets/two.png';
import threeImg from '../assets/three.png';
import fourImg from '../assets/four.png';
import '../Style/TeacherDashboard.css';
import { FaClipboardList, FaClipboardCheck, FaBell, FaEdit, FaTrash } from 'react-icons/fa';
import { fetchStudents } from "../Services/studentApi";
import { fetchNotifications } from "../Services/notificationApi";
import {
  fetchReports,
  addReport,
  updateReport,
  deleteReport
} from "../Services/reportApi";
import {
  fetchAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance
} from "../Services/attendenceApi";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  // Auth check on mount
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    let user = null;
    try {
      user = userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
    }
    console.log('Auth check:', { user, token });
    if (!user || !user.role || !token) {
      navigate('/login', { replace: true });
      return;
    }
    if (user.role !== 'teacher') {
      // Optionally, redirect to the correct dashboard for other roles
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  
  // Load courses from localStorage on mount
  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);
  
  const role = 'teacher';
  const [section, setSection] = useState('home');
  const [reports, setReports] = useState([]);
  const [reportLoading, setReportLoading] = useState(true);
  const [reportForm, setReportForm] = useState({ title: "", studentName: "", grades: "" });
  const [reportEditId, setReportEditId] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(true);
  // Attendance CRUD
  const [attendanceEditId, setAttendanceEditId] = useState(null);
  const [attendanceForm, setAttendanceForm] = useState({ studentName: '', date: '', status: '' });
  // Students CRUD
  const [students, setStudents] = useState([]);
  const [studentEditId, setStudentEditId] = useState(null);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', class: '' });

  // Courses CRUD
  const [courses, setCourses] = useState([]);
  const [courseEditId, setCourseEditId] = useState(null);
  const [courseForm, setCourseForm] = useState({ title: '', description: '', duration: '', price: '' });

  // Modal state for pop-ups
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);

  // Reports handlers
  const handleReportChange = (e) => setReportForm({ ...reportForm, [e.target.name]: e.target.value });

  // Attendance handlers

  // Students handlers
  const handleStudentEdit = (s) => { setStudentEditId(s.id); setStudentForm({ name: s.name, email: s.email, class: s.class }); };
  const handleStudentDelete = (id) => setStudents(students.filter((s) => s.id !== id));
  const handleStudentChange = (e) => setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  const handleStudentSave = () => { setStudents(students.map((s) => (s.id === studentEditId ? { ...s, ...studentForm } : s))); setStudentEditId(null); setStudentForm({ name: '', email: '', class: '' }); };
  const handleStudentAdd = () => { setStudents([...students, { id: Date.now(), ...studentForm }]); setStudentForm({ name: '', email: '', class: '' }); };

  // Courses handlers
  const handleCourseChange = (e) => setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  const handleCourseEdit = (c) => { setCourseEditId(c.id); setCourseForm({ title: c.title, description: c.description, duration: c.duration, price: c.price }); setShowCourseModal(true); };
  const handleCourseSave = () => { 
    const updatedCourses = courses.map((c) => (c.id === courseEditId ? { ...c, ...courseForm } : c));
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourseEditId(null); 
    setCourseForm({ title: '', description: '', duration: '', price: '' }); 
    setShowCourseModal(false);
  };
  const handleCourseAdd = () => { 
    const newCourse = { id: Date.now(), ...courseForm, teacher: 'Current Teacher', createdAt: new Date().toISOString() };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourseForm({ title: '', description: '', duration: '', price: '' }); 
    setShowCourseModal(false);
  };
  const handleCourseDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updatedCourses = courses.filter(c => c.id !== id);
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
    }
  };

  async function loadStudents() {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (e) {
      alert(e.message);
    }
  }

  async function loadAttendance() {
    try {
      const data = await fetchAttendance();
      setAttendance(data);
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleAttendanceAdd() {
    try {
      await addAttendance(attendanceForm);
      setAttendanceForm({ studentName: '', date: '', status: '' });
      loadAttendance();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleAttendanceEdit(id) {
    try {
      await updateAttendance(id, attendanceForm);
      setAttendanceEditId(null);
      setAttendanceForm({ studentName: '', date: '', status: '' });
      loadAttendance();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleAttendanceDelete(id) {
    if (!window.confirm("Delete this attendance record?")) return;
    try {
      await deleteAttendance(id);
      loadAttendance();
    } catch (e) {
      alert(e.message);
    }
  }

  useEffect(() => {
    if (section === 'reports') {
      loadReports();
    }
    if (section === 'students') {
      loadStudents();
    }
    if (section === 'notifications') {
      loadNotifications();
    }
    if (section === 'attendance') {
      loadAttendance();
    }
  }, [section]);

  async function loadReports() {
    setReportLoading(true);
    try {
      const data = await fetchReports();
      setReports(data);
    } catch (e) {
      alert(e.message);
    }
    setReportLoading(false);
  }

  async function handleReportAdd() {
    try {
      await addReport(reportForm);
      setReportForm({ title: "", studentName: "", grades: "" });
      loadReports();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleReportEdit(id) {
    try {
      await updateReport(id, reportForm);
      setReportEditId(null);
      setReportForm({ title: "", studentName: "", grades: "" });
      loadReports();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleReportDelete(id) {
    if (!window.confirm("Delete this report?")) return;
    try {
      await deleteReport(id);
      loadReports();
    } catch (e) {
      alert(e.message);
    }
  }

  useEffect(() => {
    if (section === 'notifications') {
      loadNotifications();
    }
  }, [section]);

  async function loadNotifications() {
    setNotificationLoading(true);
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (e) {
      alert(e.message);
    }
    setNotificationLoading(false);
  }

  function renderSectionContent() {
    if (section === 'home') {
      return (
        <div className="dashboard-overview">
          <h2 className="dashboard-title">Welcome, Teacher!</h2>
          <div className="overview-cards-row">
            <div className="overview-card">
              <img src={totImg} alt="Total Reports" className="overview-card-img" />
              <div className="overview-card-label">Total Reports</div>
              <div className="overview-card-value">{reports.length}</div>
            </div>
            <div className="overview-card">
              <img src={attImg} alt="Attendance Records" className="overview-card-img" />
              <div className="overview-card-label">Attendance Records</div>
              <div className="overview-card-value">{attendance.length}</div>
            </div>
            <div className="overview-card">
              <img src={notiImg} alt="Active Notifications" className="overview-card-img" />
              <div className="overview-card-label">Active Notifications</div>
              <div className="overview-card-value">{notifications.length}</div>
            </div>
          </div>
          {/* Why LearnX Section */}
          <div className="why-learnX-section">
            <h2 className="why-title">Why LearnX?</h2>
            <div className="why-features-row">
              <div className="why-feature-card">
                <span role="img" aria-label="web" className="why-feature-icon">🌐</span>
                <div className="why-feature-title">Web Based</div>
              </div>
              <div className="why-feature-card">
                <span role="img" aria-label="affordable" className="why-feature-icon">💲</span>
                <div className="why-feature-title">Affordable</div>
              </div>
              <div className="why-feature-card">
                <span role="img" aria-label="security" className="why-feature-icon">🛡️</span>
                <div className="why-feature-title">Data Security</div>
              </div>
              <div className="why-feature-card">
                <span role="img" aria-label="user" className="why-feature-icon">👤</span>
                <div className="why-feature-title">User Friendly</div>
              </div>
            </div>
          </div>
          {/* Features Section */}
          <div className="features-section">
            <h2 className="features-title">Our Features</h2>
            <div className="features-underline"></div>
            <div className="features-row">
              <div className="feature-card">
                <div className="feature-img-banner">
                  <img src={oneImg} alt="Learning Management System" />
                </div>
                <div className="feature-content">
                  <div className="feature-title">Learning Management System</div>
                  <div className="feature-desc">The LMS feature revolutionizes the teaching experience, enabling educators to effortlessly create, manage, and deliver online courses while closely monitoring student progress, making online education engaging and effective.</div>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-img-banner">
                  <img src={twoImg} alt="School Management System" />
                </div>
                <div className="feature-content">
                  <div className="feature-title">School Management System</div>
                  <div className="feature-desc">The School Management System streamlines administrative tasks for schools, offering a centralized platform to efficiently manage student records, attendance, timetables, and financial matters.</div>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-img-banner">
                  <img src={threeImg} alt="Accounting Management System" />
                </div>
                <div className="feature-content">
                  <div className="feature-title">Accounting Management System</div>
                  <div className="feature-desc">Comprehensive Accounting simplifies financial management for educational institutions, offering tools for tracking budgets, expenses, and revenue, ensuring transparent and efficient financial operations.</div>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-img-banner">
                  <img src={fourImg} alt="Notification System" />
                </div>
                <div className="feature-content">
                  <div className="feature-title">Notification System</div>
                  <div className="feature-desc">Instant notifications for important updates and reminders, keeping everyone informed and engaged.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (section === 'courses') {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
          <motion.div
            key="courses-section"
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
              My Courses
            </h2>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <button 
                onClick={() => { 
                  setCourseForm({ title: '', description: '', duration: '', price: '' });
                  setCourseEditId(null);
                  setShowCourseModal(true);
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
              >
                ➕ Create New Course
              </button>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '20px' 
            }}>
              {courses.length === 0 ? (
                <div style={{ 
                  gridColumn: '1 / -1',
                  textAlign: 'center', 
                  color: '#6b7280',
                  fontStyle: 'italic',
                  padding: '40px'
                }}>
                  No courses created yet. Create your first course!
                </div>
              ) : (
                courses.map((course) => (
                  <div key={course.id} style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                  }}
                  >
                    <h3 style={{ 
                      color: '#2563eb', 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      marginBottom: '8px',
                      wordWrap: 'break-word'
                    }}>
                      {course.title}
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '14px', 
                      marginBottom: '12px',
                      lineHeight: '1.4',
                      minHeight: '40px'
                    }}>
                      {course.description}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '16px',
                      fontSize: '13px',
                      color: '#6b7280'
                    }}>
                      <span>Duration: {course.duration}</span>
                      <span>Price: ${course.price}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleCourseEdit(course)}
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '500',
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
                        Edit
                      </button>
                      <button
                        onClick={() => handleCourseDelete(course.id)}
                        style={{
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '500',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      );
    }
    if (section === 'reports') {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
          <motion.div
            key="reports-section"
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
              Manage Reports
            </h2>
            {reportLoading ? <p>Loading...</p> : (
              <>
                <div style={{ 
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <table style={{
                    width: '100%',
                    minWidth: '600px',
                    borderCollapse: 'collapse',
                    backgroundColor: 'white'
                  }}>
                    <thead>
                      <tr style={{ backgroundColor: '#374151', color: 'white' }}>
                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '60px' }}>#</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '200px' }}>TITLE</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '150px' }}>STUDENT</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '100px' }}>GRADES</th>
                        <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', minWidth: '150px' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.length === 0 && (
                        <tr>
                          <td colSpan="5" style={{ 
                            padding: '20px', 
                            textAlign: 'center', 
                            color: '#6b7280',
                            fontStyle: 'italic'
                          }}>
                            No reports found. Add your first report!
                          </td>
                        </tr>
                      )}
                      {reports.map((report, index) => (
                        <tr key={report.id || index} style={{ 
                          borderBottom: '1px solid #e5e7eb',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <td style={{ padding: '16px', fontWeight: '500' }}>{index + 1}</td>
                          <td style={{ padding: '16px', fontWeight: '600' }}>{report.title}</td>
                          <td style={{ padding: '16px', color: '#2563eb' }}>{report.studentName}</td>
                          <td style={{ padding: '16px', color: '#059669', fontWeight: '600' }}>{report.grades}</td>
                          <td style={{ padding: '16px' }}>
                            <div style={{ 
                              display: 'flex', 
                              gap: '8px', 
                              justifyContent: 'center',
                              flexWrap: 'wrap'
                            }}>
                              <button
                                onClick={() => {
                                  setReportForm({ title: report.title, studentName: report.studentName, grades: report.grades });
                                  setReportEditId(report.id);
                                  setShowReportModal(true);
                                }}
                                style={{
                                  backgroundColor: '#3b82f6',
                                  color: 'white',
                                  border: 'none',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  transition: 'all 0.2s',
                                  minWidth: '60px',
                                  justifyContent: 'center'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = '#2563eb';
                                  e.target.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = '#3b82f6';
                                  e.target.style.transform = 'translateY(0)';
                                }}
                              >
                                <FaEdit />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleReportDelete(report.id)}
                                style={{
                                  backgroundColor: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  transition: 'all 0.2s',
                                  minWidth: '60px',
                                  justifyContent: 'center'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = '#dc2626';
                                  e.target.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = '#ef4444';
                                  e.target.style.transform = 'translateY(0)';
                                }}
                              >
                                <FaTrash />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button 
                    onClick={() => { 
                      setShowReportModal(true); 
                      setReportForm({ title: '', studentName: '', grades: '' });
                      setReportEditId(null);
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
                    <span style={{ fontSize: '18px' }}>➕</span> Add Report
                  </button>
                </div>

                {/* Modern Modal */}
                <AnimatePresence>
                  {showReportModal && (
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
                      onClick={e => { if (e.target === e.currentTarget) setShowReportModal(false); }}
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
                          }}>{reportEditId ? 'Edit Report' : 'Add Report'}</h2>
                          <button 
                            onClick={() => setShowReportModal(false)} 
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
                          <form onSubmit={e => { 
                            e.preventDefault(); 
                            if (reportEditId) {
                              handleReportEdit(reportEditId);
                            } else {
                              handleReportAdd();
                            }
                            setShowReportModal(false); 
                          }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                                Title <span style={{ color: '#ef4444' }}>*</span>
                              </label>
                              <input
                                value={reportForm.title}
                                onChange={e => setReportForm({ ...reportForm, title: e.target.value })}
                                placeholder="e.g., Monthly Assessment"
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
                                Student Name <span style={{ color: '#ef4444' }}>*</span>
                              </label>
                              <input
                                value={reportForm.studentName}
                                onChange={e => setReportForm({ ...reportForm, studentName: e.target.value })}
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
                                Grades <span style={{ color: '#ef4444' }}>*</span>
                              </label>
                              <select
                                value={reportForm.grades}
                                onChange={e => setReportForm({ ...reportForm, grades: e.target.value })}
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
                              >
                                <option value="">Select Grade</option>
                                <option value="A+">A+</option>
                                <option value="A">A</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="F">F</option>
                              </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                              <button 
                                type="button" 
                                onClick={() => setShowReportModal(false)}
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
                                disabled={!reportForm.title || !reportForm.studentName || !reportForm.grades}
                                style={{
                                  padding: '8px 16px',
                                  border: 'none',
                                  borderRadius: '6px',
                                  background: (!reportForm.title || !reportForm.studentName || !reportForm.grades) ? '#9ca3af' : '#2563eb',
                                  color: '#ffffff',
                                  cursor: (!reportForm.title || !reportForm.studentName || !reportForm.grades) ? 'not-allowed' : 'pointer',
                                  fontSize: '14px',
                                  fontWeight: '500'
                                }}
                              >
                                {reportEditId ? 'Update Report' : 'Add Report'}
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        </div>
      );
    }
    if (section === 'attendance') {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
          <motion.div
            key="attendance-section"
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
              Attendance Management
            </h2>
            <div style={{ 
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <table style={{
                width: '100%',
                minWidth: '600px',
                borderCollapse: 'collapse',
                backgroundColor: 'white'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#374151', color: 'white' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '60px' }}>#</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '200px' }}>STUDENT</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '150px' }}>DATE</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '120px' }}>STATUS</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', minWidth: '150px' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ 
                        padding: '20px', 
                        textAlign: 'center', 
                        color: '#6b7280',
                        fontStyle: 'italic'
                      }}>
                        No attendance records found. Add your first record!
                      </td>
                    </tr>
                  )}
                  {attendance.map((a, index) => (
                    <tr key={a.id || index} style={{ 
                      borderBottom: '1px solid #e5e7eb',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '16px', fontWeight: '500' }}>{index + 1}</td>
                      <td style={{ padding: '16px', fontWeight: '600' }}>{a.studentName}</td>
                      <td style={{ padding: '16px', color: '#6b7280' }}>{a.date}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          backgroundColor: a.status?.toLowerCase() === 'present' ? '#dcfce7' : '#fee2e2',
                          color: a.status?.toLowerCase() === 'present' ? '#15803d' : '#dc2626'
                        }}>
                          {a.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ 
                          display: 'flex', 
                          gap: '8px', 
                          justifyContent: 'center',
                          flexWrap: 'wrap'
                        }}>
                          <button
                            onClick={() => {
                              setAttendanceForm({ studentName: a.studentName, date: a.date, status: a.status });
                              setAttendanceEditId(a.id);
                              setShowAttendanceModal(true);
                            }}
                            style={{
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.2s',
                              minWidth: '60px',
                              justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#2563eb';
                              e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#3b82f6';
                              e.target.style.transform = 'translateY(0)';
                            }}
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleAttendanceDelete(a.id)}
                            style={{
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.2s',
                              minWidth: '60px',
                              justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#dc2626';
                              e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#ef4444';
                              e.target.style.transform = 'translateY(0)';
                            }}
                          >
                            <FaTrash />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => { 
                  setShowAttendanceModal(true); 
                  setAttendanceForm({ studentName: '', date: '', status: '' });
                  setAttendanceEditId(null);
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
                <span style={{ fontSize: '18px' }}>➕</span> Add Attendance
              </button>
            </div>

            {/* Modern Modal */}
            <AnimatePresence>
              {showAttendanceModal && (
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
                  onClick={e => { if (e.target === e.currentTarget) setShowAttendanceModal(false); }}
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
                      }}>{attendanceEditId ? 'Edit Attendance' : 'Add Attendance'}</h2>
                      <button 
                        onClick={() => setShowAttendanceModal(false)} 
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
                      <form onSubmit={e => { 
                        e.preventDefault(); 
                        if (attendanceEditId) {
                          handleAttendanceEdit(attendanceEditId);
                        } else {
                          handleAttendanceAdd();
                        }
                        setShowAttendanceModal(false); 
                      }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                            Student Name <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <input
                            value={attendanceForm.studentName}
                            onChange={e => setAttendanceForm({ ...attendanceForm, studentName: e.target.value })}
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
                            Date <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <input
                            type="date"
                            value={attendanceForm.date}
                            onChange={e => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
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
                            Status <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <select
                            value={attendanceForm.status}
                            onChange={e => setAttendanceForm({ ...attendanceForm, status: e.target.value })}
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
                          >
                            <option value="">Select Status</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                          <button 
                            type="button" 
                            onClick={() => setShowAttendanceModal(false)}
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
                            disabled={!attendanceForm.studentName || !attendanceForm.date || !attendanceForm.status}
                            style={{
                              padding: '8px 16px',
                              border: 'none',
                              borderRadius: '6px',
                              background: (!attendanceForm.studentName || !attendanceForm.date || !attendanceForm.status) ? '#9ca3af' : '#2563eb',
                              color: '#ffffff',
                              cursor: (!attendanceForm.studentName || !attendanceForm.date || !attendanceForm.status) ? 'not-allowed' : 'pointer',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}
                          >
                            {attendanceEditId ? 'Update Attendance' : 'Add Attendance'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      );
    }
    if (section === 'notifications') {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
          <motion.div
            key="notifications-section"
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
              Notifications
            </h2>
            {notificationLoading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '40px',
                color: '#6b7280'
              }}>
                Loading notifications...
              </div>
            ) : (
              <div style={{ 
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <table style={{
                  width: '100%',
                  minWidth: '600px',
                  borderCollapse: 'collapse',
                  backgroundColor: 'white'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#374151', color: 'white' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '60px' }}>#</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '200px' }}>TITLE</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '300px' }}>MESSAGE</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '120px' }}>DATE</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '120px' }}>PRIORITY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ 
                          padding: '20px', 
                          textAlign: 'center', 
                          color: '#6b7280',
                          fontStyle: 'italic'
                        }}>
                          No notifications found.
                        </td>
                      </tr>
                    )}
                    {notifications.map((n, idx) => (
                      <tr key={n.id || idx} style={{ 
                        borderBottom: '1px solid #e5e7eb',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '16px', fontWeight: '500' }}>{idx + 1}</td>
                        <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>{n.title}</td>
                        <td style={{ padding: '16px', color: '#6b7280', maxWidth: '300px', wordWrap: 'break-word' }}>
                          {n.message}
                        </td>
                        <td style={{ padding: '16px', color: '#6b7280' }}>{n.date}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            backgroundColor: 
                              n.priority?.toLowerCase() === 'high' ? '#fee2e2' :
                              n.priority?.toLowerCase() === 'medium' ? '#fef3c7' :
                              '#ecfdf5',
                            color: 
                              n.priority?.toLowerCase() === 'high' ? '#dc2626' :
                              n.priority?.toLowerCase() === 'medium' ? '#d97706' :
                              '#059669'
                          }}>
                            {n.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      );
    }
    if (section === 'students') {
      // View-only table for teacher
      return (
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
              Student Directory
            </h2>
            <div style={{ 
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <table style={{
                width: '100%',
                minWidth: '600px',
                borderCollapse: 'collapse',
                backgroundColor: 'white'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#374151', color: 'white' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '60px' }}>#</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '250px' }}>NAME</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '250px' }}>EMAIL</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '150px' }}>CLASS</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ 
                        padding: '20px', 
                        textAlign: 'center', 
                        color: '#6b7280',
                        fontStyle: 'italic'
                      }}>
                        No students found.
                      </td>
                    </tr>
                  )}
                  {students.map((student, idx) => (
                    <tr key={student.id || idx} style={{ 
                      borderBottom: '1px solid #e5e7eb',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '16px', fontWeight: '500' }}>{idx + 1}</td>
                      <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>
                        {student.fullName || student.name}
                      </td>
                      <td style={{ padding: '16px', color: '#2563eb' }}>{student.email}</td>
                      <td style={{ padding: '16px', color: '#6b7280' }}>{student.class}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      );
    }
  }

  // Enhanced logout: clear localStorage and redirect
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role={role} section={section} onSectionChange={setSection} onLogout={handleLogout} />
      <div className="main-content">
        {/* Modern Header */}
        <header className="dashboard-header-bar">
          <div className="header-left">
            <img src={logoIcon} alt="Logo" className="header-logo" />
            <span className="header-appname">LearnX</span>
          </div>
          <div className="header-right">
            <span className="header-avatar">T</span>
          </div>
        </header>
        {/* Main Section */}
        <section className="dashboard-section">
          {renderSectionContent()}
        </section>

        {/* Course Modal */}
        {showCourseModal && (
          <div className="modal-overlay" onClick={() => setShowCourseModal(false)}>
            <motion.div 
              className="modal-content course-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header">
                <h3>{courseEditId ? 'Edit Course' : 'Create New Course'}</h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowCourseModal(false)}
                >
                  ×
                </button>
              </div>
              <form className="course-form" onSubmit={handleCourseSave}>
                <div className="form-group">
                  <label htmlFor="courseTitle">Course Title</label>
                  <input
                    type="text"
                    id="courseTitle"
                    name="title"
                    value={courseForm.title}
                    onChange={handleCourseChange}
                    placeholder="Enter course title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="courseDescription">Description</label>
                  <textarea
                    id="courseDescription"
                    name="description"
                    value={courseForm.description}
                    onChange={handleCourseChange}
                    placeholder="Enter course description"
                    rows="4"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="courseDuration">Duration (weeks)</label>
                    <input
                      type="number"
                      id="courseDuration"
                      name="duration"
                      value={courseForm.duration}
                      onChange={handleCourseChange}
                      placeholder="e.g., 8"
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="coursePrice">Price ($)</label>
                    <input
                      type="number"
                      id="coursePrice"
                      name="price"
                      value={courseForm.price}
                      onChange={handleCourseChange}
                      placeholder="e.g., 99"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowCourseModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    {courseEditId ? 'Update Course' : 'Create Course'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
      <footer className="dashboard-footer">
        Designed and Developed for LearnX
      </footer>
    </div>
  );
};

export default TeacherDashboard;
// Modal component for pop-ups
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      {children}
    </div>
  );
};

