import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Page/Register/Register";
import VerifyOTP from "./Page/VerifyOTP/VerifyOTP";
import SetPassword from "./Page/SetPassword/SetPassword";
import LoginPassword from "./Page/LoginPassword/LoginPassword";
import LoginOTP from "./Page/LoginOTP/LoginOTP";
import Dashboard from "./Page/Dashboard/Dashboard"; 
import ProtectedRoute from "./Components/ProtectedRoute"; 
import Profile from "./Page/Profile/Profile";
import { ChatCRMWidget } from 'bitmax-crm-widget';

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        <Navbar />
        
        <div className="flex-grow overflow-auto">
           <Routes>
             {/* Protected Routes */}
             <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
             <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

             {/* Auth Routes - Inhe niche add karne se upar wale imports ON ho jayenge */}
             <Route path="/register" element={<Register />} />
             <Route path="/verify-otp" element={<VerifyOTP />} />
             <Route path="/set-password" element={<SetPassword />} />
             <Route path="/login-password" element={<LoginPassword />} />
             <Route path="/login-otp" element={<LoginOTP />} />
           </Routes>
        </div>
      </div>

      {/* Widget sits outside */}
      <ChatCRMWidget 
        apiKey="your_api_key_here" 
        apiUrl="https://chat-crm-backend-7mzo.onrender.com"
        primaryColor="#4F46E5"
      />
    </Router>
  );
}

export default App;