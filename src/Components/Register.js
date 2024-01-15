import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import saleContext from '../Context/saleContext';

export default function Register() {
  const navigate = useNavigate();
  const context = useContext(saleContext);
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({ firstName: '', lastName: '', email: '', password: '' });


  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: credentials.firstName, lastName: credentials.lastName, email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('userEmail', json.userEmail);
      showAlert('Registered successfully, you can add your sales now', 'success');
      navigate("/addSales");

    } else {
      showAlert('Invalid Details', 'danger');
    }
  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div className="container mt-3 pb-5">
        <div className="row">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1 className=''>Register Now</h1>
            <form className='form-group'>
              <label className=' fs-4 mt-0 bold' >First Name</label>
              <input type='text' name='firstName' value={credentials.firstName} onChange={onChange} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-0 bold' >Last Name</label>
              <input type='text' name='lastName' value={credentials.lastName} onChange={onChange} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-0 bold' >Email</label>
              <input type='email' name='email' value={credentials.email} onChange={onChange} autoComplete="username" className='form-control input-field fs-4' />
              <label className=' fs-4 mt-0 bold' >Password</label>
              <input type='password' name='password' value={credentials.password} onChange={onChange} autoComplete="password" className='form-control input-field fs-4' />
              <button onClick={handleRegister} className='btn btn-info form-control mt-5 fs-4 bold '>Register</button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
