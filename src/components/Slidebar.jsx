import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaBook, FaMoneyBillWave, FaClipboardList, FaUsers, FaClipboardCheck, FaSignOutAlt, FaBell } from 'react-icons/fa';
import '../styles/Sidebar.css';

const navConfig = {
  admin: [
    { label: 'Home', key: 'home', icon: <FaHome /> },
    { label: 'Students', key: 'students', icon: <FaUserGraduate /> },
    { label: 'Routine', key: 'routine', icon: <FaCalendarAlt /> },
    { label: 'Learning Materials', key: 'learning', icon: <FaBook /> },
    { label: 'Fees', key: 'fees', icon: <FaMoneyBillWave /> },
    { label: 'Notifications', key: 'notifications', icon: <FaBell /> },
    { label: 'Logout', key: 'logout', icon: <FaSignOutAlt />, isLogout: true },
  ],
  teacher: [
    { label: 'Home', key: 'home', icon: <FaHome /> },
    { label: 'Students', key: 'students', icon: <FaUserGraduate /> },
    { label: 'Reports', key: 'reports', icon: <FaClipboardList /> },
    { label: 'Attendance', key: 'attendance', icon: <FaClipboardCheck /> },
    { label: 'Notifications', key: 'notifications', icon: <FaBell /> },
    { label: 'Logout', key: 'logout', icon: <FaSignOutAlt />, isLogout: true },
  ],
  student: [
    { label: 'Home', key: 'home', icon: <FaHome /> },
    { label: 'Routine', key: 'routine', icon: <FaCalendarAlt /> },
    { label: 'Learning Materials', key: 'learning', icon: <FaBook /> },
    { label: 'Fees', key: 'fees', icon: <FaMoneyBillWave /> },
    { label: 'Reports', key: 'reports', icon: <FaClipboardList /> },
    { label: 'Attendance', key: 'attendance', icon: <FaClipboardCheck /> },
    { label: 'Notifications', key: 'notifications', icon: <FaBell /> },
    { label: 'Logout', key: 'logout', icon: <FaSignOutAlt />, isLogout: true },
  ],
};

const Sidebar = ({ role, section, onSectionChange }) => {
  const navItems = navConfig[role] || [];
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleItemClick = (item) => {
    if (item.isLogout) {
      handleLogout();
    } else {
      onSectionChange(item.key);
    }
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.filter(item => !item.isLogout).map((item) => (
          <button
            key={item.key}
            className={`sidebar-link${section === item.key ? ' active' : ''}`}
            onClick={() => handleItemClick(item)}
            type="button"
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
        <div style={{ marginTop: '5rem' }} />
        {navItems.filter(item => item.isLogout).map((item) => (
          <button
            key={item.key}
            className={`sidebar-link logout-btn`}
            onClick={() => handleItemClick(item)}
            type="button"
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;