import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { DeleteOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Simulated DB list of available stocks
const allStocksInDB = [
  { symbol: "AAPL", price: "$170.00", change: "+1.5%" },
  { symbol: "TSLA", price: "$730.00", change: "-0.8%" },
  { symbol: "GOOGL", price: "$2,850.00", change: "+0.3%" },
  { symbol: "RELIANCE", price: "₹2,600", change: "-0.45%" },
  { symbol: "TCS", price: "₹3,550", change: "+0.85%" }
];

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const removeStock = (symbol) => {
    const updated = watchlist.filter(stock => stock.symbol !== symbol);
    setWatchlist(updated);
  };

  const addStock = (symbol) => {
    const selected = allStocksInDB.find(stock => stock.symbol === symbol);
    if (selected && !watchlist.some(s => s.symbol === symbol)) {
      setWatchlist(prev => [...prev, selected]);
    }
  };

  const menu = (
    <Menu>
      {allStocksInDB
        .filter(stock => !watchlist.some(s => s.symbol === stock.symbol))
        .map(stock => (
          <Menu.Item key={stock.symbol} onClick={() => addStock(stock.symbol)}>
            {stock.symbol}
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <div className="min-h-screen bg-white px-8 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow"
        >
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-800">⭐ Your Watchlist</h2>
          <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
            <Button
              icon={<PlusOutlined />}
              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 shadow"
            >
              Add Stock
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-blue-200 shadow-md rounded-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-blue-800 font-medium">Symbol</th>
              <th className="px-6 py-3 text-left text-blue-800 font-medium">Current Price</th>
              <th className="px-6 py-3 text-left text-blue-800 font-medium">Change</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock, index) => (
              <tr key={index} className="border-t hover:bg-blue-50 transition">
                <td className="px-6 py-4 text-blue-900 font-semibold">{stock.symbol}</td>
                <td className="px-6 py-4 text-gray-800">{stock.price}</td>
                <td
                  className={`px-6 py-4 font-medium ${
                    stock.change.includes("-") ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {stock.change}
                </td>
                <td className="px-6 py-4">
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeStock(stock.symbol)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
            {watchlist.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No stocks in your watchlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
