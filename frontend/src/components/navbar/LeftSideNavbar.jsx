import React from "react";

const LeftSideNavbar = () => {
  return (
    <div className="flex flex-col w-64 h-full px-4 py-8 bg-gray-100 border-r">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center mb-6">
        <div className="text-xl font-bold text-blue-500">
          MyApp
        </div>
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col space-y-4">
        <a
          href="/dashboard"
          className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
        >
          <span className="mx-4 font-medium">Dashboard</span>
        </a>
        <a
          href="/profile"
          className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
        >
          <span className="mx-4 font-medium">Profile</span>
        </a>
        <a
          href="/messages"
          className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
        >
          <span className="mx-4 font-medium">Messages</span>
        </a>
        <a
          href="/settings"
          className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-blue-200 hover:text-blue-500"
        >
          <span className="mx-4 font-medium">Settings</span>
        </a>
      </div>
    </div>
  );
};

export default LeftSideNavbar;
