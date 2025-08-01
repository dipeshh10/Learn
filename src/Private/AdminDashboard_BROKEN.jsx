import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaUser, FaUsers, FaChartBar, FaCalendarAlt, FaClipboardList, FaBook, FaMoneyBillWave, FaBell } from "react-icons/fa";
import Slidebar from "../components/Slidebar.jsx";
import { useNavigate } from 'react-router-dom';
import logoIcon from '../assets/LearnX.png';

function AdminDashboard() {
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
    if (!user || !user.role || !token) {
      navigate('/login', { replace: true });
      return;
    }
    if (user.role !== 'admin') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Main section state
  const [section, setSection] = useState('home');

  // Data states with enhanced initial data
  const [students, setStudents] = useState([
    { _id: 1, name: 'सुमन वि.स', email: 'sumanvns@gmail.com', course: '१०अ', phone: '९८४१२३४५६७', address: 'काठमाडौं' },
    { _id: 2, name: 'किञ्जया श्रेष्ठ', email: 'kinjaya@gmail.com', course: '१०ब', phone: '९८५१२३४५६८', address: 'ललितपुर' },
    { _id: 3, name: 'आयुष्का तामाङ', email: 'ayush@gmail.com', course: '१०अ', phone: '९८६१२३४५६९', address: 'भक्तपुर' }
  ]);
  const [routines, setRoutines] = useState([
    { _id: 1, subject: 'गणित', time: '१०:००-११:००', teacher: 'राम प्रसाद शर्मा', room: 'कोठा १०१', day: 'आइतबार' },
    { _id: 2, subject: 'अङ्ग्रेजी', time: '११:००-१२:००', teacher: 'सीता देवी पौडेल', room: 'कोठा १०२', day: 'सोमबार' },
    { _id: 3, subject: 'विज्ञान', time: '१२:००-०१:००', teacher: 'हरि बहादुर तामाङ', room: 'कोठा १०३', day: 'मङ्गलबार' }
  ]);
  const [reports, setReports] = useState([
    { _id: 1, title: 'मासिक परीक्षा', studentName: 'सुमन वि.स', grades: 'अ', subject: 'गणित', date: '२०८१/०४/१५' },
    { _id: 2, title: 'त्रैमासिक परीक्षा', studentName: 'किञ्जया श्रेष्ठ', grades: 'आ', subject: 'अङ्ग्रेजी', date: '२०८१/०४/२०' }
  ]);
  const [attendanceList, setAttendanceList] = useState([
    { _id: 1, studentName: 'सुमन वि.स', date: '२०८१/०४/२५', status: 'उपस्थित', class: '१०अ' },
    { _id: 2, studentName: 'किञ्जया श्रेष्ठ', date: '२०८१/०४/२५', status: 'अनुपस्थित', class: '१०ब' }
  ]);
  const [fees, setFees] = useState([
    { _id: 1, studentName: 'सुमन वि.स', amount: 'रु. ५०,०००', status: 'भुक्तानी भयो', dueDate: '२०८१/०५/०१', class: '१०अ' },
    { _id: 2, studentName: 'किञ्जया श्रेष्ठ', amount: 'रु. ४५,०००', status: 'बाँकी', dueDate: '२०८१/०५/०५', class: '१०ब' }
  ]);
  const [learningMaterials, setLearningMaterials] = useState([
    { _id: 1, title: 'गणित अध्याय १', subject: 'गणित', type: 'PDF', uploadDate: '२०८१/०४/१०', class: '१०अ' },
    { _id: 2, title: 'अङ्ग्रेजी व्याकरण', subject: 'अङ्ग्रेजी', type: 'Video', uploadDate: '२०८१/०४/१२', class: '१०ब' }
  ]);
  const [notifications, setNotifications] = useState([
    { _id: 1, title: 'परीक्षा तालिका अपडेट', message: 'नयाँ परीक्षा तालिका जारी गरिएको छ।', date: '२०८१/०४/२०', priority: 'उच्च' },
    { _id: 2, title: 'बिदाको सूचना', message: 'सोमबार राष्ट्रिय बिदा हुनेछ।', date: '२०८१/०४/२१', priority: 'सामान्य' }
  ]);
  const [courses, setCourses] = useState([
    { _id: 1, title: 'उन्नत गणित', description: 'कक्षा १० का लागि उन्नत गणित कोर्स', teacher: 'राम प्रसाद शर्मा', duration: '६ महिना', fee: 'रु. २५,०००', students: [] },
    { _id: 2, title: 'अङ्ग्रेजी भाषा', description: 'व्यावहारिक अङ्ग्रेजी भाषा सिकाइ', teacher: 'सीता देवी पौडेल', duration: '४ महिना', fee: 'रु. २०,०००', students: [] }
  ]);

  // Loading states
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingRoutines, setLoadingRoutines] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  // Modal states for students
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', course: '', phone: '', address: '' });
  const [studentEditId, setStudentEditId] = useState(null);
  const [studentError, setStudentError] = useState('');

  // Modal states for reports
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [showEditReportModal, setShowEditReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({ title: '', studentName: '', grades: '', subject: '', date: '' });
  const [reportEditId, setReportEditId] = useState(null);
  const [reportError, setReportError] = useState('');

  // Modal states for routines
  const [showAddRoutineModal, setShowAddRoutineModal] = useState(false);
  const [showEditRoutineModal, setShowEditRoutineModal] = useState(false);
  const [routineForm, setRoutineForm] = useState({ subject: '', time: '', teacher: '', room: '', day: '' });
  const [routineEditId, setRoutineEditId] = useState(null);
  const [routineError, setRoutineError] = useState('');

  // Modal states for attendance
  const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
  const [showEditAttendanceModal, setShowEditAttendanceModal] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({ studentName: '', class: '', status: 'उपस्थित', date: '' });
  const [attendanceEditId, setAttendanceEditId] = useState(null);
  const [attendanceError, setAttendanceError] = useState('');

  // Modal states for fees
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [showEditFeeModal, setShowEditFeeModal] = useState(false);
  const [feeForm, setFeeForm] = useState({ studentName: '', amount: '', status: 'बाँकी', dueDate: '', class: '' });
  const [feeEditId, setFeeEditId] = useState(null);
  const [feeError, setFeeError] = useState('');

  // Modal states for learning materials
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showEditMaterialModal, setShowEditMaterialModal] = useState(false);
  const [materialForm, setMaterialForm] = useState({ title: '', subject: '', type: 'PDF', class: '' });
  const [materialEditId, setMaterialEditId] = useState(null);
  const [materialError, setMaterialError] = useState('');

  // Modal states for notifications
  const [showAddNotificationModal, setShowAddNotificationModal] = useState(false);
  const [showEditNotificationModal, setShowEditNotificationModal] = useState(false);
  const [notificationForm, setNotificationForm] = useState({ title: '', message: '', priority: 'सामान्य' });
  const [notificationEditId, setNotificationEditId] = useState(null);
  const [notificationError, setNotificationError] = useState('');

  // Modal states for courses
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({ title: '', description: '', teacher: '', duration: '', fee: '' });
  const [courseEditId, setCourseEditId] = useState(null);
  const [courseError, setCourseError] = useState('');

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

  // Enhanced CRUD Functions for Students
  const handleAddStudent = async () => {
    try {
      setStudentError('');
      if (!studentForm.name || !studentForm.email || !studentForm.course) {
        setStudentError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setLoadingStudents(true);
      const newStudent = {
        _id: Date.now(),
        name: studentForm.name,
        email: studentForm.email,
        course: studentForm.course,
        phone: studentForm.phone || 'N/A',
        address: studentForm.address || 'N/A'
      };
      setStudents([...students, newStudent]);
      setStudentForm({ name: '', email: '', course: '', phone: '', address: '' });
      setShowAddStudentModal(false);
      // Success notification
      alert('विद्यार्थी सफलतापूर्वक थपियो!');
    } catch (error) {
      setStudentError(error.message || 'विद्यार्थी थप्न असफल');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      setStudentError('');
      if (!studentForm.name || !studentForm.email || !studentForm.course) {
        setStudentError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setLoadingStudents(true);
      setStudents(students.map(s => 
        s._id === studentEditId ? { ...s, ...studentForm } : s
      ));
      setStudentForm({ name: '', email: '', course: '', phone: '', address: '' });
      setShowEditStudentModal(false);
      setStudentEditId(null);
      alert('विद्यार्थी सफलतापूर्वक अपडेट भयो!');
    } catch (error) {
      setStudentError(error.message || 'विद्यार्थी अपडेट गर्न असफल');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!confirm('के तपाईं यो विद्यार्थी मेटाउन चाहनुहुन्छ?')) return;
    
    try {
      setLoadingStudents(true);
      setStudents(students.filter(s => s._id !== id));
      alert('विद्यार्थी सफलतापूर्वक मेटाइयो!');
    } catch (error) {
      alert('विद्यार्थी मेटाउन असफल: ' + error.message);
    } finally {
      setLoadingStudents(false);
    }
  };

  // CRUD Functions for Routines
  const handleAddRoutine = async () => {
    try {
      setRoutineError('');
      if (!routineForm.subject || !routineForm.time || !routineForm.teacher || !routineForm.room || !routineForm.day) {
        setRoutineError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setLoadingRoutines(true);
      const newRoutine = {
        _id: Date.now(),
        ...routineForm
      };
      setRoutines([...routines, newRoutine]);
      setRoutineForm({ subject: '', time: '', teacher: '', room: '', day: '' });
      setShowAddRoutineModal(false);
      alert('दिनचर्या सफलतापूर्वक थपियो!');
    } catch (error) {
      setRoutineError(error.message || 'दिनचर्या थप्न असफल');
    } finally {
      setLoadingRoutines(false);
    }
  };

  const handleUpdateRoutine = async () => {
    try {
      setRoutineError('');
      if (!routineForm.subject || !routineForm.time || !routineForm.teacher || !routineForm.room || !routineForm.day) {
        setRoutineError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setLoadingRoutines(true);
      setRoutines(routines.map(r => 
        r._id === routineEditId ? { ...r, ...routineForm } : r
      ));
      setRoutineForm({ subject: '', time: '', teacher: '', room: '', day: '' });
      setShowEditRoutineModal(false);
      setRoutineEditId(null);
      alert('दिनचर्या सफलतापूर्वक अपडेट भयो!');
    } catch (error) {
      setRoutineError(error.message || 'दिनचर्या अपडेट गर्न असफल');
    } finally {
      setLoadingRoutines(false);
    }
  };

  const handleDeleteRoutine = async (id) => {
    if (!confirm('के तपाईं यो दिनचर्या मेटाउन चाहनुहुन्छ?')) return;
    
    try {
      setLoadingRoutines(true);
      setRoutines(routines.filter(r => r._id !== id));
      alert('दिनचर्या सफलतापूर्वक मेटाइयो!');
    } catch (error) {
      alert('दिनचर्या मेटाउन असफल: ' + error.message);
    } finally {
      setLoadingRoutines(false);
    }
  };

  // CRUD Functions for Reports
  const handleAddReport = async () => {
    try {
      setReportError('');
      if (!reportForm.title || !reportForm.studentName || !reportForm.grades || !reportForm.subject) {
        setReportError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setLoadingReports(true);
      const newReport = {
        _id: Date.now(),
        ...reportForm,
        date: reportForm.date || new Date().toLocaleDateString('ne-NP')
      };
      setReports([...reports, newReport]);
      setReportForm({ title: '', studentName: '', grades: '', subject: '', date: '' });
      setShowAddReportModal(false);
      alert('रिपोर्ट सफलतापूर्वक थपियो!');
    } catch (error) {
      setReportError(error.message || 'रिपोर्ट थप्न असफल');
    } finally {
      setLoadingReports(false);
    }
  };

  const handleUpdateReport = async () => {
    try {
      setReportError('');
      if (!reportForm.title || !reportForm.studentName || !reportForm.grades || !reportForm.subject) {
        setReportError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setLoadingReports(true);
      setReports(reports.map(r => 
        r._id === reportEditId ? { ...r, ...reportForm } : r
      ));
      setReportForm({ title: '', studentName: '', grades: '', subject: '', date: '' });
      setShowEditReportModal(false);
      setReportEditId(null);
      alert('रिपोर्ट सफलतापूर्वक अपडेट भयो!');
    } catch (error) {
      setReportError(error.message || 'रिपोर्ट अपडेट गर्न असफल');
    } finally {
      setLoadingReports(false);
    }
  };

  const handleDeleteReport = async (id) => {
    if (!confirm('के तपाईं यो रिपोर्ट मेटाउन चाहनुहुन्छ?')) return;
    
    try {
      setLoadingReports(true);
      setReports(reports.filter(r => r._id !== id));
      alert('रिपोर्ट सफलतापूर्वक मेटाइयो!');
    } catch (error) {
      alert('रिपोर्ट मेटाउन असफल: ' + error.message);
    } finally {
      setLoadingReports(false);
    }
  };

  // CRUD Functions for Attendance
  const handleAddAttendance = async () => {
    try {
      setAttendanceError('');
      if (!attendanceForm.studentName || !attendanceForm.class || !attendanceForm.date) {
        setAttendanceError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setLoadingAttendance(true);
      const newAttendance = {
        _id: Date.now(),
        ...attendanceForm
      };
      setAttendanceList([...attendanceList, newAttendance]);
      setAttendanceForm({ studentName: '', class: '', status: 'उपस्थित', date: '' });
      setShowAddAttendanceModal(false);
      alert('उपस्थिति सफलतापूर्वक थपियो!');
    } catch (error) {
      setAttendanceError(error.message || 'उपस्थिति थप्न असफल');
    } finally {
      setLoadingAttendance(false);
    }
  };

  const handleUpdateAttendance = async () => {
    try {
      setAttendanceError('');
      if (!attendanceForm.studentName || !attendanceForm.class || !attendanceForm.date) {
        setAttendanceError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setLoadingAttendance(true);
      setAttendanceList(attendanceList.map(a => 
        a._id === attendanceEditId ? { ...a, ...attendanceForm } : a
      ));
      setAttendanceForm({ studentName: '', class: '', status: 'उपस्थित', date: '' });
      setShowEditAttendanceModal(false);
      setAttendanceEditId(null);
      alert('उपस्थिति सफलतापूर्वक अपडेट भयो!');
    } catch (error) {
      setAttendanceError(error.message || 'उपस्थिति अपडेट गर्न असफल');
    } finally {
      setLoadingAttendance(false);
    }
  };

  const handleDeleteAttendance = async (id) => {
    if (!confirm('के तपाईं यो उपस्थिति रेकर्ड मेटाउन चाहनुहुन्छ?')) return;
    
    try {
      setLoadingAttendance(true);
      setAttendanceList(attendanceList.filter(a => a._id !== id));
      alert('उपस्थिति रेकर्ड सफलतापूर्वक मेटाइयो!');
    } catch (error) {
      alert('उपस्थिति मेटाउन असफल: ' + error.message);
    } finally {
      setLoadingAttendance(false);
    }
  };

  // CRUD Functions for Fees
  const handleAddFee = async () => {
    try {
      setFeeError('');
      if (!feeForm.studentName || !feeForm.amount || !feeForm.dueDate || !feeForm.class) {
        setFeeError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      const newFee = {
        _id: Date.now(),
        ...feeForm
      };
      setFees([...fees, newFee]);
      setFeeForm({ studentName: '', amount: '', status: 'बाँकी', dueDate: '', class: '' });
      setShowAddFeeModal(false);
      alert('फी रेकर्ड सफलतापूर्वक थपियो!');
    } catch (error) {
      setFeeError(error.message || 'फी थप्न असफल');
    }
  };

  const handleUpdateFee = async () => {
    try {
      setFeeError('');
      if (!feeForm.studentName || !feeForm.amount || !feeForm.dueDate || !feeForm.class) {
        setFeeError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setFees(fees.map(f => 
        f._id === feeEditId ? { ...f, ...feeForm } : f
      ));
      setFeeForm({ studentName: '', amount: '', status: 'बाँकी', dueDate: '', class: '' });
      setShowEditFeeModal(false);
      setFeeEditId(null);
      alert('फी रेकर्ड सफलतापूर्वक अपडेट भयो!');
    } catch (error) {
      setFeeError(error.message || 'फी अपडेट गर्न असफल');
    }
  };

  const handleDeleteFee = async (id) => {
    if (!confirm('के तपाईं यो फी रेकर्ड मेटाउन चाहनुहुन्छ?')) return;
    
    try {
      setFees(fees.filter(f => f._id !== id));
      alert('फी रेकर्ड सफलतापूर्वक मेटाइयो!');
    } catch (error) {
      alert('फी मेटाउन असफल: ' + error.message);
    }
  };

  // CRUD Functions for Learning Materials
  const handleAddMaterial = async () => {
    try {
      setMaterialError('');
      if (!materialForm.title || !materialForm.subject || !materialForm.class) {
        setMaterialError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      const newMaterial = {
        _id: Date.now(),
        ...materialForm,
        uploadDate: new Date().toLocaleDateString('ne-NP')
      };
      setLearningMaterials([...learningMaterials, newMaterial]);
      setMaterialForm({ title: '', subject: '', type: 'PDF', class: '' });
      setShowAddMaterialModal(false);
      alert('सिकाइ सामग्री सफलतापूर्वक थपियो!');
    } catch (error) {
      setMaterialError(error.message || 'सामग्री थप्न असफल');
    }
  };

  const handleUpdateMaterial = async () => {
    try {
      setMaterialError('');
      if (!materialForm.title || !materialForm.subject || !materialForm.class) {
        setMaterialError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setLearningMaterials(learningMaterials.map(m => 
        m._id === materialEditId ? { ...m, ...materialForm } : m
      ));
      setMaterialForm({ title: '', subject: '', type: 'PDF', class: '' });
      setShowEditMaterialModal(false);
      setMaterialEditId(null);
      alert('सिकाइ सामग्री सफलतापूर्वक अपडेट भयो!');
    } catch (error) {
      setMaterialError(error.message || 'सामग्री अपडेट गर्न असफल');
    }
  };

  const handleDeleteMaterial = async (id) => {
    if (!confirm('के तपाईं यो सिकाइ सामग्री मेटाउन चाहनुहुन्छ?')) return;
    
    try {
      setLearningMaterials(learningMaterials.filter(m => m._id !== id));
      alert('सिकाइ सामग्री सफलतापूर्वक मेटाइयो!');
    } catch (error) {
      alert('सामग्री मेटाउन असफल: ' + error.message);
    }
  };

  // CRUD Functions for Notifications
  const handleAddNotification = async () => {
    try {
      setNotificationError('');
      if (!notificationForm.title || !notificationForm.message) {
        setNotificationError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      const newNotification = {
        _id: Date.now(),
        ...notificationForm,
        date: new Date().toLocaleDateString('ne-NP')
      };
      setNotifications([newNotification, ...notifications]);
      setNotificationForm({ title: '', message: '', priority: 'सामान्य' });
      setShowAddNotificationModal(false);
      alert('सूचना सफलतापूर्वक थपियो!');
    } catch (error) {
      setNotificationError(error.message || 'सूचना थप्न असफल');
    }
  };

  const handleUpdateNotification = async () => {
    try {
      setNotificationError('');
      if (!notificationForm.title || !notificationForm.message) {
        setNotificationError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      setNotifications(notifications.map(n => 
        n._id === notificationEditId ? { ...n, ...notificationForm } : n
      ));
      setNotificationForm({ title: '', message: '', priority: 'सामान्य' });
      setShowEditNotificationModal(false);
      setNotificationEditId(null);
      alert('सूचना सफलतापूर्वक अपडेट भयो!');
    } catch (error) {
      setNotificationError(error.message || 'सूचना अपडेट गर्न असफल');
    }
  };

  const handleDeleteNotification = async (id) => {
    if (!confirm('के तपाईं यो सूचना मेटाउन चाहनुहुन्छ?')) return;
    
    try {
      setNotifications(notifications.filter(n => n._id !== id));
      alert('सूचना सफलतापूर्वक मेटाइयो!');
    } catch (error) {
      alert('सूचना मेटाउन असफल: ' + error.message);
    }
  };

  // CRUD Functions for Courses
  const handleAddCourse = async () => {
    try {
      setCourseError('');
      if (!courseForm.title || !courseForm.description || !courseForm.teacher || !courseForm.duration || !courseForm.fee) {
        setCourseError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      const newCourse = {
        _id: Date.now(),
        ...courseForm,
        students: []
      };
      setCourses([...courses, newCourse]);
      setCourseForm({ title: '', description: '', teacher: '', duration: '', fee: '' });
      setShowAddCourseModal(false);
      
      // Store in localStorage to share with teachers and students
      const existingCourses = JSON.parse(localStorage.getItem('allCourses') || '[]');
      localStorage.setItem('allCourses', JSON.stringify([...existingCourses, newCourse]));
      
      alert('कोर्स सफलतापूर्वक थपियो र सबै शिक्षक तथा विद्यार्थीहरूलाई उपलब्ध गराइयो!');
    } catch (error) {
      setCourseError(error.message || 'कोर्स थप्न असफल');
    }
  };

  const handleUpdateCourse = async () => {
    try {
      setCourseError('');
      if (!courseForm.title || !courseForm.description || !courseForm.teacher || !courseForm.duration || !courseForm.fee) {
        setCourseError('सबै क्षेत्रहरू आवश्यक छ');
        return;
      }
      
      const updatedCourses = courses.map(c => 
        c._id === courseEditId ? { ...c, ...courseForm } : c
      );
      setCourses(updatedCourses);
      
      // Update in localStorage
      localStorage.setItem('allCourses', JSON.stringify(updatedCourses));
      
      setCourseForm({ title: '', description: '', teacher: '', duration: '', fee: '' });
      setShowEditCourseModal(false);
      setCourseEditId(null);
      alert('कोर्स सफलतापूर्वक अपडेट भयो!');
    } catch (error) {
      setCourseError(error.message || 'कोर्स अपडेट गर्न असफल');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('के तपाईं यो कोर्स मेटाउन चाहनुहुन्छ?')) return;
    
    try {
      const updatedCourses = courses.filter(c => c._id !== id);
      setCourses(updatedCourses);
      
      // Update in localStorage
      localStorage.setItem('allCourses', JSON.stringify(updatedCourses));
      
      alert('कोर्स सफलतापूर्वक मेटाइयो!');
    } catch (error) {
      alert('कोर्स मेटाउन असफल: ' + error.message);
    }
  };
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
            Welcome to Admin Dashboard!
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
          color: '#1f2937', 
          fontSize: '24px', 
          fontWeight: '600', 
          marginBottom: '20px',
          textAlign: 'center',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '10px'
        }}>
          Manage Students
        </h2>
        {loadingStudents ? <p>Loading...</p> : (
          <>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#374151', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>#</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>FULL NAME</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>EMAIL</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>CLASS</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>ACTIONS</th>
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
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                  }}>
                    <td style={{ padding: '12px 16px', fontWeight: '500', fontSize: '14px' }}>{index + 1}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px' }}>{student.name}</td>
                    <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{student.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px' }}>{student.course}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => {
                            setStudentForm(student);
                            setStudentEditId(student._id);
                            setShowEditStudentModal(true);
                            setStudentError('');
                          }}
                          style={{
                            backgroundColor: '#06b6d4',
                            color: 'white',
                            border: 'none',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student._id)}
                          style={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={() => {
                  setStudentForm({ name: '', email: '', course: '' });
                  setShowAddStudentModal(true);
                  setStudentError('');
                }}
                style={{
                  backgroundColor: '#22c55e',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Add Student
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <input 
            type="date" 
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Mark Attendance
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Student Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Class</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>John Doe</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>10A</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  backgroundColor: '#22c55e', 
                  color: 'white', 
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>Present</span>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <button style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  );

  // Learning Materials Section
  const renderLearningMaterials = () => (
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ 
            color: '#2563eb', 
            fontSize: '24px', 
            fontWeight: '600', 
            margin: 0
          }}>
            Learning Materials
          </h2>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            + Add Material
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Title</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Subject</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Upload Date</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Mathematics Chapter 1</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Mathematics</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>PDF</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>2024-01-15</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <button style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
                  <FaEdit />
                </button>
                <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  );

  // Fees Section
  const renderFees = () => (
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ 
            color: '#2563eb', 
            fontSize: '24px', 
            fontWeight: '600', 
            margin: 0
          }}>
            Fee Management
          </h2>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            + Add Fee Record
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Student Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Class</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Amount</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Due Date</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>John Doe</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>10A</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>$500</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  backgroundColor: '#22c55e', 
                  color: 'white', 
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>Paid</span>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>2024-02-15</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <button style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
                  <FaEdit />
                </button>
                <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  );

  // Notifications Section
  const renderNotifications = () => (
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ 
            color: '#2563eb', 
            fontSize: '24px', 
            fontWeight: '600', 
            margin: 0
          }}>
            Notifications
          </h2>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            + Send Notification
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#374151' }}>
                Exam Schedule Updated
              </h3>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>2 hours ago</span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
              The final exam schedule has been updated. Please check the new dates.
            </p>
            <div style={{ marginTop: '8px' }}>
              <span style={{ 
                padding: '2px 6px', 
                backgroundColor: '#fbbf24', 
                color: 'white', 
                borderRadius: '4px',
                fontSize: '10px'
              }}>URGENT</span>
            </div>
          </div>
          <div style={{
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#374151' }}>
                Holiday Announcement
              </h3>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>1 day ago</span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
              School will remain closed on Monday due to national holiday.
            </p>
            <div style={{ marginTop: '8px' }}>
              <span style={{ 
                padding: '2px 6px', 
                backgroundColor: '#22c55e', 
                color: 'white', 
                borderRadius: '4px',
                fontSize: '10px'
              }}>INFO</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Courses Section - New feature for course management
  const renderCourses = () => (
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ 
            color: '#1f2937', 
            fontSize: '24px', 
            fontWeight: '600', 
            margin: 0,
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '10px'
          }}>
            कोर्स व्यवस्थापन
          </h2>
          <button
            onClick={() => {
              setCourseForm({ title: '', description: '', teacher: '', duration: '', fee: '' });
              setShowAddCourseModal(true);
              setCourseError('');
            }}
            style={{
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            + नयाँ कोर्स बनाउनुहोस्
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {courses.map((course) => (
            <div key={course._id} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: '#f8fafc',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                  {course.title}
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      setCourseForm(course);
                      setCourseEditId(course._id);
                      setShowEditCourseModal(true);
                      setCourseError('');
                    }}
                    style={{
                      backgroundColor: '#06b6d4',
                      color: 'white',
                      border: 'none',
                      padding: '4px 6px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      padding: '4px 6px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                {course.description}
              </p>
              <div style={{ fontSize: '12px', color: '#374151', lineHeight: '1.6' }}>
                <p style={{ margin: '4px 0' }}><strong>शिक्षक:</strong> {course.teacher}</p>
                <p style={{ margin: '4px 0' }}><strong>अवधि:</strong> {course.duration}</p>
                <p style={{ margin: '4px 0' }}><strong>फी:</strong> {course.fee}</p>
                <p style={{ margin: '4px 0' }}><strong>विद्यार्थी संख्या:</strong> {course.students?.length || 0}</p>
              </div>
              <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#e0f2fe', borderRadius: '6px' }}>
                <span style={{ fontSize: '11px', color: '#0369a1', fontWeight: '500' }}>
                  यो कोर्स सबै शिक्षक र विद्यार्थीहरूलाई देखिन्छ
                </span>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <p style={{ fontSize: '16px' }}>कुनै कोर्स उपलब्ध छैन। नयाँ कोर्स बनाउनुहोस्।</p>
          </div>
        )}
      </motion.div>
    </div>
  );

  // Enhanced Routines Section with full CRUD
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ 
            color: '#1f2937', 
            fontSize: '24px', 
            fontWeight: '600', 
            margin: 0,
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '10px'
          }}>
            कक्षा दिनचर्या व्यवस्थापन
          </h2>
          <button
            onClick={() => {
              setRoutineForm({ subject: '', time: '', teacher: '', room: '', day: '' });
              setShowAddRoutineModal(true);
              setRoutineError('');
            }}
            style={{
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            + दिनचर्या थप्नुहोस्
          </button>
        </div>
        
        {loadingRoutines ? (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>लोड हुँदैछ...</p>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #e5e7eb'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#374151', color: 'white' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>#</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>विषय</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>समय</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>शिक्षक</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>कोठा</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>दिन</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>कार्यहरू</th>
              </tr>
            </thead>
            <tbody>
              {routines.map((routine, index) => (
                <tr key={routine._id} style={{ 
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{index + 1}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{routine.subject}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{routine.time}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{routine.teacher}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{routine.room}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{routine.day}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setRoutineForm(routine);
                          setRoutineEditId(routine._id);
                          setShowEditRoutineModal(true);
                          setRoutineError('');
                        }}
                        style={{
                          backgroundColor: '#06b6d4',
                          color: 'white',
                          border: 'none',
                          padding: '6px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteRoutine(routine._id)}
                        style={{
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '6px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
      case 'routine':
        return renderRoutines();
      case 'attendance':
        return renderAttendance();
      case 'learning':
        return renderLearningMaterials();
      case 'fees':
        return renderFees();
      case 'notifications':
        return renderNotifications();
      case 'courses':
        return renderCourses();
      default:
        return renderHome();
    }
  };

  // Enhanced logout: clear localStorage and redirect
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Slidebar 
        role="admin"
        section={section} 
        onSectionChange={setSection}
        onLogout={handleLogout}
      />
      
      <div style={{ 
        flex: 1,
        marginLeft: '240px',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <div style={{
          position: 'sticky',
          top: 0,
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
            <img src={logoIcon} alt="Logo" style={{ width: '50px', height: '50px' }} />
            <h1 style={{ 
              margin: 0, 
              fontSize: '24px', 
              fontWeight: '700',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              LearnX - Admin Dashboard
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
        <div style={{ minHeight: 'calc(100vh - 70px)' }}>
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
