import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import Loading from "../components/Loading.jsx";

const stockTicker = [
  { name: "NIFTY", value: "22,450", change: "+0.72%" },
  { name: "SENSEX", value: "74,112", change: "+0.65%" },
  { name: "NASDAQ", value: "15,300", change: "+1.01%" },
  { name: "BTC", value: "$65,210", change: "-0.31%" },
];

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);  // Show loading state while waiting for response

    try {
      // Send login request to the API
      const { data } = await axios.post("http://localhost:3000/api/auth/login", values);

      // Log API response to debug
      console.log("API Response:", data);

      // Check if login was successful
      if (data.success) {
        toast.success("Logged in successfully!");

        // Ensure user data is available or assign fallback values
        const userData = {
          username: data.user?.username || "Trader",  // Use fallback if no username
          email: data.user?.email || "not@provided.com",  // Use fallback if no email
        };

        console.log("User Data:", userData);  // Log user data for debugging

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect user to the dashboard
        navigate("/dashboard");
      } else {
        // Display error if login failed
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);  // Log error details
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);  // Hide loading state after request completion
    }
  };

  return loading ? (
    <Loading />  // Show loading spinner if data is being processed
  ) : (
    <div className="relative min-h-screen flex flex-col bg-[#0f172a] text-white overflow-hidden">
      {/* Ticker Strip */}
      <div className="w-full overflow-hidden bg-black py-2 text-green-400 text-sm font-mono animate-pulse flex gap-6 px-4 whitespace-nowrap z-10">
        {stockTicker.map((item, index) => (
          <span key={index} className="flex gap-1 items-center">
            <span className="font-bold">{item.name}:</span>
            {item.value}
            <span className="text-xs ml-1">({item.change})</span>
          </span>
        ))}
      </div>

      {/* Animated Background Chart */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full animate-pulse">
          <polyline
            fill="none"
            stroke="limegreen"
            strokeWidth="0.5"
            points="0,80 10,60 20,65 30,40 40,55 50,30 60,45 70,20 80,40 90,15 100,35"
          />
        </svg>
      </div>

      {/* Login Card */}
      <div className="flex flex-1 items-center justify-center z-10 px-4">
        <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-10 w-full max-w-md mt-10 relative">
          <div className="absolute -top-4 left-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
            Secure Entry
          </div>

          <h2 className="text-3xl font-bold text-center mb-4 tracking-wide"> Welcome To StockFlow </h2>
          <p className="text-center text-gray-600 text-sm italic mb-6">
            "Buy the dip. Log in to rise."
          </p>

          {/* Login Form */}
          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item
              label={<span className="font-medium text-gray-700">Email</span>}
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input className="rounded-md py-2" />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium text-gray-700">Password</span>}
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password className="rounded-md py-2" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-600 hover:from-green-500 hover:to-blue-700 text-white font-bold py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-[1.02]"
              >
                Log In
              </Button>
            </Form.Item>
          </Form>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <NavLink to="/register" className="text-blue-600 font-semibold hover:underline">
              Register here
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
