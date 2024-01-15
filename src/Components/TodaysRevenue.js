import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

export default function TodaysRevenue() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [todaysSales, setTodaysSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  function formatRevenue(revenue) {
  // Amount Formate
    if (revenue >= 100000) {
      return (revenue / 100000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '/-';
    } else {
      return revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '/-';
    }
  }

  const todaysRevenue = async () => {
    if(!token){
      navigate('/login');
    }
    const response = await fetch(`${apiUrl}/api/sales/getallsales`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": `${token}`
      }
    });

    try {
      const allSales = await response.json();
      const currentDate = new Date();
      const todaysSales = allSales.filter(sale => {
        const saleDate = new Date(sale.date);
        return (
          saleDate.getUTCFullYear() === currentDate.getUTCFullYear() &&
          saleDate.getUTCMonth() === currentDate.getUTCMonth() &&
          saleDate.getUTCDate() === currentDate.getUTCDate()
        );
      });
      setTodaysSales(todaysSales);
      let totalAmount = 0;
      for (const sale of todaysSales) {
        totalAmount += sale.amount;
      }
      setTotalRevenue(formatRevenue(totalAmount));

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    todaysRevenue();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="container mt-1 py-5 todaysRevenueWidth min-w-448">
        <div className="row">
          <div className="col-lg-2 col-sm-0"></div>
          <div className="col-lg-4 col-sm-12 p-1 d-flex justify-content-center "><h2 className='text-danger'>Today's Total Revenue :</h2></div>
          <div className="col-lg-3 col-sm-12 p-1 d-flex justify-content-center "><h2>Rs. <span className='revenue-text letter-spacing-1' >{totalRevenue}</span></h2></div>
          <div className="col-lg-3 col-sm-0"></div>
        </div>
      </div>
      <div className="container min-w-448">
        <h1 className=''>Today's Sales</h1>
        <table className="table table-dark mt-4 border border-light">
          <thead>
            <tr>
              {/* <th scope="col">SL NO.</th> */}
              <th scope="col">Date</th>
              <th scope="col">Sales Id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sale Amount</th>
            </tr>
          </thead>
          <tbody>
            {todaysSales.map((item, index) => (
              <tr key={item._id}>
                {/* <th scope="row">{index + 1}</th> */}
                <td>{item.date.slice(0,10)}</td>
                <td>{item._id.slice(18, 24)}</td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
