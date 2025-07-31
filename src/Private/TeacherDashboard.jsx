
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Slidebar';
import logoIcon from '../assets/wow.png';
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

  // Modal state for pop-ups
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Reports handlers
  const handleReportChange = (e) => setReportForm({ ...reportForm, [e.target.name]: e.target.value });

  // Attendance handlers

  // Students handlers
  const handleStudentEdit = (s) => { setStudentEditId(s.id); setStudentForm({ name: s.name, email: s.email, class: s.class }); };
  const handleStudentDelete = (id) => setStudents(students.filter((s) => s.id !== id));
  const handleStudentChange = (e) => setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  const handleStudentSave = () => { setStudents(students.map((s) => (s.id === studentEditId ? { ...s, ...studentForm } : s))); setStudentEditId(null); setStudentForm({ name: '', email: '', class: '' }); };
  const handleStudentAdd = () => { setStudents([...students, { id: Date.now(), ...studentForm }]); setStudentForm({ name: '', email: '', class: '' }); };

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
          <h2>Welcome, Teacher!</h2>
          <div className="overview-cards">
            <div className="overview-card">
              <img src={totImg} alt="Total Reports" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }} />
              <h3>Total Reports</h3>
              <p>{reports.length}</p>
            </div>
            <div className="overview-card">
              <img src={attImg} alt="Attendance Records" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }} />
              <h3>Attendance Records</h3>
              <p>{attendance.length}</p>
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
          {/* Features Section */}
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
    if (section === 'reports') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Manage Reports</h2>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r, idx) => (
                  <tr key={r.id}>
                    <td>{idx + 1}</td>
                    <td>{reportEditId === r.id ? (
                      <input value={reportForm.title} onChange={e => setReportForm({ ...reportForm, title: e.target.value })} />
                    ) : r.title}</td>
                    <td>{reportEditId === r.id ? (
                      <input value={reportForm.studentName} onChange={e => setReportForm({ ...reportForm, studentName: e.target.value })} />
                    ) : r.studentName}</td>
                    <td>{reportEditId === r.id ? (
                      <select value={reportForm.grades} onChange={e => setReportForm({ ...reportForm, grades: e.target.value })}>
                        <option value="">Select Grade</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                      </select>
                    ) : r.grades}</td>
                    <td>
                      {reportEditId === r.id ? (
                        <>
                          <button onClick={() => handleReportEdit(r.id)}>Save</button>
                          <button onClick={() => setReportEditId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="action-btn edit" title="Edit" onClick={() => {
                            setReportEditId(r.id);
                            setReportForm({ title: r.title, studentName: r.studentName, grades: r.grades });
                          }}><FaEdit /></button>
                          <button className="action-btn delete" title="Delete" onClick={() => handleReportDelete(r.id)}><FaTrash /></button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button className="add-btn" onClick={() => setShowReportModal(true)}>
            <span className="add-icon">➕</span>Add Report
          </button>
          <Modal isOpen={showReportModal} onClose={() => setShowReportModal(false)}>
            <div className="modal-content">
              <button className="modal-close-btn" onClick={() => setShowReportModal(false)} aria-label="Close">&times;</button>
              <div className="modal-header-title">Add Report</div>
              <div className="modal-body">
                <div className="modal-form-row">
                  <label htmlFor="reportTitle">Title</label>
                  <input id="reportTitle" className="modal-input" placeholder="Title" value={reportForm.title} onChange={e => setReportForm({ ...reportForm, title: e.target.value })} />
                </div>
                <div className="modal-form-row">
                  <label htmlFor="reportStudentName">Student Name</label>
                  <input id="reportStudentName" className="modal-input" placeholder="Student Name" value={reportForm.studentName} onChange={e => setReportForm({ ...reportForm, studentName: e.target.value })} />
                </div>
                <div className="modal-form-row">
                  <label htmlFor="reportGrades">Grades</label>
                  <select id="reportGrades" className="modal-input" value={reportForm.grades} onChange={e => setReportForm({ ...reportForm, grades: e.target.value })}>
                    <option value="">Select Grade</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="modal-btn cancel-btn" onClick={() => setShowReportModal(false)}>Cancel</button>
                <button className="modal-btn primary-btn" onClick={() => { handleReportAdd(); setShowReportModal(false); }} disabled={!reportForm.title || !reportForm.studentName || !reportForm.grades}>Add Report</button>
              </div>
            </div>
          </Modal>
        </div>
      );
    }
    if (section === 'attendance') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Attendance</h2>
          <Modal isOpen={showAttendanceModal} onClose={() => setShowAttendanceModal(false)}>
            <div className="modal-content">
              <button className="modal-close-btn" onClick={() => setShowAttendanceModal(false)} aria-label="Close">&times;</button>
              <div className="modal-header-title">Add New Attendance Record</div>
              <div className="modal-body">
                <div className="modal-form-row">
                  <label htmlFor="attendanceStudentName">Student</label>
                  <input id="attendanceStudentName" className="modal-input" type="text" name="studentName" placeholder="Student" value={attendanceForm.studentName} onChange={e => setAttendanceForm({ ...attendanceForm, studentName: e.target.value })} />
                </div>
                <div className="modal-form-row">
                  <label htmlFor="attendanceDate">Date</label>
                  <input id="attendanceDate" className="modal-input" type="date" name="date" placeholder="Date" value={attendanceForm.date} onChange={e => setAttendanceForm({ ...attendanceForm, date: e.target.value })} />
                </div>
                <div className="modal-form-row">
                  <label htmlFor="attendanceStatus">Status</label>
                  <select id="attendanceStatus" className="modal-input" name="status" value={attendanceForm.status} onChange={e => setAttendanceForm({ ...attendanceForm, status: e.target.value })}>
                    <option value="">Select Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="modal-btn cancel-btn" onClick={() => setShowAttendanceModal(false)}>Cancel</button>
                <button className="modal-btn primary-btn" onClick={() => { handleAttendanceAdd(); setShowAttendanceModal(false); }} disabled={!attendanceForm.studentName || !attendanceForm.date || !attendanceForm.status}>
                  Add Attendance
                </button>
              </div>
            </div>
          </Modal>
          <table className="crud-table styled-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a.id}>
                  <td>{attendanceEditId === a.id ? (
                    <input type="text" name="studentName" value={attendanceForm.studentName} onChange={e => setAttendanceForm({ ...attendanceForm, studentName: e.target.value })} />
                  ) : a.studentName}</td>
                  <td>{attendanceEditId === a.id ? (
                    <input type="date" name="date" value={attendanceForm.date} onChange={e => setAttendanceForm({ ...attendanceForm, date: e.target.value })} />
                  ) : a.date}</td>
                  <td>{attendanceEditId === a.id ? (
                    <select className="modal-input" name="status" value={attendanceForm.status} onChange={e => setAttendanceForm({ ...attendanceForm, status: e.target.value })}>
                      <option value="">Select Status</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  ) : (
                    <span className={`status-badge ${a.status.toLowerCase() === 'present' ? 'status-active' : 'status-inactive'}`}>
                      {a.status}
                    </span>
                  )}</td>
                  <td>
                    {attendanceEditId === a.id ? (
                      <button className="save-btn" onClick={() => handleAttendanceEdit(a.id)}>Save</button>
                    ) : (
                      <>
                        <button className="action-btn edit" title="Edit" onClick={() => { setAttendanceEditId(a.id); setAttendanceForm({ studentName: a.studentName, date: a.date, status: a.status }); }}><FaEdit /></button>
                        <button className="action-btn delete" title="Delete" onClick={() => handleAttendanceDelete(a.id)}><FaTrash /></button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-btn" onClick={() => setShowAttendanceModal(true)}>
            <span className="add-icon">➕</span>Add Attendance
          </button>
        </div>
      );
    }
    if (section === 'notifications') {
      return (
        <div className="crud-table-card">
          <h2 className="table-title">Notifications</h2>
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
                {notifications.map((n, idx) => (
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
      );
    }
    if (section === 'students') {
      if (role === 'admin') {
        // CRUD table for admin
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Students</h2>
            <Modal isOpen={showStudentModal} onClose={() => setShowStudentModal(false)}>
              <div className="modal-content">
                <button className="modal-close-btn" onClick={() => setShowStudentModal(false)} aria-label="Close">&times;</button>
                <div className="modal-header-title">Add New Student</div>
                <div className="modal-body">
                  <div className="modal-form-row">
                    <label htmlFor="studentName">Name</label>
                    <input id="studentName" className="modal-input" type="text" name="name" placeholder="Name" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} />
                  </div>
                  <div className="modal-form-row">
                    <label htmlFor="studentEmail">Email</label>
                    <input id="studentEmail" className="modal-input" type="email" name="email" placeholder="Email" value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} />
                  </div>
                  <div className="modal-form-row">
                    <label htmlFor="studentClass">Class</label>
                    <input id="studentClass" className="modal-input" type="text" name="class" placeholder="Class" value={studentForm.class} onChange={e => setStudentForm({ ...studentForm, class: e.target.value })} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="modal-btn cancel-btn" onClick={() => setShowStudentModal(false)}>Cancel</button>
                  <button className="modal-btn primary-btn" onClick={() => { handleStudentAdd(); setShowStudentModal(false); }} disabled={!studentForm.name || !studentForm.email || !studentForm.class}>
                    Add Student
                  </button>
                </div>
              </div>
            </Modal>
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{studentEditId === student.id ? (
                      <input type="text" name="name" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} />
                    ) : student.name}</td>
                    <td>{studentEditId === student.id ? (
                      <input type="email" name="email" value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} />
                    ) : student.email}</td>
                    <td>{studentEditId === student.id ? (
                      <input type="text" name="class" value={studentForm.class} onChange={e => setStudentForm({ ...studentForm, class: e.target.value })} />
                    ) : student.class}</td>
                    <td>
                      {studentEditId === student.id ? (
                        <button className="save-btn" onClick={() => {
                          handleStudentSave();
                          setStudentEditId(null);
                          setStudentForm({ name: '', email: '', class: '' });
                        }}>Save</button>
                      ) : (
                        <>
                          <button className="action-btn edit" title="Edit" onClick={() => { setStudentEditId(student.id); setStudentForm({ name: student.name, email: student.email, class: student.class }); }}><FaEdit /></button>
                          <button className="action-btn delete" title="Delete" onClick={() => handleStudentDelete(student.id)}><FaTrash /></button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setShowStudentModal(true)}>
              <span className="add-icon">➕</span>Add Student
            </button>
          </div>
        );
      } else {
        // View-only table for teacher
        return (
          <div className="crud-table-card">
            <h2 className="table-title">Students</h2>
            <table className="crud-table styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                    <td>{student.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
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
            <span className="header-appname">SMART SHIKSHA</span>
          </div>
          <div className="header-right">
            <span className="header-avatar">T</span>
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

