import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Top5sales() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [top5Sales, setTop5Sales] = useState([]);

  const top5sales = async () => {
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
      const top5Sales = allSales.sort((a, b) => b.amount - a.amount).slice(0,5);
      setTop5Sales(top5Sales);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    top5sales();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container mt-5 min-w-448 ">
        <h1 className=''>Top 5 Sales</h1>
        <table className="table table-dark mt-4 border border-light">
          <thead>
            <tr>
              {/* <th scope="col dna417">SL NO.</th> */}
              <th scope="col">Date</th>
              <th scope="col">Sales Id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sale Amount</th>
            </tr>
          </thead>
          <tbody>
            {top5Sales.map((item, index) => (
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
