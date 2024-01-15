import React, { useState, useContext } from 'react';
import saleContext from '../Context/saleContext';
import { useNavigate } from 'react-router-dom';

export default function AddSales() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const context = useContext(saleContext);
  const { showAlert } = context;
  const [productDetails, setProductDetails] = useState({ productName: '', quantity: '', amount: '' });

  const handleAddSale = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/api/sales/addSales`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`
      },
      body: JSON.stringify({ productName: productDetails.productName, quantity: productDetails.quantity, amount: productDetails.amount })
    });
    try {
      const json = await response.json();
      if (token) {
        if (json.success) {
          showAlert('New sale added', 'success');
          setProductDetails({ productName: '', quantity: '', amount: '' });
        } else {
          showAlert('Please fill the details correctly', 'danger');
        }
      } else {
        showAlert('You must Login first', 'danger');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onChange = (event) => {
    setProductDetails({ ...productDetails, [event.target.name]: event.target.value });
  }


  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1>Add Sale Entry</h1>
            <form className='form-group'>
              <label className=' fs-4 mt-1 bold' >Product Name</label>
              <input type='text' onChange={onChange} name='productName' value={productDetails.productName} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1 bold' >Quantity</label>
              <input type='number' onChange={onChange} name='quantity' value={productDetails.quantity} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1 bold' >Amount</label>
              <input type='number' onChange={onChange} name='amount' value={productDetails.amount} className='form-control input-field fs-4' />
              <button onClick={handleAddSale} className='btn btn-warning form-control mt-5 fs-4 bold '>Submit</button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
