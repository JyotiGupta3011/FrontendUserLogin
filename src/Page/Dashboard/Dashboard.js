import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
          Welcome to your Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          You are successfully logged into the AuthSystem.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;