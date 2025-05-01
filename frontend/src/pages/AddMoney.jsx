import React, { useState, useEffect } from "react";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBalance = localStorage.getItem("walletBalance");
    if (savedBalance) {
      setBalance(Number(savedBalance));
    }
  }, []);

  const handleAddMoney = () => {
    const addAmount = Number(amount);
    if (!addAmount || addAmount <= 0) {
      message.error("Please enter a valid amount");
      return;
    }

    const newBalance = balance + addAmount;
    setBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance);
    message.success(`₹${addAmount} added to your wallet!`);
    setAmount("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-indigo-50 text-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">💰 Add Money to Wallet</h1>
        <p className="mb-2 text-gray-600">Current Balance: <span className="text-green-600 font-semibold">₹{balance}</span></p>
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-4"
        />
        <Button type="primary" block onClick={handleAddMoney}>
          Add Money
        </Button>
        <Button
          block
          className="mt-2"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AddMoney;
