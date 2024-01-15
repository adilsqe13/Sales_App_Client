import React from 'react';
import SaleState from './Context/SaleState';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import AddSales from './Components/AddSales'
import Top5sales from './Components/Top5sales'
import TodaysRevenue from './Components/TodaysRevenue'
import Login from './Components/Login'
import Register from './Components/Register'
import Alert from './Components/Alert'
import './App.css';

function App() {
  return (

    <SaleState>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path='/' element={<AddSales />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/addSales' element={<AddSales />} />
          <Route exact path='/top5sales' element={<Top5sales />} />
          <Route exact path='/todaysRevenue' element={<TodaysRevenue />} />
        </Routes>
      </BrowserRouter>
    </SaleState>

  );
}

export default App;
