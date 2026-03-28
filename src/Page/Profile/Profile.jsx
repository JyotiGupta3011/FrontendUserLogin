import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // If no token, redirect to login immediately
        if (!token) {
          navigate("/login-password");
          return;
        }

        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await axios.get(`${apiUrl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Session expired or failed to load profile.");
        setLoading(false);
        // Optional: clear token and redirect if unauthorized
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login-password");
        }
      }
    };

    fetchProfile();
  }, [navigate, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 text-red-600 rounded-lg border border-red-200 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
          <p className="text-gray-500">Manage your account details</p>
        </div>
      </div>

      {/* Information List - Vertically Stacked */}
<div className="flex flex-col gap-2">
  <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
      Full Name
    </label>
    <p className="text-lg font-medium text-gray-800">{user?.name || "N/A"}</p>
  </div>

  <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
      Email Address
    </label>
    <p className="text-lg font-medium text-gray-800">{user?.email}</p>
  </div>

  <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
      Phone Number
    </label>
    <p className="text-lg font-medium text-gray-800">{user?.phone}</p>
  </div>

  <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
      Account Status
    </label>
    <p className="text-lg font-medium text-green-600 flex items-center">
      <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
      Active & Verified
    </p>
  </div>

  <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
      Auth Token
    </label>
    <p className="text-sm font-medium text-gray-800 break-all">{token || "Token not found"}</p>
  </div>
</div>

    </div>
  );
};

export default Profile;
