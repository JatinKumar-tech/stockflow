import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx'
import Login from './pages/Login.jsx'
import'./App.css'
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Test from './pages/Test.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Holdings from './pages/Holdings.jsx';
import Watchlist from './pages/Watchlist.jsx';  
import { ToastContainer, toast } from "react-toastify";
import ContactUS from './pages/ContactUS.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Help from './pages/Help.jsx';
import AddMoney from './pages/AddMoney.jsx'; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/holdings" element={<Holdings/>}/>
      <Route path="/watchlist" element={<Watchlist/>}/>
      <Route path="/help" element={<Help/>}/>
      <Route path="/addmoney" element={<AddMoney/>}/>
      <Route path="/contact" element={<ContactUS/>}/>
     
     
      <Route path="/Test" element={<Test/>}/>
      </Routes>
      <ToastContainer />
  </BrowserRouter>
  </StrictMode>,
);
