import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Home = ({ user }) => {
  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-blue-500 shadow-md text-white">
        <div className="text-2xl font-bold tracking-wider">
          <Link to="/home">STOCK FLOW</Link>
        </div>
        <div className="flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={`https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff`}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-lg">Hi, {user.username}</span>
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-blue-100">
                Log in
              </Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-blue-100">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center text-center text-5xl font-semibold mt-10">
        <img
          src="/SS.webp"
          className="absolute z-[-1] h-[500px] top-0 right-0 opacity-100"
          alt=""
        />
        <div className="max-w-4xl">
          STOCK FLOW <br /> Welcomes you to build a growing India.
          <p className="text-3xl font-light mt-4">All things finance, right here.</p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="text-4xl font-normal text-center mt-16 mb-8">
        Transparent pricing. No hidden charges.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mb-16">
        {[
          "₹ 0\nAccount Opening Charges",
          "₹ 0\nBrokerage for Equity, F&O for first 30 days",
          "₹ 0\nCommission for Mutual Funds & IPO Investments",
        ].map((text, i) => (
          <div
            key={i}
            className="transform hover:scale-105 transition-all duration-300 flex flex-col justify-center items-center bg-white shadow-lg rounded-xl p-6 min-h-[160px] text-center text-xl font-medium text-gray-800"
          >
            {text.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-white bg-black w-full py-12 px-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-3 text-2xl">
            <div className="text-3xl font-bold">STOCK FLOW</div>
            <span className="flex items-center gap-2 text-xl">
              <FaMapMarkerAlt /> Patiala, Punjab
            </span>
            <span className="flex items-center gap-2 text-xl">
              <FaPhoneAlt /> 9877753221
            </span>
          </div>
          <div className="text-2xl">
            <div className="font-bold text-3xl mb-2">Products</div>
            <span className="block">Stocks</span>
            <span className="block">Futures & Options</span>
            <span className="block">Mutual Funds</span>
            <span className="block">IPO</span>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-800 transition"
      >
        ↑
      </button>
    </>
  );
};

export default Home;
