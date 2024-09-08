import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiChevronLeft, FiChevronRight, FiLogOut } from 'react-icons/fi';

interface SidebarLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export default function SidebarLayout({ children, onLogout }: SidebarLayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={`${
          isSidebarExpanded ? 'w-64' : 'w-20'
        } bg-gray-800 text-white flex flex-col p-6 relative transition-all duration-300`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white"
        >
          {isSidebarExpanded ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
        <h2
          className={`text-2xl font-bold mb-6 transition-opacity duration-300 ${
            isSidebarExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Menu
        </h2>
        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center p-2 rounded hover:bg-gray-700"
          >
            <FiHome className="mr-2" />
            <span
              className={`transition-opacity duration-300 ${
                isSidebarExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Dashboard
            </span>
          </Link>
          <Link
            to="/investir"
            className="flex items-center p-2 rounded hover:bg-gray-700"
          >
            <FiTrendingUp className="mr-2" />
            <span
              className={`transition-opacity duration-300 ${
                isSidebarExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Investir
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center p-2 rounded hover:bg-gray-700 w-full text-left"
          >
            <FiLogOut className="mr-2" />
            <span
              className={`transition-opacity duration-300 ${
                isSidebarExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Logout
            </span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}