import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Pehle React Router ki 'state' se email lene ki koshish karein
  // 2. Agar wahan nahi milta toh 'sessionStorage' check karein
  const email = location.state?.email || sessionStorage.getItem("tempEmail");

  useEffect(() => {
    // Agar email dono jagah nahi milta, toh user ko wapas bhej dein
    if (!email) {
      alert("Session expired. Please start again.");
      navigate("/register");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match");
    if (password.length < 6) return alert("Password must be at least 6 characters");

    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      await axios.post(`${apiUrl}/api/set-password`, { email, password });
      
      alert("✅ Password Set Successfully! You can now login.");
      // Kaam khatam hone ke baad temporary email ko saaf kar dein
      sessionStorage.removeItem("tempEmail");
      navigate("/login-password");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to set password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Set Password</h2>
        
        {/* User ko dikhane ke liye ki password kis email ke liye set ho raha hai */}
        <p className="text-center text-gray-500 mb-6 text-sm">
          Setting password for: <span className="font-semibold text-indigo-600">{email}</span>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">New Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-3 border rounded-2xl focus:outline-none focus:border-indigo-500 transition-all" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              value={confirm} 
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-3 border rounded-2xl focus:outline-none focus:border-indigo-500 transition-all" 
              required 
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg active:scale-95 transition-all"
          >
            {loading ? "Saving Password..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;