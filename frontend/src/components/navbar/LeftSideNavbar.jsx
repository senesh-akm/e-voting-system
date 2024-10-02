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

const LeftSideNavbar = ({ userRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Links available for all users
  const commonLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { to: "/profile", label: "Profile", icon: <UserCircleIcon className="w-5 h-5" /> },
    { to: "/audit-logs", label: "Activity Logs", icon: <DocumentTextIcon className="w-5 h-5" /> },
    { to: "/votes", label: "Voting", icon: <ChartBarIcon className="w-5 h-5" /> },
  ];

  // Additional links for admin users
  const adminLinks = [
    { to: "/parties", label: "Party", icon: <FlagIcon className="w-5 h-5" /> },
    { to: "/districts", label: "District", icon: <MapIcon className="w-5 h-5" /> },
    { to: "/constituencies", label: "Constituency", icon: <OfficeBuildingIcon className="w-5 h-5" /> },
    { to: "/elections", label: "Election", icon: <UserGroupIcon className="w-5 h-5" /> },
    { to: "/candidates", label: "Candidate", icon: <ClipboardListIcon className="w-5 h-5" /> },
    { to: "/results", label: "Results", icon: <ChartBarIcon className="w-5 h-5" /> },
  ];

  const linksToDisplay = userRole === "admin" ? [...commonLinks, ...adminLinks] : commonLinks;

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className="text-gray-600 p-2 focus:outline-none bg-white rounded shadow"
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
              d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
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
          {linksToDisplay.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
              onClick={() => setIsSidebarOpen(false)} // Close the sidebar after clicking a link
            >
              {link.icon}
              <span className="mx-4 font-medium">{link.label}</span>
            </Link>
          ))}

          {/* Settings Link (Displayed at the end for all users) */}
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
            onClick={() => setIsSidebarOpen(false)} // Close the sidebar after clicking
          >
            <CogIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Settings</span>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default LeftSideNavbar;
