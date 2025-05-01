import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Typography, Button, Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const defaultHoldings = [
  {
    symbol: "AAPL",
    shares: 10,
    avg: "$145.00",
    current: "$170.00",
    profit: "+$250",
  },
  {
    symbol: "TCS",
    shares: 5,
    avg: "₹3,200",
    current: "₹3,550",
    profit: "+₹1,750",
  },
  {
    symbol: "TSLA",
    shares: 3,
    avg: "$700.00",
    current: "$730.00",
    profit: "+$90",
  },
];

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoldings = () => {
      try {
        const savedHoldings = localStorage.getItem('userHoldings');
        if (savedHoldings) {
          setHoldings(JSON.parse(savedHoldings));
        } else {
          setHoldings(defaultHoldings);
          localStorage.setItem('userHoldings', JSON.stringify(defaultHoldings));
        }
      } catch (err) {
        console.error("Error fetching holdings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  const openModal = (stock) => {
    setSelectedStock(stock);
    setSellQuantity(1);
    setBuyQuantity(1);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  const handleBuy = () => {
    if (!selectedStock || buyQuantity <= 0) return;

    const updatedHoldings = holdings.map(item => {
      if (item.symbol === selectedStock.symbol) {
        return {
          ...item,
          shares: item.shares + buyQuantity,
        };
      }
      return item;
    });

    // Update wallet balance
    const currentBalance = parseFloat(localStorage.getItem("walletBalance") || 0);
    const stockPrice = parseFloat(selectedStock.current.replace(/[^0-9.-]+/g,""));
    const newBalance = currentBalance - (stockPrice * buyQuantity);
    
    if (newBalance >= 0) {
      setHoldings(updatedHoldings);
      localStorage.setItem('userHoldings', JSON.stringify(updatedHoldings));
      localStorage.setItem("walletBalance", newBalance.toString());
      Modal.success({
        title: 'Purchase Successful',
        content: `You bought ${buyQuantity} shares of ${selectedStock.symbol}`,
      });
      handleClose();
    } else {
      Modal.error({
        title: 'Insufficient Funds',
        content: 'You don\'t have enough money in your wallet to complete this purchase.',
      });
    }
  };

  const handleSell = () => {
    if (!selectedStock || sellQuantity <= 0) return;

    const updatedHoldings = holdings.map(item => {
      if (item.symbol === selectedStock.symbol) {
        const newShares = item.shares - sellQuantity;
        if (newShares <= 0) {
          return null; // Mark for removal if shares reach 0
        }
        return {
          ...item,
          shares: newShares,
        };
      }
      return item;
    }).filter(Boolean); // Remove null entries

    // Update wallet balance
    const currentBalance = parseFloat(localStorage.getItem("walletBalance") || 0);
    const stockPrice = parseFloat(selectedStock.current.replace(/[^0-9.-]+/g,""));
    const newBalance = currentBalance + (stockPrice * sellQuantity);
    
    setHoldings(updatedHoldings);
    localStorage.setItem('userHoldings', JSON.stringify(updatedHoldings));
    localStorage.setItem("walletBalance", newBalance.toString());
    Modal.success({
      title: 'Sale Successful',
      content: `You sold ${sellQuantity} shares of ${selectedStock.symbol}`,
    });
    handleClose();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <Spin tip="Loading holdings..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow"
        >
          Back to Dashboard
        </Button>
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          📦 Your Holdings
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {holdings.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-blue-200 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => openModal(item)}
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {item.symbol}
            </h3>
            <p className="text-gray-700">
              Shares: <span className="font-medium">{item.shares}</span>
            </p>
            <p className="text-gray-700">
              Avg Buy: <span className="font-medium">{item.avg}</span>
            </p>
            <p className="text-gray-700">
              Current: <span className="font-medium">{item.current}</span>
            </p>
            <p className={`mt-2 font-semibold ${
              item.profit.includes("+") ? "text-green-600" : "text-red-600"
            }`}>
              {item.profit}
            </p>
          </div>
        ))}
      </div>

      <Modal
        title={`Manage ${selectedStock?.symbol}`}
        open={isModalOpen}
        onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="sell" type="primary" danger onClick={handleSell}>
            Sell
          </Button>,
          <Button key="buy" type="primary" onClick={handleBuy}>
            Buy
          </Button>,
        ]}
      >
        <p>
          Shares owned: <strong>{selectedStock?.shares}</strong>
        </p>
        <p>
          Average price: <strong>{selectedStock?.avg}</strong>
        </p>
        <p>
          Current price: <strong>{selectedStock?.current}</strong>
        </p>
        
        <div className="mt-4">
          <label htmlFor="sellQuantity" className="block text-sm font-medium text-gray-700">
            Sell Quantity
          </label>
          <Input
            type="number"
            id="sellQuantity"
            min={1}
            max={selectedStock?.shares}
            value={sellQuantity}
            onChange={(e) => setSellQuantity(Number(e.target.value))}
            className="mt-1"
          />
        </div>
        
        <div className="mt-4">
          <label htmlFor="buyQuantity" className="block text-sm font-medium text-gray-700">
            Buy Quantity
          </label>
          <Input
            type="number"
            id="buyQuantity"
            min={1}
            value={buyQuantity}
            onChange={(e) => setBuyQuantity(Number(e.target.value))}
            className="mt-1"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Holdings;