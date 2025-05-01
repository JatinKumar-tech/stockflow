import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const stockTicker = [
  { name: "NIFTY", value: "22,450", change: "+0.72%" },
  { name: "SENSEX", value: "74,112", change: "+0.65%" },
  { name: "NASDAQ", value: "15,300", change: "+1.01%" },
  { name: "BTC", value: "$65,210", change: "-0.31%" },
];

const onFinish = async (values) => {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/register", values);
    toast.success("Registered successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Register error:", error);
    toast.error("User already exists.");
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Register = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0f172a] text-white overflow-hidden">
      
      {/* 📈 Ticker Strip */}
      <div className="w-full overflow-hidden bg-black py-2 text-green-400 text-sm font-mono animate-pulse flex gap-6 px-4 whitespace-nowrap z-10">
        {stockTicker.map((item, index) => (
          <span key={index} className="flex gap-1 items-center">
            <span className="font-bold">{item.name}:</span>
            {item.value}
            <span className="text-xs ml-1">({item.change})</span>
          </span>
        ))}
      </div>

      {/* 🔲 Background Line Chart */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full animate-pulse">
          <polyline
            fill="none"
            stroke="red"
            strokeWidth="0.5"
            points="0,80 10,60 20,65 30,40 40,55 50,30 60,45 70,20 80,40 90,15 100,35"
          />
        </svg>
      </div>

      {/* 💼 Register Card */}
      <div className="flex flex-1 items-center justify-center z-10 px-4">
        <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-10 w-full max-w-md mt-10 relative">
          <div className="absolute -top-4 left-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
            Trader's Entry
          </div>

          <h2 className="text-3xl font-bold text-center mb-4 tracking-wide">Create Account</h2>
          <p className="text-center text-gray-600 text-sm italic mb-6">
            "Register today, rally tomorrow."
          </p>

          <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <Form.Item
              label={<span className="font-medium text-gray-700">Username</span>}
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input className="rounded-md py-2" />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium text-gray-700">Email</span>}
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input className="rounded-md py-2" />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium text-gray-700">Password</span>}
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password className="rounded-md py-2" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-600 hover:from-green-500 hover:to-blue-700 text-white font-bold py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-[1.02]"
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold hover:underline">
              Log in here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
