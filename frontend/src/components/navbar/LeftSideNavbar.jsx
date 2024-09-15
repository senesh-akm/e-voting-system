import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  DocumentTextIcon,
  ChartBarIcon,
  FlagIcon,
  MapIcon,
  OfficeBuildingIcon,
  UserGroupIcon,
  ClipboardListIcon,
  CogIcon,
} from "@heroicons/react/outline"; // Importing Heroicons

const LeftSideNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-100 border-b">
        <div className="text-xl font-bold text-blue-500">MyApp</div>
        <button
          className="text-gray-600 focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isSidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 px-4 py-8 overflow-y-auto bg-gray-100 border-r transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="text-xl font-bold text-blue-500">MyApp</div>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Dashboard</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <UserCircleIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Profile</span>
          </Link>
          <Link
            to="/audit-logs"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Activity Logs</span>
          </Link>
          <Link
            to="/votes"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <ChartBarIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Voting</span>
          </Link>
          <Link
            to="/parties"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <FlagIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Party</span>
          </Link>
          <Link
            to="/districts"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <MapIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">District</span>
          </Link>
          <Link
            to="/constituencies"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <OfficeBuildingIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Constituency</span>
          </Link>
          <Link
            to="/elections"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <UserGroupIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Election</span>
          </Link>
          <Link
            to="/candidates"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <ClipboardListIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Candidate</span>
          </Link>
          <Link
            to="/results"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <ChartBarIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Results</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
          >
            <CogIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Settings</span>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default LeftSideNavbar;
