import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaBook, FaMoneyBillWave, FaClipboardList, FaUsers, FaClipboardCheck, FaSignOutAlt, FaBell, FaGraduationCap } from 'react-icons/fa';
import '../Style/Slidebar.css';
import logoIcon from '../assets/LearnX.png';

const defaultNavConfig = {
  admin: [
    { label: 'Home', key: 'home', icon: <FaHome /> },
    { label: 'Students', key: 'students', icon: <FaUserGraduate /> },
    { label: 'Teachers', key: 'teachers', icon: <FaChalkboardTeacher /> },
    { label: 'Courses', key: 'courses', icon: <FaGraduationCap /> },
    { label: 'Routine', key: 'routine', icon: <FaCalendarAlt /> },
    { label: 'Attendance', key: 'attendance', icon: <FaClipboardCheck /> },
    { label: 'Reports', key: 'reports', icon: <FaClipboardList /> },
    { label: 'Learning Materials', key: 'learning', icon: <FaBook /> },
    { label: 'Fees', key: 'fees', icon: <FaMoneyBillWave /> },
    { label: 'Notifications', key: 'notifications', icon: <FaBell /> },
    { label: 'Logout', key: 'logout', icon: <FaSignOutAlt />, isLogout: true },
  ],
  teacher: [
    { label: 'Home', key: 'home', icon: <FaHome /> },
    { label: 'Students', key: 'students', icon: <FaUserGraduate /> },
    { label: 'Courses', key: 'courses', icon: <FaGraduationCap /> },
    { label: 'Reports', key: 'reports', icon: <FaClipboardList /> },
    { label: 'Attendance', key: 'attendance', icon: <FaClipboardCheck /> },
    { label: 'Notifications', key: 'notifications', icon: <FaBell /> },
    { label: 'Logout', key: 'logout', icon: <FaSignOutAlt />, isLogout: true },
  ],
  student: [
    { label: 'Home', key: 'home', icon: <FaHome /> },
    { label: 'Courses', key: 'courses', icon: <FaGraduationCap /> },
    { label: 'Routine', key: 'routine', icon: <FaCalendarAlt /> },
    { label: 'Learning Materials', key: 'learning', icon: <FaBook /> },
    { label: 'Fees', key: 'fees', icon: <FaMoneyBillWave /> },
    { label: 'Reports', key: 'reports', icon: <FaClipboardList /> },
    { label: 'Attendance', key: 'attendance', icon: <FaClipboardCheck /> },
    { label: 'Notifications', key: 'notifications', icon: <FaBell /> },
    { label: 'Logout', key: 'logout', icon: <FaSignOutAlt />, isLogout: true },
  ],
};

function getSidebarConfig(role) {
  const saved = localStorage.getItem(`sidebar_${role}`);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultNavConfig[role];
    }
  }
  return defaultNavConfig[role];
}

const Sidebar = ({ role, section, onSectionChange, onLogout }) => {
  const [navItems, setNavItems] = useState(getSidebarConfig(role));
  const navigate = useNavigate();

  useEffect(() => {
    setNavItems(getSidebarConfig(role));
  }, [role]);

  const handleLogout = () => {
    console.log('Logout clicked');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    if (onLogout) {
      onLogout();
    } else {
      navigate('/');
    }
  };

  const handleItemClick = (item) => {
    if (item.isLogout) {
      handleLogout();
    } else {
      onSectionChange(item.key);
    }
  };

  // Modern, well-aligned sidebar
  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img src={logoIcon} alt="LearnX Logo" className="sidebar-logo-img" />
        <span className="sidebar-title">LearnX</span>
      </div>

      {/* Navigation Section */}
      <nav className="sidebar-nav">
        {navItems.filter(item => !item.isLogout).map((item) => (
          <button
            key={item.key}
            onClick={() => handleItemClick(item)}
            className={`sidebar-link ${section === item.key ? 'active' : ''}`}
            aria-current={section === item.key ? 'page' : undefined}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="sidebar-logout-section">
        {navItems.filter(item => item.isLogout).map((item) => (
          <button
            key={item.key}
            onClick={() => handleItemClick(item)}
            className="sidebar-logout-btn"
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;