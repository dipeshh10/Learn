import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaUser, FaUsers, FaChartBar, FaCalendarAlt, FaClipboardList, FaBook, FaChalkboardTeacher, FaGraduationCap, FaMoneyBillWave, FaBell } from "react-icons/fa";
import Slidebar from "../components/Slidebar.jsx";
import Modal from "../components/Modal.jsx";
import logoIcon from '../assets/LearnX.png';
import { useNavigate } from 'react-router-dom';
import { fetchStudents, addStudent, updateStudent, deleteStudent } from '../Services/studentApi';
import { fetchTeachers, addTeacher, updateTeacher, deleteTeacher } from '../Services/teacherApi';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../Services/coursesApi';
import { fetchRoutines, addRoutine, updateRoutine, deleteRoutine } from '../Services/routineApi';
import { fetchReports, addReport, updateReport, deleteReport } from '../Services/reportApi';
import { fetchAttendance, addAttendance, updateAttendance, deleteAttendance } from '../Services/attendenceApi';
import { fetchLearningMaterials, addLearningMaterial, updateLearningMaterial, deleteLearningMaterial } from '../Services/learningMaterialApi';
import { fetchFees, addFee, updateFee, deleteFee } from '../Services/feeApi';
import { fetchNotifications, addNotification, updateNotification, deleteNotification } from '../Services/notificationApi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Main section state
  const [section, setSection] = useState('home');

  // Data states
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [reports, setReports] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [fees, setFees] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Loading states
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingRoutines, setLoadingRoutines] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [loadingLearningMaterials, setLoadingLearningMaterials] = useState(false);
  const [loadingFees, setLoadingFees] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  // Modal states for students
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', course: '' });
  const [studentEditId, setStudentEditId] = useState(null);
  const [studentError, setStudentError] = useState('');

  // Modal states for reports
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [showEditReportModal, setShowEditReportModal] = useState(false);
    const handleEdit = (report) => {
      setShowEditReportModal(true);
      setReportForm(report);
    };
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

  // Modal states for teachers
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showEditTeacherModal, setShowEditTeacherModal] = useState(false);
  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', phone: '', subject: '', department: '' });
  const [teacherEditId, setTeacherEditId] = useState(null);
  const [teacherError, setTeacherError] = useState('');

  // Modal states for courses
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({ name: '', code: '', description: '', credits: '', teacherId: '', fee: '' });
  const [courseEditId, setCourseEditId] = useState(null);
  const [courseError, setCourseError] = useState('');

  // Modal states for learning materials
  const [showAddLearningMaterialModal, setShowAddLearningMaterialModal] = useState(false);
  const [showEditLearningMaterialModal, setShowEditLearningMaterialModal] = useState(false);
  const [learningMaterialForm, setLearningMaterialForm] = useState({ title: '', type: 'Document', url: '', description: '', subject: '' });
  const [learningMaterialEditId, setLearningMaterialEditId] = useState(null);
  const [learningMaterialError, setLearningMaterialError] = useState('');

  // Modal states for fees
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [showEditFeeModal, setShowEditFeeModal] = useState(false);
  const [feeForm, setFeeForm] = useState({ studentName: '', class: '', amount: '', status: 'Pending', dueDate: '' });
  const [feeEditId, setFeeEditId] = useState(null);
  const [feeError, setFeeError] = useState('');

  // Modal states for notifications
  const [showAddNotificationModal, setShowAddNotificationModal] = useState(false);
  const [showEditNotificationModal, setShowEditNotificationModal] = useState(false);
  const [notificationForm, setNotificationForm] = useState({ title: '', message: '', type: 'general', priority: 'medium', targetAudience: 'all' });
  const [notificationEditId, setNotificationEditId] = useState(null);
  const [notificationError, setNotificationError] = useState('');

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

  // Load initial data on mount
  useEffect(() => {
    // Load students data immediately when component mounts
    loadStudents();
    loadTeachers();
    loadCourses();
  }, []);

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

      // Call API to save student to database
      const newStudent = await addStudent({
        name: studentForm.name,
        email: studentForm.email,
        course: studentForm.course,
        fees: studentForm.fees || '0'
      });

      // Update local state with the saved student
      setStudents([...students, newStudent]);
      setStudentForm({ name: '', email: '', course: '' });
      setShowAddStudentModal(false);

      // Refresh the student list from database
      await loadStudents();
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
      await addRoutine({
        subject: routineForm.subject,
        time: routineForm.time,
        teacherName: routineForm.teacher,
        room: routineForm.room,
        day: routineForm.day || 'Monday',
        createdBy: '999', // or current user id
        isActive: true
      });
      const updated = await fetchRoutines();
      setRoutines(updated);
      setRoutineForm({ subject: '', time: '', teacher: '', room: '' });
      setShowAddRoutineModal(false);
    } catch (error) {
      setRoutineError(error.message || 'Failed to add routine');
      console.error('Routine Add Error:', error);
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
      await updateRoutine(routineEditId, {
        subject: routineForm.subject,
        time: routineForm.time,
        teacherName: routineForm.teacher,
        room: routineForm.room,
        day: routineForm.day || 'Monday',
        isActive: true
      });
      const updated = await fetchRoutines();
      setRoutines(updated);
      setRoutineForm({ subject: '', time: '', teacher: '', room: '' });
      setShowEditRoutineModal(false);
      setRoutineEditId(null);
    } catch (error) {
      setRoutineError(error.message || 'Failed to update routine');
      console.error('Routine Update Error:', error);
    } finally {
      setLoadingRoutines(false);
    }
  };

  const handleDeleteRoutine = async (id) => {
    if (!confirm('Are you sure you want to delete this routine?')) return;
    try {
      setLoadingRoutines(true);
      await deleteRoutine(id);
      const updated = await fetchRoutines();
      setRoutines(updated);
    } catch (error) {
      alert('Failed to delete routine: ' + error.message);
      console.error('Routine Delete Error:', error);
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

  // CRUD Functions for Teachers
  const handleAddTeacher = async () => {
    try {
      setTeacherError('');
      if (!teacherForm.name || !teacherForm.email || !teacherForm.subject) {
        setTeacherError('Please fill in all required fields');
        return;
      }

      const newTeacher = await addTeacher(teacherForm);
      setTeachers(prev => [...prev, newTeacher]);
      setTeacherForm({ name: '', email: '', phone: '', subject: '', department: '' });
      setShowAddTeacherModal(false);

      // Refresh the teacher list from database
      await loadTeachers();
    } catch (error) {
      setTeacherError(error.message || 'Failed to add teacher');
    }
  };

  const handleEditTeacher = (teacher) => {
    setTeacherForm(teacher);
    setTeacherEditId(teacher.id);
    setShowEditTeacherModal(true);
  };

  const handleUpdateTeacher = async () => {
    try {
      setTeacherError('');
      if (!teacherForm.name || !teacherForm.email || !teacherForm.subject) {
        setTeacherError('Please fill in all required fields');
        return;
      }

      const updatedTeacher = await updateTeacher(teacherEditId, teacherForm);
      setTeachers(prev => prev.map(teacher =>
        teacher.id === teacherEditId ? updatedTeacher : teacher
      ));
      setTeacherForm({ name: '', email: '', phone: '', subject: '', department: '' });
      setTeacherEditId(null);
      setShowEditTeacherModal(false);
    } catch (error) {
      setTeacherError(error.message || 'Failed to update teacher');
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
      await deleteTeacher(id);
      setTeachers(prev => prev.filter(teacher => teacher.id !== id));
    } catch (error) {
      alert(error.message || 'Failed to delete teacher');
    }
  };

  // CRUD Functions for Courses
  const handleAddCourse = async () => {
    try {
      setCourseError('');
      if (!courseForm.name || !courseForm.code) {
        setCourseError('Please fill in all required fields');
        return;
      }

      const newCourse = await createCourse(courseForm);
      setCourses(prev => [...prev, newCourse]);
      setCourseForm({ name: '', code: '', description: '', credits: '', teacherId: '', fee: '' });
      setShowAddCourseModal(false);
    } catch (error) {
      setCourseError(error.message || 'Failed to add course');
    }
  };

  const handleEditCourse = (course) => {
    setCourseForm(course);
    setCourseEditId(course.id);
    setShowEditCourseModal(true);
  };

  const handleUpdateCourse = async () => {
    try {
      setCourseError('');
      if (!courseForm.name || !courseForm.code) {
        setCourseError('Please fill in all required fields');
        return;
      }

      const updatedCourse = await updateCourse(courseEditId, courseForm);
      setCourses(prev => prev.map(course =>
        course.id === courseEditId ? updatedCourse : course
      ));
      setCourseForm({ name: '', code: '', description: '', credits: '', teacherId: '', fee: '' });
      setCourseEditId(null);
      setShowEditCourseModal(false);
    } catch (error) {
      setCourseError(error.message || 'Failed to update course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await deleteCourse(id);
      setCourses(prev => prev.filter(course => course.id !== id));
    } catch (error) {
      alert(error.message || 'Failed to delete course');
    }
  };

  // Data loading functions
  const loadTeachers = async () => {
    try {
      setLoadingTeachers(true);
      const data = await fetchTeachers();
      setTeachers(data);
    } catch (error) {
      console.error('Error loading teachers:', error);
    } finally {
      setLoadingTeachers(false);
    }
  };

  const loadCourses = async () => {
    try {
      setLoadingCourses(true);
      const data = await fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoadingCourses(false);
    }
  };

  const loadStudents = async () => {
    try {
      console.log('🔄 Loading students...');
      setLoadingStudents(true);
      const data = await fetchStudents();
      console.log('📊 Students loaded:', data);
      setStudents(data);
    } catch (error) {
      console.error('❌ Error loading students:', error);
    } finally {
      setLoadingStudents(false);
    }
  };

  const loadRoutines = async () => {
    try {
      setLoadingRoutines(true);
      const data = await fetchRoutines();
      setRoutines(data);
    } catch (error) {
      console.error('Error loading routines:', error);
    } finally {
      setLoadingRoutines(false);
    }
  };

  const loadAttendance = async () => {
    try {
      setLoadingAttendance(true);
      const data = await fetchAttendance();
      setAttendanceList(data);
    } catch (error) {
      console.error('Error loading attendance:', error);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const loadReports = async () => {
    try {
      setLoadingReports(true);
      const data = await fetchReports();
      setReports(data);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoadingReports(false);
    }
  };

  const loadLearningMaterials = async () => {
    try {
      setLoadingLearningMaterials(true);
      const data = await fetchLearningMaterials();
      setLearningMaterials(data);
    } catch (error) {
      console.error('Error loading learning materials:', error);
    } finally {
      setLoadingLearningMaterials(false);
    }
  };

  const loadFees = async () => {
    try {
      setLoadingFees(true);
      const data = await fetchFees();
      setFees(data);
    } catch (error) {
      console.error('Error loading fees:', error);
    } finally {
      setLoadingFees(false);
    }
  };

  const loadNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  // Load data when section changes
  useEffect(() => {
    if (section === 'teachers') {
      loadTeachers();
    } else if (section === 'courses') {
      loadCourses();
    } else if (section === 'students') {
      loadStudents();
    } else if (section === 'routine') {
      loadRoutines();
    } else if (section === 'attendance') {
      loadAttendance();
    } else if (section === 'reports') {
      loadReports();
    } else if (section === 'learning') {
      loadLearningMaterials();
    } else if (section === 'fees') {
      loadFees();
    } else if (section === 'notifications') {
      loadNotifications();
    }
  }, [section]);

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
                        {/* Removed edit and delete icons from sidebar */}
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

  // Reports Section
  const renderReports = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#2563eb', fontSize: '24px', fontWeight: '600', margin: 0 }}>
            <FaChartBar style={{ marginRight: '12px' }} />
            Academic Reports
          </h2>
          <button
            onClick={() => {
              setRoutineForm({ subject: '', time: '', teacher: '', room: '', day: '' });
              setShowAddRoutineModal(true);
              setRoutineError('');
            }}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
            }}
          >
            + Add Report
          </button>
        </div>

  {loadingRoutines ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Loading reports...
          </div>
        ) : reports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <FaChartBar style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }} />
            <p>No reports found. Create your first report!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Title</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Type</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Student</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Grade</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{ borderBottom: '1px solid #f3f4f6' }}
                  >
                    <td style={{ padding: '12px', color: '#374151' }}>{report.title}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{report.type}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{report.studentName}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{new Date(report.date).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: report.grade >= 80 ? '#dcfce7' : report.grade >= 60 ? '#fef3c7' : '#fee2e2',
                        color: report.grade >= 80 ? '#15803d' : report.grade >= 60 ? '#d97706' : '#dc2626'
                      }}>
                        {report.grade}%
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleEdit(report)}
                          style={{
                            background: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );

  // Routines Section
  const renderRoutines = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#2563eb', fontSize: '24px', fontWeight: '600', margin: 0 }}>
            <FaCalendarAlt style={{ marginRight: '12px' }} />
            Class Routines
          </h2>
          <button
            onClick={() => setShowAddRoutineModal(true)}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
            }}
          >
            + Add Schedule
          </button>
        </div>


        {/* Show error or success message for routine operations */}
        {routineError && (
          <div style={{ color: '#ef4444', background: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center', fontWeight: '500' }}>
            {routineError}
          </div>
        )}

        {/* Show warning if fallback routines are being used */}
        {Array.isArray(routines) && routines.length > 0 && routines[0].id === '1' && routines[0].subject === 'Mathematics' && routines[0].teacherName === 'Prof. Johnson' && (
          <div style={{ color: '#b45309', background: '#fef3c7', padding: '10px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center', fontWeight: '500' }}>
            Warning: Showing fallback routines. Backend API is not connected or not responding.
          </div>
        )}

        {loadingRoutines ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Loading routines...
          </div>
        ) : routines.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <FaCalendarAlt style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }} />
            <p>No class schedules found. Create your first routine!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Subject</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Teacher</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Day</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Time</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Room</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {routines.map((routine, index) => (
                  <motion.tr
                    key={routine.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{ borderBottom: '1px solid #f3f4f6' }}
                  >
                    <td style={{ padding: '12px', color: '#374151', fontWeight: '500' }}>{routine.subject}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{routine.teacherName}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{routine.day}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{routine.startTime} - {routine.endTime}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{routine.room}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => {
                            setRoutineForm({
                              subject: routine.subject,
                              time: routine.startTime || routine.time,
                              teacher: routine.teacherName,
                              room: routine.room,
                              day: routine.day || ''
                            });
                            setRoutineEditId(routine.id);
                            setShowEditRoutineModal(true);
                            setRoutineError('');
                          }}
                          style={{
                            background: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteRoutine(routine.id)}
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );

  // Attendance Section
  const renderAttendance = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#2563eb', fontSize: '24px', fontWeight: '600', margin: 0 }}>
            <FaClipboardList style={{ marginRight: '12px' }} />
            Student Attendance
          </h2>
          <button
            onClick={() => setShowAddAttendanceModal(true)}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
            }}
          >
            + Mark Attendance
          </button>
        </div>

    {loadingAttendance ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Loading attendance records...
          </div>
        ) : attendanceList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <FaClipboardList style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }} />
            <p>No attendance records found. Start marking attendance!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Student</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Subject</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Time</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e5e7eb', fontWeight: '600', color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((attendance, index) => (
                  <motion.tr
                    key={attendance.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{ borderBottom: '1px solid #f3f4f6' }}
                  >
                    <td style={{ padding: '12px', color: '#374151', fontWeight: '500' }}>{attendance.studentName}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{attendance.subject}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{new Date(attendance.date).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: attendance.status === 'Present' ? '#dcfce7' : '#fee2e2',
                        color: attendance.status === 'Present' ? '#15803d' : '#dc2626'
                      }}>
                        {attendance.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{attendance.time}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => {
                            setAttendanceForm({
                              studentName: attendance.studentName,
                              class: attendance.class,
                              status: attendance.status,
                              date: attendance.date,
                              time: attendance.time || ''
                            });
                            setAttendanceEditId(attendance.id);
                            setShowEditAttendanceModal(true);
                            setAttendanceError('');
                          }}
                          style={{
                            background: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteAttendance(attendance.id)}
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );

  // Courses Section
  const renderCourses = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
            <FaGraduationCap style={{ marginRight: '12px', color: '#3b82f6' }} />
            Courses Management
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddCourseModal(true)}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaGraduationCap /> Add Course
          </motion.button>
        </div>

        {loadingCourses ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Loading courses...
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Code</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Teacher</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Credits</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Fee</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <motion.tr
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{ borderBottom: '1px solid #f3f4f6' }}
                  >
                    <td style={{ padding: '12px', color: '#1f2937' }}>{course.name}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{course.code}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{course.teacherName}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{course.credits}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>${course.fee}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditCourse(course)}
                          style={{
                            backgroundColor: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteCourse(course.id)}
                          style={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {courses.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                No courses found. Add your first course!
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );

  // Teachers Section
  const renderTeachers = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
            <FaChalkboardTeacher style={{ marginRight: '12px', color: '#3b82f6' }} />
            Teachers Management
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddTeacherModal(true)}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaUser /> Add Teacher
          </motion.button>
        </div>

        {loadingTeachers ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Loading teachers...
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Subject</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Department</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Phone</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <motion.tr
                    key={teacher.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{ borderBottom: '1px solid #f3f4f6' }}
                  >
                    <td style={{ padding: '12px', color: '#1f2937' }}>{teacher.name}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{teacher.email}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{teacher.subject}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{teacher.department}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{teacher.phone}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditTeacher(teacher)}
                          style={{
                            backgroundColor: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          style={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {teachers.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                No teachers found. Add your first teacher!
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );

  // Learning Materials Section
  const renderLearningMaterials = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
            <FaBook style={{ marginRight: '12px', color: '#3b82f6' }} />
            Learning Materials
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddLearningMaterialModal(true)}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaBook /> Add Material
          </motion.button>
        </div>
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          Learning Materials management coming soon...
        </div>
      </motion.div>
    </div>
  );

  // Fees Section
  const renderFees = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
            <FaMoneyBillWave style={{ marginRight: '12px', color: '#3b82f6' }} />
            Fees Management
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddFeeModal(true)}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaMoneyBillWave /> Add Fee
          </motion.button>
        </div>
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          Fees management coming soon...
        </div>
      </motion.div>
    </div>
  );

  // Notifications Section
  const renderNotifications = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
            <FaBell style={{ marginRight: '12px', color: '#3b82f6' }} />
            Notifications
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddNotificationModal(true)}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaBell /> Add Notification
          </motion.button>
        </div>
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          Notifications management coming soon...
        </div>
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
      case 'teachers':
        return renderTeachers();
      case 'courses':
        return renderCourses();
      case 'routine':
        return renderRoutines();
      case 'attendance':
        return renderAttendance();
      case 'reports':
        return renderReports();
      case 'learning':
        return renderLearningMaterials();
      case 'fees':
        return renderFees();
      case 'notifications':
        return renderNotifications();
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
      {/* Teacher Modals */}
      <Modal isOpen={showAddTeacherModal} onClose={() => setShowAddTeacherModal(false)} title="Add New Teacher">
        <form onSubmit={(e) => { e.preventDefault(); handleAddTeacher(); }}>
          {teacherError && <div style={{ color: 'red', marginBottom: '10px' }}>{teacherError}</div>}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Name *</label>
            <input
              type="text"
              value={teacherForm.name}
              onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email *</label>
            <input
              type="email"
              value={teacherForm.email}
              onChange={(e) => setTeacherForm({...teacherForm, email: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone</label>
            <input
              type="tel"
              value={teacherForm.phone}
              onChange={(e) => setTeacherForm({...teacherForm, phone: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Subject *</label>
            <input
              type="text"
              value={teacherForm.subject}
              onChange={(e) => setTeacherForm({...teacherForm, subject: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Department</label>
            <input
              type="text"
              value={teacherForm.department}
              onChange={(e) => setTeacherForm({...teacherForm, department: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowAddTeacherModal(false)}
              style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', background: '#3b82f6', color: 'white' }}
            >
              Add Teacher
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditTeacherModal} onClose={() => setShowEditTeacherModal(false)} title="Edit Teacher">
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateTeacher(); }}>
          {teacherError && <div style={{ color: 'red', marginBottom: '10px' }}>{teacherError}</div>}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Name *</label>
            <input
              type="text"
              value={teacherForm.name}
              onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email *</label>
            <input
              type="email"
              value={teacherForm.email}
              onChange={(e) => setTeacherForm({...teacherForm, email: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone</label>
            <input
              type="tel"
              value={teacherForm.phone}
              onChange={(e) => setTeacherForm({...teacherForm, phone: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Subject *</label>
            <input
              type="text"
              value={teacherForm.subject}
              onChange={(e) => setTeacherForm({...teacherForm, subject: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Department</label>
            <input
              type="text"
              value={teacherForm.department}
              onChange={(e) => setTeacherForm({...teacherForm, department: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowEditTeacherModal(false)}
              style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', background: '#f59e0b', color: 'white' }}
            >
              Update Teacher
            </button>
          </div>
        </form>
      </Modal>

      {/* Course Modals */}
      <Modal isOpen={showAddCourseModal} onClose={() => setShowAddCourseModal(false)} title="Add New Course">
        <form onSubmit={(e) => { e.preventDefault(); handleAddCourse(); }}>
          {courseError && <div style={{ color: 'red', marginBottom: '10px' }}>{courseError}</div>}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Course Name *</label>
            <input
              type="text"
              value={courseForm.name}
              onChange={(e) => setCourseForm({...courseForm, name: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Course Code *</label>
            <input
              type="text"
              value={courseForm.code}
              onChange={(e) => setCourseForm({...courseForm, code: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Description</label>
            <textarea
              value={courseForm.description}
              onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '80px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowAddCourseModal(false)}
              style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', background: '#3b82f6', color: 'white' }}
            >
              Add Course
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditCourseModal} onClose={() => setShowEditCourseModal(false)} title="Edit Course">
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateCourse(); }}>
          {courseError && <div style={{ color: 'red', marginBottom: '10px' }}>{courseError}</div>}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Course Name *</label>
            <input
              type="text"
              value={courseForm.name}
              onChange={(e) => setCourseForm({...courseForm, name: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Course Code *</label>
            <input
              type="text"
              value={courseForm.code}
              onChange={(e) => setCourseForm({...courseForm, code: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Description</label>
            <textarea
              value={courseForm.description}
              onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '80px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowEditCourseModal(false)}
              style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', background: '#f59e0b', color: 'white' }}
            >
              Update Course
            </button>
          </div>
        </form>
      </Modal>
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
};

export default AdminDashboard;