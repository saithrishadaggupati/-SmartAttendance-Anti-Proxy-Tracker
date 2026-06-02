import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  QrCode,
  Settings,
  LogOut,
  User as UserIcon,
  Bell,
  ClipboardCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation, Outlet } from 'react-router-dom';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  label,
  active,
}) => (
  <Link
    to={to}
    className={`sidebar-item ${active ? 'active' : ''}`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export const MainLayout: React.FC = () => {
  const { role, logout, currentUser } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    const common = [
      {
        to: `/${role}`,
        icon: <LayoutDashboard size={20} />,
        label: 'Dashboard',
      },
    ];

    if (role === 'admin') {
      return [
        ...common,
        { to: '/admin/users', icon: <Users size={20} />, label: 'Users' },
        { to: '/admin/courses', icon: <BookOpen size={20} />, label: 'Courses' },
        {
          to: '/admin/enrollments',
          icon: <ClipboardCheck size={20} />,
          label: 'Enrollments',
        },
        { to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
      ];
    }

    if (role === 'faculty') {
      return [
        ...common,
        {
          to: '/faculty/courses',
          icon: <BookOpen size={20} />,
          label: 'My Courses',
        },
        {
          to: '/faculty/qr-generator',
          icon: <QrCode size={20} />,
          label: 'Generate QR',
        },
      ];
    }

    if (role === 'student') {
      return [
        ...common,
        {
          to: '/student/attendance',
          icon: <Users size={20} />,
          label: 'My Attendance',
        },
        {
          to: '/student/scan',
          icon: <QrCode size={20} />,
          label: 'Scan QR',
        },
      ];
    }

    return common;
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-placeholder">
            <BookOpen size={24} />
            <span className="logo-text">SmartAttendance</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {getNavItems().map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
            />
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={() => logout()}
            className="sidebar-item logout-btn"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="page-title">
            <h2>
              Welcome back,{' '}
              {currentUser?.email?.split('@')[0] || 'User'}
            </h2>
          </div>

          <div className="top-bar-actions">
            <button className="icon-btn">
              <Bell size={20} />
            </button>

            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">{currentUser?.email}</span>
                <span className="user-role">{role}</span>
              </div>

              <div className="avatar">
                <UserIcon size={20} />
              </div>
            </div>
          </div>
        </header>

        <div className="content-body">
          <Outlet />
        </div>
      </main>

      <style>{`
        .layout-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8fafc;
        }

        .sidebar {
          width: 260px;
          background: white;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .logo-placeholder {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-text {
          font-weight: 700;
          font-size: 1.125rem;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          text-decoration: none;
          color: #64748b;
        }

        .sidebar-item.active {
          background: #eff6ff;
          color: #2563eb;
          border-right: 3px solid #2563eb;
        }

        .logout-btn {
          width: 100%;
          border: none;
          background: none;
          cursor: pointer;
        }

        .main-content {
          flex: 1;
          margin-left: 260px;
        }

        .top-bar {
          height: 64px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
        }

        .top-bar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          text-align: right;
        }

        .user-role {
          font-size: 12px;
          text-transform: capitalize;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content-body {
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;