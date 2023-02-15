//@Author: Faria-sys
//File description: Script de gerencia da aplicação em react

// Importing modules
import { Routes, Route } from "react-router-dom";
import {Helmet} from "react-helmet"
import axios from "axios";

// Importing styles
import './App.css';


// Importing components
import Login from "./components/pages/Login.js";
import Home from "./components/pages/Home.js";
import Inventory from "./components/pages/Inventory.js";
import Transactions from "./components/pages/Transactions.js";
import Stock from "./components/pages/Stock";
import Workers from "./components/pages/Workers";
import ShopRequests from "./components/pages/ShopRequests";
import ForgotPassword from "./components/pages/ForgotPassword";
import Print from "./components/pages/PrintMaterial"
import PrintTransactions from './components/pages/PrintTransactions'

function App() {  
  return (
    <>
      <Helmet>
        <title>ADSystem</title>
      </Helmet>

      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/stock" element={<Stock/>}/>
        <Route path="/workers" element={<Workers/>}/>
        <Route path="/shop_requests" element={<ShopRequests/>}/>
        <Route path="/forgotpwd" element={<ForgotPassword/>}/>
        <Route path="/print_material" element={<Print/>}/>
        <Route path="/print_transactions" element={<PrintTransactions/>}/>
      </Routes>
    </>
  );
}

export default App;