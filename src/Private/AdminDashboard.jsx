import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from '../components/Slidebar';
import logoIcon from '../assets/wow.png';
import '../Style/AdminDashboard.css'; // Make sure to include premium CSS with glassmorphic effects and animations
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from "../Services/studentApi";
import {
  fetchRoutines,
  addRoutine,
  updateRoutine,
  deleteRoutine
} from "../Services/routineApi";
import {
  fetchLearningMaterials,
  addLearningMaterial,
  updateLearningMaterial,
  deleteLearningMaterial
} from "../Services/learningMaterialApi";
import {
  fetchFees,
  addFee,
  updateFee,
  deleteFee
} from "../Services/feeApi";
import {
  fetchNotifications,
  addNotification,
  updateNotification,
  deleteNotification
} from "../Services/notificationApi";
import { FaEdit, FaTrash } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onClick={e => { if (e.target.classList.contains('modal-overlay')) onClose(); }}
        >
          <motion.div
            className="modal-content glass"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">&times;</button>
            <h2 className="modal-header-title">{title}</h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LearnX() {
  const [section, setSection] = useState('home');

  // Students states
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [studentForm, setStudentForm] = useState({ fullName: "", email: "", class: "" });
  const [studentEditId, setStudentEditId] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [studentError, setStudentError] = useState('');

  // Routines states
  const [routines, setRoutines] = useState([]);
  const [loadingRoutines, setLoadingRoutines] = useState(false);
  const [routineForm, setRoutineForm] = useState({ day: "", class: "", time: "" });
  const [routineEditId, setRoutineEditId] = useState(null);
  const [showAddRoutineModal, setShowAddRoutineModal] = useState(false);
  const [showEditRoutineModal, setShowEditRoutineModal] = useState(false);
  const [routineError, setRoutineError] = useState('');

  // Learning materials states
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [loadingLearning, setLoadingLearning] = useState(false);
  const [learningForm, setLearningForm] = useState({ title: "", type: "", link: "" });
  const [learningEditId, setLearningEditId] = useState(null);
  const [showAddLearningModal, setShowAddLearningModal] = useState(false);
  const [showEditLearningModal, setShowEditLearningModal] = useState(false);
  const [learningError, setLearningError] = useState('');

  // Fees states
  const [fees, setFees] = useState([]);
  const [loadingFees, setLoadingFees] = useState(false);
  const [feeForm, setFeeForm] = useState({ studentName: "", amount: "", status: "" });
  const [feeEditId, setFeeEditId] = useState(null);
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [showEditFeeModal, setShowEditFeeModal] = useState(false);
  const [feeError, setFeeError] = useState('');

  // Notifications states
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notificationForm, setNotificationForm] = useState({ title: "", message: "", date: "", priority: "" });
  const [notificationEditId, setNotificationEditId] = useState(null);
  const [showAddNotificationModal, setShowAddNotificationModal] = useState(false);
  const [showEditNotificationModal, setShowEditNotificationModal] = useState(false);
  const [notificationError, setNotificationError] = useState('');

  // Load data for selected section
  useEffect(() => {
    switch (section) {
      case 'students': loadStudents(); break;
      case 'routine': loadRoutines(); break;
      case 'learning': loadLearningMaterials(); break;
      case 'fees': loadFees(); break;
      case 'notifications': loadNotifications(); break;
      default: break;
    }
  }, [section]);

  // STUDENTS CRUD

  const loadStudents = async () => {
    setLoadingStudents(true);
    try {
      const data = await fetchStudents();
      setStudents(data || []);
    } catch (e) {
      alert("Error loading students: " + e.message);
    }
    setLoadingStudents(false);
  };

  const validateStudentForm = () => {
    if (!studentForm.fullName || !studentForm.email || !studentForm.class) {
      setStudentError("Please fill all fields");
      return false;
    }
    if (!isValidEmail(studentForm.email)) {
      setStudentError("Invalid email address");
      return false;
    }
    setStudentError("");
    return true;
  };

  const handleAddStudent = async () => {
    if (!validateStudentForm()) return;
    try {
      await addStudent(studentForm);
      setShowAddStudentModal(false);
      loadStudents();
      setStudentForm({ fullName: "", email: "", class: "" });
    } catch (e) {
      setStudentError(e.message);
    }
  };

  const handleEditStudent = async () => {
    if (!validateStudentForm()) return;
    try {
      await updateStudent(studentEditId, studentForm);
      setShowEditStudentModal(false);
      loadStudents();
      setStudentForm({ fullName: "", email: "", class: "" });
      setStudentEditId(null);
    } catch (e) {
      setStudentError(e.message);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (e) {
      alert(e.message);
    }
  };

  // ROUTINES CRUD

  const loadRoutines = async () => {
    setLoadingRoutines(true);
    try {
      const data = await fetchRoutines();
      setRoutines(data || []);
    } catch (e) {
      alert("Error loading routines: " + e.message);
    }
    setLoadingRoutines(false);
  };

  const validateRoutineForm = () => {
    if (!routineForm.day || !routineForm.class || !routineForm.time) {
      setRoutineError("Please fill all fields");
      return false;
    }
    setRoutineError("");
    return true;
  };

  const handleAddRoutine = async () => {
    if (!validateRoutineForm()) return;
    try {
      await addRoutine(routineForm);
      setShowAddRoutineModal(false);
      loadRoutines();
      setRoutineForm({ day: "", class: "", time: "" });
    } catch (e) {
      setRoutineError(e.message);
    }
  };

  const handleEditRoutine = async () => {
    if (!validateRoutineForm()) return;
    try {
      await updateRoutine(routineEditId, routineForm);
      setShowEditRoutineModal(false);
      loadRoutines();
      setRoutineForm({ day: "", class: "", time: "" });
      setRoutineEditId(null);
    } catch (e) {
      setRoutineError(e.message);
    }
  };

  const handleDeleteRoutine = async (id) => {
    if (!window.confirm("Delete this routine?")) return;
    try {
      await deleteRoutine(id);
      loadRoutines();
    } catch (e) {
      alert(e.message);
    }
  };

  // LEARNING MATERIALS CRUD

  const loadLearningMaterials = async () => {
    setLoadingLearning(true);
    try {
      const data = await fetchLearningMaterials();
      setLearningMaterials(data || []);
    } catch (e) {
      alert("Error loading learning materials: " + e.message);
    }
    setLoadingLearning(false);
  };

  const validateLearningForm = () => {
    if (!learningForm.title || !learningForm.type || !learningForm.link) {
      setLearningError("Please fill all fields");
      return false;
    }
    setLearningError("");
    return true;
  };

  const handleAddLearning = async () => {
    if (!validateLearningForm()) return;
    try {
      await addLearningMaterial(learningForm);
      setShowAddLearningModal(false);
      loadLearningMaterials();
      setLearningForm({ title: "", type: "", link: "" });
    } catch (e) {
      setLearningError(e.message);
    }
  };

  const handleEditLearning = async () => {
    if (!validateLearningForm()) return;
    try {
      await updateLearningMaterial(learningEditId, learningForm);
      setShowEditLearningModal(false);
      loadLearningMaterials();
      setLearningForm({ title: "", type: "", link: "" });
      setLearningEditId(null);
    } catch (e) {
      setLearningError(e.message);
    }
  };

  const handleDeleteLearning = async (id) => {
    if (!window.confirm("Delete this learning material?")) return;
    try {
      await deleteLearningMaterial(id);
      loadLearningMaterials();
    } catch (e) {
      alert(e.message);
    }
  };

  // FEES CRUD

  const loadFees = async () => {
    setLoadingFees(true);
    try {
      const data = await fetchFees();
      setFees(data || []);
    } catch (e) {
      alert("Error loading fees: " + e.message);
    }
    setLoadingFees(false);
  };

  const validateFeeForm = () => {
    if (!feeForm.studentName || !feeForm.amount || !feeForm.status) {
      setFeeError("Please fill all fields");
      return false;
    }
    if (isNaN(Number(feeForm.amount)) || Number(feeForm.amount) <= 0) {
      setFeeError("Amount must be a positive number");
      return false;
    }
    setFeeError("");
    return true;
  };

  const handleAddFee = async () => {
    if (!validateFeeForm()) return;
    try {
      await addFee({
        studentName: feeForm.studentName,
        amount: Number(feeForm.amount),
        status: feeForm.status
      });
      setShowAddFeeModal(false);
      loadFees();
      setFeeForm({ studentName: "", amount: "", status: "" });
    } catch (e) {
      setFeeError(e.message);
    }
  };

  const handleEditFee = async () => {
    if (!validateFeeForm()) return;
    try {
      await updateFee(feeEditId, {
        studentName: feeForm.studentName,
        amount: Number(feeForm.amount),
        status: feeForm.status
      });
      setShowEditFeeModal(false);
      loadFees();
      setFeeForm({ studentName: "", amount: "", status: "" });
      setFeeEditId(null);
    } catch (e) {
      setFeeError(e.message);
    }
  };

  const handleDeleteFee = async (id) => {
    if (!window.confirm("Delete this fee?")) return;
    try {
      await deleteFee(id);
      loadFees();
    } catch (e) {
      alert(e.message);
    }
  };

  // NOTIFICATIONS CRUD

  const loadNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const data = await fetchNotifications();
      setNotifications(data || []);
    } catch (e) {
      alert("Error loading notifications: " + e.message);
    }
    setLoadingNotifications(false);
  };

  const validateNotificationForm = () => {
    if (!notificationForm.title || !notificationForm.message || !notificationForm.date || !notificationForm.priority) {
      setNotificationError("Please fill all fields");
      return false;
    }
    setNotificationError("");
    return true;
  };

  const handleAddNotification = async () => {
    if (!validateNotificationForm()) return;
    try {
      await addNotification(notificationForm);
      setShowAddNotificationModal(false);
      loadNotifications();
      setNotificationForm({ title: "", message: "", date: "", priority: "" });
    } catch (e) {
      setNotificationError(e.message);
    }
  };

  const handleEditNotification = async () => {
    if (!validateNotificationForm()) return;
    try {
      await updateNotification(notificationEditId, notificationForm);
      setShowEditNotificationModal(false);
      loadNotifications();
      setNotificationForm({ title: "", message: "", date: "", priority: "" });
      setNotificationEditId(null);
    } catch (e) {
      setNotificationError(e.message);
    }
  };

  const handleDeleteNotification = async (id) => {
    if (!window.confirm("Delete this notification?")) return;
    try {
      await deleteNotification(id);
      loadNotifications();
    } catch (e) {
      alert(e.message);
    }
  };

  // Render functions per section

  const renderHome = () => (
    <div className="dashboard-overview">
      <h2>Welcome, Admin!</h2>
      <div className="overview-cards">
        <div className="overview-card">
          <img src={require('../assets/std.png')} alt="Total Students" />
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>
        <div className="overview-card">
          <img src={require('../assets/tea.png')} alt="Classes" />
          <h3>Students</h3>
          <p>{students.length}</p>
        </div>
        <div className="overview-card">
          <img src={require('../assets/fee.png')} alt="Fees" />
          <h3>Fees</h3>
          <p>{fees.length}</p>
        </div>
        <div className="overview-card">
          <img src={require('../assets/noti.png')} alt="Notifications" />
          <h3>Notifications</h3>
          <p>{notifications.length}</p>
        </div>
      </div>
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
    </div>
  );

  // Students Section
  const renderStudents = () => (
    <motion.div
      key="students-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="crud-table-card"
    >
      <h2 className="table-title">Manage Students</h2>
      {loadingStudents ? <p>Loading...</p> : (
        <>
          <table className="crud-table styled-table" aria-label="Students Table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>No students found</td></tr>}
              {students.map((s, idx) => (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td>{s.fullName}</td>
                  <td>{s.email}</td>
                  <td>{s.class}</td>
                  <td>
                    <button
                      onClick={() => {
                        setStudentEditId(s.id);
                        setStudentForm({
                          fullName: s.fullName,
                          email: s.email,
                          class: s.class
                        });
                        setShowEditStudentModal(true);
                        setStudentError('');
                      }}
                      className="action-btn edit"
                      title={`Edit ${s.fullName}`}
                      aria-label={`Edit ${s.fullName}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(s.id)}
                      className="action-btn delete"
                      title={`Delete ${s.fullName}`}
                      aria-label={`Delete ${s.fullName}`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-btn" onClick={() => { setShowAddStudentModal(true); setStudentError(''); }}>
            <span className="add-icon">➕</span> Add Student
          </button>

          {/* Add Student Modal */}
          <Modal isOpen={showAddStudentModal} onClose={() => setShowAddStudentModal(false)} title="Add Student">
            <form onSubmit={e => { e.preventDefault(); handleAddStudent(); }} className="modal-form" noValidate>
              <div className="modal-form-row">
                <label htmlFor="addFullName">Full Name</label>
                <input
                  id="addFullName"
                  name="fullName"
                  value={studentForm.fullName}
                  onChange={e => setStudentForm({ ...studentForm, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addEmail">Email</label>
                <input
                  id="addEmail"
                  name="email"
                  type="email"
                  value={studentForm.email}
                  onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addClass">Class</label>
                <input
                  id="addClass"
                  name="class"
                  value={studentForm.class}
                  onChange={e => setStudentForm({ ...studentForm, class: e.target.value })}
                  required
                />
              </div>
              {studentError && <p className="error-message">{studentError}</p>}
              <div className="modal-footer">
                <button type="button" className="modal-btn cancel-btn" onClick={() => setShowAddStudentModal(false)}>Cancel</button>
                <button
                  type="submit"
                  className="modal-btn primary-btn"
                  disabled={!studentForm.fullName || !studentForm.email || !studentForm.class || !isValidEmail(studentForm.email)}
                >
                  Add Student
                </button>
              </div>
            </form>
          </Modal>

          {/* Edit Student Modal */}
          <Modal isOpen={showEditStudentModal} onClose={() => { setShowEditStudentModal(false); setStudentError(''); }}>
            <form onSubmit={e => { e.preventDefault(); handleEditStudent(); }} className="modal-form" noValidate>
              <div className="modal-form-row">
                <label htmlFor="editFullName">Full Name</label>
                <input
                  id="editFullName"
                  name="fullName"
                  value={studentForm.fullName}
                  onChange={e => setStudentForm({ ...studentForm, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editEmail">Email</label>
                <input
                  id="editEmail"
                  name="email"
                  type="email"
                  value={studentForm.email}
                  onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editClass">Class</label>
                <input
                  id="editClass"
                  name="class"
                  value={studentForm.class}
                  onChange={e => setStudentForm({ ...studentForm, class: e.target.value })}
                  required
                />
              </div>
              {studentError && <p className="error-message">{studentError}</p>}
              <div className="modal-footer">
                <button type="button" className="modal-btn cancel-btn" onClick={() => setShowEditStudentModal(false)}>Cancel</button>
                <button
                  type="submit"
                  className="modal-btn primary-btn"
                  disabled={!studentForm.fullName || !studentForm.email || !studentForm.class || !isValidEmail(studentForm.email)}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </motion.div>
  );

  // Routines section
  const renderRoutines = () => (
    <motion.div
      key="routine-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="crud-table-card"
    >
      <h2 className="table-title">Manage Routines</h2>
      {loadingRoutines ? <p>Loading...</p> : (
        <>
          <table className="crud-table styled-table" aria-label="Routines Table">
            <thead>
              <tr>
                <th>#</th>
                <th>Day</th>
                <th>Class</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routines.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>No routines found</td></tr>}
              {routines.map((r, idx) => (
                <tr key={r.id}>
                  <td>{idx + 1}</td>
                  <td>{r.day}</td>
                  <td>{r.class}</td>
                  <td>{r.time}</td>
                  <td>
                    <button
                      onClick={() => {
                        setRoutineEditId(r.id);
                        setRoutineForm({ day: r.day, class: r.class, time: r.time });
                        setShowEditRoutineModal(true);
                        setRoutineError('');
                      }}
                      className="action-btn edit"
                      title={`Edit routine for ${r.day}`}
                      aria-label={`Edit routine for ${r.day}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteRoutine(r.id)}
                      className="action-btn delete"
                      title={`Delete routine for ${r.day}`}
                      aria-label={`Delete routine for ${r.day}`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-btn" onClick={() => { setShowAddRoutineModal(true); setRoutineError(''); }}>
            <span className="add-icon">➕</span> Add Routine
          </button>

          {/* Add Routine Modal */}
          <Modal isOpen={showAddRoutineModal} onClose={() => setShowAddRoutineModal(false)} title="Add Routine">
            <form onSubmit={e => { e.preventDefault(); handleAddRoutine(); }} className="modal-form" noValidate>
              <div className="modal-form-row">
                <label htmlFor="addRoutineDay">Day</label>
                <select
                  id="addRoutineDay"
                  name="day"
                  value={routineForm.day}
                  onChange={e => setRoutineForm({ ...routineForm, day: e.target.value })}
                  required
                >
                  <option value="">Select Day</option>
                  {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="modal-form-row">
                <label htmlFor="addRoutineClass">Class</label>
                <input
                  id="addRoutineClass"
                  name="class"
                  value={routineForm.class}
                  onChange={e => setRoutineForm({ ...routineForm, class: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addRoutineTime">Time</label>
                <input
                  id="addRoutineTime"
                  name="time"
                  type="time"
                  value={routineForm.time}
                  onChange={e => setRoutineForm({ ...routineForm, time: e.target.value })}
                  required
                />
              </div>
              {routineError && <p className="error-message">{routineError}</p>}
              <div className="modal-footer">
                <button type="button" className="modal-btn cancel-btn" onClick={() => setShowAddRoutineModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn primary-btn" disabled={!routineForm.day || !routineForm.class || !routineForm.time}>Add Routine</button>
              </div>
            </form>
          </Modal>

          {/* Edit Routine Modal */}
          <Modal isOpen={showEditRoutineModal} onClose={() => { setShowEditRoutineModal(false); setRoutineError(''); }}>
            <form onSubmit={e => { e.preventDefault(); handleEditRoutine(); }} className="modal-form" noValidate>
              <div className="modal-form-row">
                <label htmlFor="editRoutineDay">Day</label>
                <select
                  id="editRoutineDay"
                  name="day"
                  value={routineForm.day}
                  onChange={e => setRoutineForm({ ...routineForm, day: e.target.value })}
                  required
                >
                  <option value="">Select Day</option>
                  {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="modal-form-row">
                <label htmlFor="editRoutineClass">Class</label>
                <input
                  id="editRoutineClass"
                  name="class"
                  value={routineForm.class}
                  onChange={e => setRoutineForm({ ...routineForm, class: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editRoutineTime">Time</label>
                <input
                  id="editRoutineTime"
                  name="time"
                  type="time"
                  value={routineForm.time}
                  onChange={e => setRoutineForm({ ...routineForm, time: e.target.value })}
                  required
                />
              </div>
              {routineError && <p className="error-message">{routineError}</p>}
              <div className="modal-footer">
                <button type="button" className="modal-btn cancel-btn" onClick={() => setShowEditRoutineModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn primary-btn" disabled={!routineForm.day || !routineForm.class || !routineForm.time}>Save Changes</button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </motion.div>
  );

  // LEARNING MATERIALS section
  const renderLearningMaterials = () => (
    <motion.div
      key="learning-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="crud-table-card"
    >
      <h2 className="table-title">Manage Learning Materials</h2>
      {loadingLearning ? <p>Loading...</p> : (
        <>
          <table className="crud-table styled-table" aria-label="Learning Materials Table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {learningMaterials.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>No learning materials found</td></tr>}
              {learningMaterials.map((l, idx) => (
                <tr key={l.id}>
                  <td>{idx + 1}</td>
                  <td>{l.title}</td>
                  <td>{l.type}</td>
                  <td><a href={l.link} target="_blank" rel="noopener noreferrer">{l.link}</a></td>
                  <td>
                    <button
                      onClick={() => {
                        setLearningEditId(l.id);
                        setLearningForm({ title: l.title, type: l.type, link: l.link });
                        setShowEditLearningModal(true);
                        setLearningError('');
                      }}
                      className="action-btn edit"
                      title={`Edit material ${l.title}`}
                      aria-label={`Edit material ${l.title}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteLearning(l.id)}
                      className="action-btn delete"
                      title={`Delete material ${l.title}`}
                      aria-label={`Delete material ${l.title}`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-btn" onClick={() => { setShowAddLearningModal(true); setLearningError(''); }}>
            <span className="add-icon">➕</span> Add Learning Material
          </button>

          {/* Add Learning Modal */}
          <Modal isOpen={showAddLearningModal} onClose={() => setShowAddLearningModal(false)} title="Add Learning Material">
            <form onSubmit={e => { e.preventDefault(); handleAddLearning(); }} className="modal-form" noValidate>
              <div className="modal-form-row">
                <label htmlFor="addLearningTitle">Title</label>
                <input
                  id="addLearningTitle"
                  name="title"
                  value={learningForm.title}
                  onChange={e => setLearningForm({ ...learningForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addLearningType">Type</label>
                <select
                  id="addLearningType"
                  name="type"
                  value={learningForm.type}
                  onChange={e => setLearningForm({ ...learningForm, type: e.target.value })}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="PDF">PDF</option>
                  <option value="Video">Video</option>
                  <option value="Link">Link</option>
                </select>
              </div>
              <div className="modal-form-row">
                <label htmlFor="addLearningLink">Link</label>
                <input
                  id="addLearningLink"
                  name="link"
                  value={learningForm.link}
                  onChange={e => setLearningForm({ ...learningForm, link: e.target.value })}
                  required
                />
              </div>
              {learningError && <p className="error-message">{learningError}</p>}
              <div className="modal-footer">
                <button type="button" className="modal-btn cancel-btn" onClick={() => setShowAddLearningModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn primary-btn" disabled={!learningForm.title || !learningForm.type || !learningForm.link}>Add Material</button>
              </div>
            </form>
          </Modal>

          {/* Edit Learning Modal */}
          <Modal isOpen={showEditLearningModal} onClose={() => { setShowEditLearningModal(false); setLearningError(''); }}>
            <form onSubmit={e => { e.preventDefault(); handleEditLearning(); }} className="modal-form" noValidate>
              <div className="modal-form-row">
                <label htmlFor="editLearningTitle">Title</label>
                <input
                  id="editLearningTitle"
                  name="title"
                  value={learningForm.title}
                  onChange={e => setLearningForm({ ...learningForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editLearningType">Type</label>
                <select
                  id="editLearningType"
                  name="type"
                  value={learningForm.type}
                  onChange={e => setLearningForm({ ...learningForm, type: e.target.value })}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="PDF">PDF</option>
                  <option value="Video">Video</option>
                  <option value="Link">Link</option>
                </select>
              </div>
              <div className="modal-form-row">
                <label htmlFor="editLearningLink">Link</label>
                <input
                  id="editLearningLink"
                  name="link"
                  value={learningForm.link}
                  onChange={e => setLearningForm({ ...learningForm, link: e.target.value })}
                  required
                />
              </div>
              {learningError && <p className="error-message">{learningError}</p>}
              <div className="modal-footer">
                <button type="button" className="modal-btn cancel-btn" onClick={() => setShowEditLearningModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn primary-btn" disabled={!learningForm.title || !learningForm.type || !learningForm.link}>Save Changes</button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </motion.div>
  );

  // FEES section
  const renderFees = () => (
    <motion.div
      key="fees-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="crud-table-card"
    >
      <h2 className="table-title">Manage Fees</h2>
      {loadingFees ? <p>Loading...</p> : (
        <>
          <table className="crud-table styled-table" aria-label="Fees Table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>No fees found</td></tr>}
              {fees.map((f, idx) => (
                <tr key={f.id}>
                  <td>{idx + 1}</td>
                  <td>{f.studentName}</td>
                  <td>{f.amount}</td>
                  <td>{f.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setFeeEditId(f.id);
                        setFeeForm({ studentName: f.studentName, amount: f.amount.toString(), status: f.status });
                        setShowEditFeeModal(true);
                        setFeeError('');
                      }}
                      className="action-btn edit"
                      title={`Edit fee for ${f.studentName}`}
                      aria-label={`Edit fee for ${f.studentName}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteFee(f.id)}
                      className="action-btn delete"
                      title={`Delete fee for ${f.studentName}`}
                      aria-label={`Delete fee for ${f.studentName}`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-btn" onClick={() => { setShowAddFeeModal(true); setFeeError(''); }}>
            <span className="add-icon">➕</span> Add Fee
          </button>

          {/* Add Fee Modal */}
          <Modal isOpen={showAddFeeModal} onClose={() => setShowAddFeeModal(false)} title="Add Fee">
            <form onSubmit={e => { e.preventDefault(); handleAddFee(); }} className="modal-form" noValidate>
              <div className="modal-form-row">
                <label htmlFor="addFeeStudentName">Student Name</label>
                <input
                  id="addFeeStudentName"
                  name="studentName"
                  value={feeForm.studentName}
                  onChange={e => setFeeForm({ ...feeForm, studentName: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addFeeAmount">Amount</label>
                <input
                  id="addFeeAmount"
                  name="amount"
                  type="number"
                  min="0"
                  value={feeForm.amount}
                  onChange={e => setFeeForm({ ...feeForm, amount: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addFeeStatus">Status</label>
                <select
                  id="addFeeStatus"
                  name="status"
                  value={feeForm.status}
                  onChange={e => setFeeForm({ ...feeForm, status: e.target.value })}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              {feeError && <p className="error-message">{feeError}</p>}
              <div className="modal-footer">
                <button type="button" className="modal-btn cancel-btn" onClick={() => setShowAddFeeModal(false)}>Cancel</button>
                <button
                  type="submit"
                  className="modal-btn primary-btn"
                  disabled={!feeForm.studentName || !feeForm.amount || !feeForm.status || isNaN(Number(feeForm.amount)) || Number(feeForm.amount) <= 0}
                >
                  Add Fee
                </button>
              </div>
            </form>
          </Modal>

          {/* Edit Fee Modal */}
          <Modal isOpen={showEditFeeModal} onClose={() => { setShowEditFeeModal(false); setFeeError(''); }}>
            <form onSubmit={e => { e.preventDefault(); handleEditFee(); }} className="modal-form" noValidate>
              <div className="modal-form-row">
                <label htmlFor="editFeeStudentName">Student Name</label>
                <input
                  id="editFeeStudentName"
                  name="studentName"
                  value={feeForm.studentName}
                  onChange={e => setFeeForm({ ...feeForm, studentName: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editFeeAmount">Amount</label>
                <input
                  id="editFeeAmount"
                  name="amount"
                  type="number"
                  min="0"
                  value={feeForm.amount}
                  onChange={e => setFeeForm({ ...feeForm, amount: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editFeeStatus">Status</label>
                <select
                  id="editFeeStatus"
                  name="status"
                  value={feeForm.status}
                  onChange={e => setFeeForm({ ...feeForm, status: e.target.value })}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              {feeError && <p className="error-message">{feeError}</p>}
              <div className="modal-footer">
                <button type="button" className="modal-btn cancel-btn" onClick={() => setShowEditFeeModal(false)}>Cancel</button>
                <button
                  type="submit"
                  className="modal-btn primary-btn"
                  disabled={!feeForm.studentName || !feeForm.amount || !feeForm.status || isNaN(Number(feeForm.amount)) || Number(feeForm.amount) <= 0}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </motion.div>
  );

  // NOTIFICATIONS section
  const renderNotifications = () => (
    <motion.div
      key="notifications-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="crud-table-card"
    >
      <h2 className="table-title">Manage Notifications</h2>
      {loadingNotifications ? <p>Loading...</p> : (
        <>
          <table className="crud-table styled-table" aria-label="Notifications Table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Message</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>No notifications found</td></tr>}
              {notifications.map((n, idx) => (
                <tr key={n.id}>
                  <td>{idx + 1}</td>
                  <td>{n.title}</td>
                  <td>{n.message}</td>
                  <td>{n.date}</td>
                  <td>{n.priority}</td>
                  <td>
                    <button
                      onClick={() => {
                        setNotificationEditId(n.id);
                        setNotificationForm({ title: n.title, message: n.message, date: n.date, priority: n.priority });
                        setShowEditNotificationModal(true);
                        setNotificationError('');
                      }}
                      className="action-btn edit"
                      title={`Edit notification ${n.title}`}
                      aria-label={`Edit notification ${n.title}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteNotification(n.id)}
                      className="action-btn delete"
                      title={`Delete notification ${n.title}`}
                      aria-label={`Delete notification ${n.title}`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-btn" onClick={() => { setShowAddNotificationModal(true); setNotificationError(''); }}>
            <span className="add-icon">➕</span> Add Notification
          </button>

          {/* Add Notification Modal */}
          <Modal isOpen={showAddNotificationModal} onClose={() => setShowAddNotificationModal(false)} title="Send Notification">
            <form onSubmit={e => { e.preventDefault(); handleAddNotification(); }} className="modal-form" noValidate>
              <div className="modal-form-row">
                <label htmlFor="addNotificationTitle">Title</label>
                <input
                  id="addNotificationTitle"
                  name="title"
                  value={notificationForm.title}
                  onChange={e => setNotificationForm({ ...notificationForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addNotificationMessage">Message</label>
                <textarea
                  id="addNotificationMessage"
                  name="message"
                  value={notificationForm.message}
                  onChange={e => setNotificationForm({ ...notificationForm, message: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addNotificationDate">Date</label>
                <input
                  id="addNotificationDate"
                  type="date"
                  name="date"
                  value={notificationForm.date}
                  onChange={e => setNotificationForm({ ...notificationForm, date: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="addNotificationPriority">Priority</label>
                <select
                  id="addNotificationPriority"
                  name="priority"
                  value={notificationForm.priority}
                  onChange={e => setNotificationForm({ ...notificationForm, priority: e.target.value })}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              {notificationError && <p className="error-message">{notificationError}</p>}
              <div className="modal-footer">
                <button type="button" className="modal-btn cancel-btn" onClick={() => setShowAddNotificationModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn primary-btn" disabled={!notificationForm.title || !notificationForm.message || !notificationForm.date || !notificationForm.priority}>Send Notification</button>
              </div>
            </form>
          </Modal>

          {/* Edit Notification Modal */}
          <Modal isOpen={showEditNotificationModal} onClose={() => { setShowEditNotificationModal(false); setNotificationError(''); }} title="Edit Notification">
            <form onSubmit={e => { e.preventDefault(); handleEditNotification(); }} className="modal-form" noValidate>
              <div className="modal-form-row">
                <label htmlFor="editNotificationTitle">Title</label>
                <input
                  id="editNotificationTitle"
                  name="title"
                  value={notificationForm.title}
                  onChange={e => setNotificationForm({ ...notificationForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editNotificationMessage">Message</label>
                <textarea
                  id="editNotificationMessage"
                  name="message"
                  value={notificationForm.message}
                  onChange={e => setNotificationForm({ ...notificationForm, message: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editNotificationDate">Date</label>
                <input
                  id="editNotificationDate"
                  type="date"
                  name="date"
                  value={notificationForm.date}
                  onChange={e => setNotificationForm({ ...notificationForm, date: e.target.value })}
                  required
                />
              </div>
              <div className="modal-form-row">
                <label htmlFor="editNotificationPriority">Priority</label>
                <select
                  id="editNotificationPriority"
                  name="priority"
                  value={notificationForm.priority}
                  onChange={e => setNotificationForm({ ...notificationForm, priority: e.target.value })}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              {notificationError && <p className="error-message">{notificationError}</p>}
              <div className="modal-footer">
                <button type="button" className="modal-btn cancel-btn" onClick={() => setShowEditNotificationModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn primary-btn" disabled={!notificationForm.title || !notificationForm.message || !notificationForm.date || !notificationForm.priority}>Save Changes</button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </motion.div>
  );

  // Main render decision logic
  const renderSectionContent = () => {
    switch (section) {
      case 'home': return renderHome();
      case 'students': return renderStudents();
      case 'routine': return renderRoutines();
      case 'learning': return renderLearningMaterials();
      case 'fees': return renderFees();
      case 'notifications': return renderNotifications();
      default: return <div className="dashboard-overview"><h2>Select section</h2></div>;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" section={section} onSectionChange={setSection} />
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header-bar">
          <div className="header-left">
            <img src={logoIcon} alt="LearnX Logo" className="header-logo" />
            <span className="header-appname">LEARNX</span>
          </div>
          <div className="header-right">
            <span className="header-avatar" aria-label="Admin Profile">A</span>
          </div>
        </header>
        {/* Main Section */}
        <section className="dashboard-section" aria-live="polite" aria-relevant="additions removals">
          <AnimatePresence exitBeforeEnter>
            {renderSectionContent()}
          </AnimatePresence>
        </section>
      </div>
      <footer className="dashboard-footer">
        Designed and Developed for LearnX
      </footer>
    </div>
  );
}
