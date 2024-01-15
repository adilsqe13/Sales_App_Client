import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import saleContext from '../Context/saleContext';

export default function Login() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const context = useContext(saleContext);
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    try {
      const json = await response.json();
      if (json.success) {
        //redirect
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('userEmail', json.userEmail);
        showAlert('Logged in successfully, you can add your sales now', 'success');
        navigate("/addSales");

      } else {
        showAlert('Invalid Credentials', 'danger');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return (
    <>
      <div className="container mt-5 py-5">
        <div className="row">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1 className=''>Login</h1>
            <form className='form-group'>
              <label className=' fs-4 mt-1 bold' >Email</label>
              <input type='email' name='email' value={credentials.email} onChange={onChange} autoComplete="username" className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1 bold' >Password</label>
              <input type='password' name='password' value={credentials.password} onChange={onChange} autoComplete="password" className='form-control input-field fs-4' />
              <button onClick={handleLogin} className='btn login-text-btn form-control mt-5 fs-4 bold  '>Login</button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
