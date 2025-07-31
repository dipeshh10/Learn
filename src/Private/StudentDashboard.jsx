import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Slidebar';
import logoIcon from '../assets/wow.png';
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
  const navigate = useNavigate();
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

  // Auth check on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (!user || !token || user.role !== 'student') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

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
  }, [section]);

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
          <h2>Welcome, Student!</h2>
          <div className="overview-cards">
            <div className="overview-card">
              <img src={claImg} alt="Reports" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }} />
              <h3>Reports</h3>
              <p>{reports.length}</p>
            </div>
            <div className="overview-card">
              <img src={leaImg} alt="Learning Materials" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }} />
              <h3>Learning Materials</h3>
              <p>{learningMaterials.length}</p>
            </div>
            <div className="overview-card">
              <img src={feeImg} alt="Unpaid Fees" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }} />
              <h3>Unpaid Fees</h3>
              <p>{fees.filter(f => f.status.toLowerCase() !== 'paid').length}</p>
            </div>
            <div className="overview-card">
              <img src={notiImg} alt="Active Notifications" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }} />
              <h3>Active Notifications</h3>
              <p>{notifications.length}</p>
            </div>
          </div>
          {/* Why SMART SHIKSHA Section */}
          <div className="why-smart-shiksha-section">
            <h2 style={{ textAlign: 'center', margin: '40px 0 20px' }}>Why SMART SHIKSHA?</h2>
            <div className="why-features-grid">
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
            <div className="features-grid">
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
        <div className="crud-table-card">
          <h2 className="table-title">Routine</h2>
          <div className="table-container">
            {routineLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="crud-table styled-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Day</th>
                    <th>Class</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {routines.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No routines found</td></tr>
                  ) : routines.map((r, idx) => (
                    <tr key={r.id}>
                      <td>{idx + 1}</td>
                      <td>{r.day}</td>
                      <td>{r.class}</td>
                      <td>{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }
    if (section === 'learning') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Learning Materials</h2>
          <div className="table-container">
            {learningLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="crud-table styled-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {learningMaterials.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No materials found</td></tr>
                  ) : learningMaterials.map((l, idx) => (
                    <tr key={l.id}>
                      <td>{idx + 1}</td>
                      <td>{l.title}</td>
                      <td>{l.type}</td>
                      <td>
                        <a href={l.link} target="_blank" rel="noopener noreferrer">
                          {l.type === 'PDF' ? 'View PDF' : 'Watch Video'}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }
    if (section === 'fees') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Fees</h2>
          <div className="table-container">
            {feeLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="crud-table styled-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No fees found</td></tr>
                  ) : fees.map((f, idx) => (
                    <tr key={f.id}>
                      <td>{idx + 1}</td>
                      <td>{f.studentName}</td>
                      <td>{f.amount}</td>
                      <td>
                        <span className={`status-badge ${f.status.toLowerCase() === 'paid' ? 'status-active' : 'status-inactive'}`}>
                          {f.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }
    if (section === 'reports') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Reports</h2>
          <div className="table-container">
            {reportLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="crud-table styled-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Student</th>
                    <th>Grades</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No reports found</td></tr>
                  ) : reports.map((r, idx) => (
                    <tr key={r.id}>
                      <td>{idx + 1}</td>
                      <td>{r.title}</td>
                      <td>{r.studentName}</td>
                      <td>{r.grades}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }
    if (section === 'attendance') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Attendance</h2>
          <div className="table-container">
            {attendanceLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="crud-table styled-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No attendance records found</td></tr>
                  ) : attendance.map((a, idx) => (
                    <tr key={a.id}>
                      <td>{idx + 1}</td>
                      <td>{a.studentName}</td>
                      <td>{a.date}</td>
                      <td>
                        <span className={`status-badge ${a.status.toLowerCase() === 'present' ? 'status-present' : a.status.toLowerCase() === 'absent' ? 'status-absent' : 'status-late'}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }
    if (section === 'notifications') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Notifications</h2>
          <div className="table-container">
            {notificationLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="crud-table styled-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center', color: '#888' }}>No notifications found</td></tr>
                  ) : notifications.map((n, idx) => (
                    <tr key={n.id}>
                      <td>{idx + 1}</td>
                      <td>{n.title}</td>
                      <td>{n.message}</td>
                      <td>{n.date}</td>
                      <td>
                        <span className={`status-badge priority-${n.priority.toLowerCase()}`}>
                          {n.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
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
      <Sidebar role="student" section={section} onSectionChange={setSection} onLogout={handleLogout} />
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