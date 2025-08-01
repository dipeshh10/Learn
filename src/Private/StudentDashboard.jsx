import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from '../components/Slidebar';
import logoIcon from '../assets/LearnX.png';
import claImg from '../assets/cla.png';
import leaImg from '../assets/lea.png';
import feeImg from '../assets/fee.png';
import notiImg from '../assets/noti.png';
import oneImg from '../assets/one.png';
import twoImg from '../assets/two.png';
import threeImg from '../assets/three.png';
import fourImg from '../assets/four.png';
import '../Style/StudentDashboard.css';
import { FaChalkboardTeacher, FaBook, FaMoneyBillWave, FaBell } from 'react-icons/fa';
import { fetchRoutines } from "../Services/routineApi";
import { fetchLearningMaterials } from "../Services/learningMaterialApi";
import { fetchFees } from "../Services/feeApi";
import { fetchNotifications } from "../Services/notificationApi";
import { fetchReports } from "../Services/reportApi";
import { fetchAttendance } from "../Services/attendenceApi";

const StudentDashboard = () => {
  const [section, setSection] = useState('home');
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [routineLoading, setRoutineLoading] = useState(true);
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [learningLoading, setLearningLoading] = useState(true);
  const [fees, setFees] = useState([]);
  const [feeLoading, setFeeLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [reportLoading, setReportLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (section === 'routine') {
      loadRoutines();
    }
    if (section === 'learning') {
      loadLearningMaterials();
    }
    if (section === 'fees') {
      loadFees();
    }
    if (section === 'notifications') {
      loadNotifications();
    }
    if (section === 'reports') {
      loadReports();
    }
    if (section === 'attendance') {
      loadAttendance();
    }
    if (section === 'courses') {
      loadCourses();
    }
  }, [section]);

  // Load courses from localStorage (shared with teacher)
  function loadCourses() {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }

  async function loadRoutines() {
    setRoutineLoading(true);
    try {
      const data = await fetchRoutines();
      setRoutines(data);
    } catch (e) {
      alert(e.message);
    }
    setRoutineLoading(false);
  }

  async function loadLearningMaterials() {
    setLearningLoading(true);
    try {
      const data = await fetchLearningMaterials();
      setLearningMaterials(data);
    } catch (e) {
      alert(e.message);
    }
    setLearningLoading(false);
  }

  async function loadFees() {
    setFeeLoading(true);
    try {
      const data = await fetchFees();
      setFees(data);
    } catch (e) {
      alert(e.message);
    }
    setFeeLoading(false);
  }

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

  async function loadAttendance() {
    setAttendanceLoading(true);
    try {
      const data = await fetchAttendance();
      setAttendance(data);
    } catch (e) {
      alert(e.message);
    }
    setAttendanceLoading(false);
  }

  function renderSectionContent() {
    if (section === 'home') {
      return (
        <div className="dashboard-overview">
          <h2 className="dashboard-title">Welcome, Student!</h2>
          <div className="overview-cards-row">
            <div className="overview-card">
              <img src={claImg} alt="Reports" className="overview-card-img" />
              <div className="overview-card-label">Reports</div>
              <div className="overview-card-value">{reports.length}</div>
            </div>
            <div className="overview-card">
              <img src={leaImg} alt="Learning Materials" className="overview-card-img" />
              <div className="overview-card-label">Learning Materials</div>
              <div className="overview-card-value">{learningMaterials.length}</div>
            </div>
            <div className="overview-card">
              <img src={feeImg} alt="Unpaid Fees" className="overview-card-img" />
              <div className="overview-card-label">Unpaid Fees</div>
              <div className="overview-card-value">{fees.filter(f => f.status && f.status.toLowerCase() !== 'paid').length}</div>
            </div>
            <div className="overview-card">
              <img src={notiImg} alt="Active Notifications" className="overview-card-img" />
              <div className="overview-card-label">Active Notifications</div>
              <div className="overview-card-value">{notifications.length}</div>
            </div>
          </div>
          {/* Why SMART SHIKSHA Section */}
          <div className="why-LearnX-section">
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
    if (section === 'students') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Students</h2>
          <div className="table-container">
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No students found</td></tr>
                ) : students.map((student, idx) => (
                  <tr key={student.id}>
                    <td>{idx + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    if (section === 'classes') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Classes</h2>
          <div className="table-container">
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Class Name</th>
                  <th>Teacher</th>
                  <th>Schedule</th>
                </tr>
              </thead>
              <tbody>
                {classes.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No classes found</td></tr>
                ) : classes.map((cls, idx) => (
                  <tr key={cls.id}>
                    <td>{idx + 1}</td>
                    <td>{cls.name}</td>
                    <td>{cls.teacher}</td>
                    <td>{cls.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    if (section === 'routine') {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
          <motion.div
            key="routine-section"
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
              Class Routine
            </h2>
            {routineLoading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '40px',
                color: '#6b7280'
              }}>
                Loading routines...
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
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '120px' }}>DAY</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '200px' }}>CLASS</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '150px' }}>TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routines.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ 
                          padding: '20px', 
                          textAlign: 'center', 
                          color: '#6b7280',
                          fontStyle: 'italic'
                        }}>
                          No routines found.
                        </td>
                      </tr>
                    )}
                    {routines.map((r, idx) => (
                      <tr key={r.id || idx} style={{ 
                        borderBottom: '1px solid #e5e7eb',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '16px', fontWeight: '500' }}>{idx + 1}</td>
                        <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>{r.day}</td>
                        <td style={{ padding: '16px', color: '#2563eb' }}>{r.class}</td>
                        <td style={{ padding: '16px', color: '#6b7280' }}>{r.time}</td>
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
    if (section === 'learning') {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
          <motion.div
            key="learning-section"
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
              Learning Materials
            </h2>
            {learningLoading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '40px',
                color: '#6b7280'
              }}>
                Loading materials...
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
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '250px' }}>TITLE</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '120px' }}>TYPE</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', minWidth: '150px' }}>LINK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {learningMaterials.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ 
                          padding: '20px', 
                          textAlign: 'center', 
                          color: '#6b7280',
                          fontStyle: 'italic'
                        }}>
                          No learning materials found.
                        </td>
                      </tr>
                    )}
                    {learningMaterials.map((l, idx) => (
                      <tr key={l.id || idx} style={{ 
                        borderBottom: '1px solid #e5e7eb',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '16px', fontWeight: '500' }}>{idx + 1}</td>
                        <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>{l.title}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            backgroundColor: l.type?.toLowerCase() === 'pdf' ? '#fef3c7' : '#ddd6fe',
                            color: l.type?.toLowerCase() === 'pdf' ? '#d97706' : '#7c3aed'
                          }}>
                            {l.type}
                          </span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <a 
                            href={l.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#2563eb',
                              color: 'white',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontSize: '12px',
                              fontWeight: '500',
                              display: 'inline-block',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                          >
                            {l.type === 'PDF' ? '📄 View PDF' : '▶️ Watch Video'}
                          </a>
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
    if (section === 'fees') {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
          <motion.div
            key="fees-section"
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
              Fees Management
            </h2>
            {feeLoading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '40px',
                color: '#6b7280'
              }}>
                Loading fees...
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
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '200px' }}>STUDENT</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '120px' }}>AMOUNT</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '120px' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ 
                          padding: '20px', 
                          textAlign: 'center', 
                          color: '#6b7280',
                          fontStyle: 'italic'
                        }}>
                          No fees found.
                        </td>
                      </tr>
                    )}
                    {fees.map((f, idx) => (
                      <tr key={f.id || idx} style={{ 
                        borderBottom: '1px solid #e5e7eb',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '16px', fontWeight: '500' }}>{idx + 1}</td>
                        <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>{f.studentName}</td>
                        <td style={{ padding: '16px', color: '#059669', fontWeight: '600' }}>${f.amount}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            backgroundColor: f.status?.toLowerCase() === 'paid' ? '#dcfce7' : '#fee2e2',
                            color: f.status?.toLowerCase() === 'paid' ? '#15803d' : '#dc2626'
                          }}>
                            {f.status}
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
              Academic Reports
            </h2>
            {reportLoading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '40px',
                color: '#6b7280'
              }}>
                Loading reports...
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
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '150px' }}>STUDENT</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '100px' }}>GRADES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ 
                          padding: '20px', 
                          textAlign: 'center', 
                          color: '#6b7280',
                          fontStyle: 'italic'
                        }}>
                          No reports found.
                        </td>
                      </tr>
                    )}
                    {reports.map((r, idx) => (
                      <tr key={r.id || idx} style={{ 
                        borderBottom: '1px solid #e5e7eb',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '16px', fontWeight: '500' }}>{idx + 1}</td>
                        <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>{r.title}</td>
                        <td style={{ padding: '16px', color: '#2563eb' }}>{r.studentName}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            backgroundColor: '#dcfce7',
                            color: '#15803d'
                          }}>
                            {r.grades}
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
              Attendance Records
            </h2>
            {attendanceLoading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '40px',
                color: '#6b7280'
              }}>
                Loading attendance...
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
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '200px' }}>STUDENT</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '150px' }}>DATE</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', minWidth: '120px' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ 
                          padding: '20px', 
                          textAlign: 'center', 
                          color: '#6b7280',
                          fontStyle: 'italic'
                        }}>
                          No attendance records found.
                        </td>
                      </tr>
                    )}
                    {attendance.map((a, idx) => (
                      <tr key={a.id || idx} style={{ 
                        borderBottom: '1px solid #e5e7eb',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '16px', fontWeight: '500' }}>{idx + 1}</td>
                        <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>{a.studentName}</td>
                        <td style={{ padding: '16px', color: '#6b7280' }}>{a.date}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            backgroundColor: 
                              a.status?.toLowerCase() === 'present' ? '#dcfce7' :
                              a.status?.toLowerCase() === 'absent' ? '#fee2e2' :
                              '#fef3c7',
                            color: 
                              a.status?.toLowerCase() === 'present' ? '#15803d' :
                              a.status?.toLowerCase() === 'absent' ? '#dc2626' :
                              '#d97706'
                          }}>
                            {a.status}
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
    
    if (section === 'courses') {
      return (
        <div className="crud-table-card">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="table-title">Available Courses</h2>
            {courses.length === 0 ? (
              <div className="no-data-state">
                <div className="no-data-icon">📚</div>
                <div className="no-data-text">No courses available yet</div>
                <div className="no-data-subtext">Check back later for new courses</div>
              </div>
            ) : (
              <div className="course-cards-student">
                {courses.map((course) => (
                  <motion.div
                    key={course.id}
                    className="course-card-student"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  >
                    <div className="course-header-student">
                      <h3 className="course-title-student">{course.title}</h3>
                      <div className="course-price-student">${course.price}</div>
                    </div>
                    <p className="course-description-student">{course.description}</p>
                    <div className="course-footer-student">
                      <div className="course-duration-student">
                        <span className="duration-label">Duration:</span>
                        <span className="duration-value">{course.duration} weeks</span>
                      </div>
                      <button className="enroll-btn">Enroll Now</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      );
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" section={section} onSectionChange={setSection} />
      <div className="main-content">
        {/* Modern Header */}
        <header className="dashboard-header-bar">
          <div className="header-left">
            <img src={logoIcon} alt="Logo" className="header-logo" />
            <span className="header-appname">SMART SHIKSHA</span>
          </div>
          <div className="header-right">
            <span className="header-avatar">S</span>
          </div>
        </header>
        {/* Main Section */}
        <section className="dashboard-section">
          {renderSectionContent()}
        </section>
      </div>
      <footer className="dashboard-footer">
        Designed and Developed for Smart Shiksha
      </footer>
    </div>
  );
};

export default StudentDashboard;