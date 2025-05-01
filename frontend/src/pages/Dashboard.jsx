import React, { useState, useEffect } from "react";
import { Card, Col, Row, Typography, Button, Avatar, Popover, Modal, Input, List } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const marketData = [
  { name: "NIFTY", value: "22,450", change: "+0.72%", positive: true },
  { name: "SENSEX", value: "74,112", change: "+0.65%", positive: true },
  { name: "NASDAQ", value: "15,300", change: "+1.01%", positive: true },
  { name: "BTC", value: "$65,210", change: "-0.31%", positive: false },
];

const defaultHoldings = [
  { symbol: "AAPL", shares: 10, avg: "$145.00", current: "$170.00", profit: "+$250" },
  { symbol: "TCS", shares: 5, avg: "₹3,200", current: "₹3,550", profit: "+₹1,750" },
];

const watchlist = [
  { symbol: "GOOGL", price: "$2,850", change: "+0.85%", positive: true },
  { symbol: "RELIANCE", price: "₹2,600", change: "-0.45%", positive: false },
];

const hiddenStocks = [
  { symbol: "MSFT", name: "Microsoft", price: "320.10", change: "+0.44%", positive: true },
  { symbol: "TSLA", name: "Tesla", price: "$710.55", change: "-1.25%", positive: false },
  { symbol: "NFLX", name: "Netflix", price: "$390.25", change: "+2.18%", positive: true },
  { symbol: "AMZN", name: "Amazon", price: "$3,190", change: "-0.42%", positive: false },
  { symbol: "META", name: "Meta", price: "$240.90", change: "+1.12%", positive: true },
  { symbol: "INFY", name: "Infosys", price: "₹1,400", change: "+0.50%", positive: true },
  { symbol: "WIPRO", name: "Wipro", price: "₹500", change: "-0.30%", positive: false },
  { symbol: "IBM", name: "IBM", price: "$135.00", change: "+0.15%", positive: true },
  { symbol: "ORCL", name: "Oracle", price: "$90.20", change: "+1.05%", positive: true },
  { symbol: "VED", name: "VEDANTA", price: "409", change: "-0.90%", positive: false },
  { symbol: "ADBE", name: "Adobe", price: "$510.45", change: "+0.75%", positive: true },
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [isWatchModalOpen, setIsWatchModalOpen] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [holdingsState] = useState(defaultHoldings);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error parsing user:", err);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const openWatchModal = (stock) => {
    setSelectedWatch(stock);
    setBuyQuantity(1);
    setIsWatchModalOpen(true);
  };

  const closeWatchModal = () => {
    setIsWatchModalOpen(false);
    setSelectedWatch(null);
  };

  const handleWatchBuy = () => {
    if (selectedWatch && buyQuantity > 0) {
      // Get current holdings from localStorage or use empty array if none
      const currentHoldings = JSON.parse(localStorage.getItem('userHoldings') || '[]');
      
      // Check if stock already exists in holdings
      const existingHoldingIndex = currentHoldings.findIndex(
        h => h.symbol === selectedWatch.symbol
      );
      
      let updatedHoldings;
      
      if (existingHoldingIndex >= 0) {
        // Update existing holding
        updatedHoldings = [...currentHoldings];
        updatedHoldings[existingHoldingIndex] = {
          ...updatedHoldings[existingHoldingIndex],
          shares: updatedHoldings[existingHoldingIndex].shares + buyQuantity
        };
      } else {
        // Add new holding
        const newHolding = {
          symbol: selectedWatch.symbol,
          shares: buyQuantity,
          avg: selectedWatch.price,
          current: selectedWatch.price,
          profit: "+$0",
        };
        updatedHoldings = [...currentHoldings, newHolding];
      }
      
      // Update wallet balance
      const currentBalance = parseFloat(localStorage.getItem("walletBalance") || 0);
      const stockPrice = parseFloat(selectedWatch.price.replace(/[^0-9.-]+/g,""));
      const newBalance = currentBalance - (stockPrice * buyQuantity);
      
      if (newBalance >= 0) {
        localStorage.setItem('userHoldings', JSON.stringify(updatedHoldings));
        localStorage.setItem("walletBalance", newBalance.toString());
        Modal.success({
          title: 'Purchase Successful',
          content: `You bought ${buyQuantity} shares of ${selectedWatch.symbol}`,
        });
        closeWatchModal();
      } else {
        Modal.error({
          title: 'Insufficient Funds',
          content: 'You don\'t have enough money in your wallet to complete this purchase.',
        });
      }
    }
  };

  const handleWatchSell = () => {
    console.log(`Selling ${selectedWatch?.symbol}`);
    closeWatchModal();
  };

  const handleExploreClick = () => {
    const stockNewsLinks = [
      "https://www.moneycontrol.com/news/business/markets/",
      "https://www.cnbc.com/markets/",
      "https://economictimes.indiatimes.com/markets",
      "https://www.reuters.com/markets/",
      "https://www.bloomberg.com/markets",
      "https://www.investing.com/news/stock-market-news",
    ];
    const randomUrl = stockNewsLinks[Math.floor(Math.random() * stockNewsLinks.length)];
    window.open(randomUrl, "_blank");
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (!value) {
      setSearchResults([]);
      return;
    }

    const lowerValue = value.toLowerCase();

    const holdingMatches = holdingsState.filter((item) =>
      item.symbol.toLowerCase().includes(lowerValue)
    );

    const watchlistMatches = watchlist.filter((item) =>
      item.symbol.toLowerCase().includes(lowerValue)
    );

    const hiddenMatches = hiddenStocks.filter(
      (item) =>
        item.symbol.toLowerCase().includes(lowerValue) ||
        item.name.toLowerCase().includes(lowerValue)
    );

    const combined = [
      ...holdingMatches.map((h) => ({
        symbol: h.symbol,
        name: h.symbol,
        price: h.current,
        change: "N/A",
        positive: true,
      })),
      ...watchlistMatches.map((w) => ({
        symbol: w.symbol,
        name: w.symbol,
        price: w.price,
        change: w.change,
        positive: w.positive,
      })),
      ...hiddenMatches,
    ];

    setSearchResults(combined);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-lg font-semibold text-indigo-600">
        Loading Dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-lg font-semibold text-gray-700">
        No user found. Please{" "}
        <a href="/login" className="text-indigo-600 underline">
          log in
        </a>
        .
      </div>
    );
  }

  const userPopover = (
    <div className="text-sm text-gray-700 space-y-1">
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p><br />
      <div className="mb-6 text-1xl text-blue-500 font-semibold">
        Wallet Balance: ₹{localStorage.getItem("walletBalance") || 0}
      </div>
      <Button size="small" type="link" className="p-0" onClick={() => window.open("/addmoney")}>Add Money</Button><br />
      <Button size="small" type="link" className="p-0 text-black" onClick={() => window.open("/help", "_blank")}>Help & Support</Button><br />
      <Button size="small" type="link" className="p-0 text-black" onClick={() => window.open("/contact", "_blank")}>Contact Us</Button><br />
      <Button size="small" type="link" className="p-0 text-black-200" onClick={handleLogout}>Logout</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-indigo-800">📊📈 Welcome {user.username}</h1>
        <div className="flex items-center gap-4">
          <Input.Search
            placeholder="Search Stocks..."
            allowClear
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            enterButton
            onSearch={handleSearch}
            style={{ width: 250 }}
          />
          <Popover content={userPopover} placement="bottomRight" trigger="click">
            <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer bg-fuchsia-500 shadow-lg" />
          </Popover>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <List
            header={<div className="font-semibold text-indigo-700">Search Results</div>}
            bordered
            dataSource={searchResults}
            renderItem={(item) => (
              <List.Item onClick={() => openWatchModal(item)} className="cursor-pointer hover:bg-indigo-50">
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-purple-700">{item.symbol}</span>
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                  <span className={item.positive ? "text-green-600" : "text-red-600"}>{item.change}</span>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}

      {/* Market Ticker */}
      <div className="bg-gradient-to-r from-fuchsia-100 via-indigo-100 to-teal-100 border border-indigo-200 py-3 px-6 mb-10 flex gap-6 overflow-x-auto whitespace-nowrap font-mono text-sm rounded-lg shadow-md">
        {marketData.map((stock, i) => (
          <span key={i} className="flex gap-2 items-center">
            <span className="font-bold text-indigo-900">{stock.name}:</span>
            {stock.value}
            <span className={stock.positive ? "text-emerald-600" : "text-rose-500"}>({stock.change})</span>
          </span>
        ))}
      </div>

      {/* Holdings */}
      <section className="mb-12">
        <h2 onClick={() => navigate("/holdings")} className="text-xl font-semibold text-purple-700 mb-5 cursor-pointer hover:underline">💼 Holdings</h2>
        <Row gutter={[16, 16]}>
          {holdingsState.map((item, i) => (
            <Col xs={24} md={12} lg={8} key={i}>
              <Card className="rounded-2xl bg-white border border-purple-300 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] duration-200">
                <h3 className="text-lg font-bold text-indigo-700 mb-2">{item.symbol}</h3>
                <p className="text-gray-700">Shares: {item.shares}</p>
                <p className="text-gray-700">Avg. Buy: {item.avg}</p>
                <p className="text-gray-700">Current: {item.current}</p>
                <p className="text-emerald-600 font-semibold mt-2">{item.profit}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Watchlist */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-5">
          <h2 onClick={() => navigate("/watchlist")} className="text-xl font-semibold text-indigo-700 cursor-pointer hover:underline">👁️ Watchlist</h2>
          <Button icon={<PlusOutlined />} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-md" onClick={() => navigate("/watchlist")}>Add</Button>
        </div>
        <Row gutter={[16, 16]}>
          {watchlist.map((item, i) => (
            <Col xs={24} md={12} lg={8} key={i}>
              <Card className="rounded-2xl bg-white border border-pink-200 shadow-md hover:shadow-lg transition-all cursor-pointer" onClick={() => openWatchModal(item)}>
                <h3 className="text-lg font-semibold text-fuchsia-700 mb-2">{item.symbol}</h3>
                <p className="text-gray-700">Price: {item.price}</p>
                <p className={item.positive ? "text-emerald-600" : "text-rose-500"}>{item.change}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Discover */}
      <section>
        <h2 className="text-xl font-semibold text-teal-700 mb-5">🔍 Discover</h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card className="rounded-2xl h-64 flex flex-col justify-between bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100 border border-purple-200 shadow-lg">
              <div>
                <h4 className="text-lg font-bold text-indigo-800">🚀 Trending Markets</h4>
                <p className="text-gray-600">Explore high-volume movers & sector trends.</p>
              </div>
              <Button type="link" className="self-end text-indigo-700 font-semibold" onClick={handleExploreClick}>
                Explore Insights →
              </Button>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card className="rounded-2xl h-64 bg-white border border-fuchsia-200 shadow">
              <h4 className="text-lg font-bold text-pink-700">📰 Market News</h4>
              <ul className="mt-3 list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Fed rate pause boosts Wall Street</li>
                <li>Infosys Q4 beats analyst estimates</li>
                <li>Bitcoin cools off after weekend rally</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Modal with Quantity */}
      <Modal
        title={`Trade ${selectedWatch?.symbol}`}
        open={isWatchModalOpen}
        onCancel={closeWatchModal}
        footer={[
          <Button key="cancel" onClick={closeWatchModal}>Cancel</Button>,
          <Button key="sell" danger onClick={handleWatchSell}>Sell</Button>,
          <Button key="buy" type="primary" onClick={handleWatchBuy}>Buy</Button>,
        ]}
      >
        <p>Price: <strong>{selectedWatch?.price}</strong></p>
        <p>
          Change:{" "}
          <strong className={selectedWatch?.positive ? "text-green-600" : "text-red-600"}>
            {selectedWatch?.change}
          </strong>
        </p>
        <div className="mt-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <Input
            type="number"
            id="quantity"
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

export default Dashboard;