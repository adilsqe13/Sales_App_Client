import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('./login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand logo-sales-app" href="/"><strong>SaLes<span className='logo-app'>App</span></strong></a>
          <button className="navbar-toggler bg-off-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse px-5" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

              <Link className='navbar-item-link btn border border-warning' to="/addSales">
                <li className="nav-item text-warning ">ADD SALES</li>
              </Link>

              <Link className='navbar-item-link btn border border-light' to='/top5sales'>
                <li className="nav-item text-light">TOP 5 SALES</li>
              </Link>

              <Link className='navbar-item-link btn border border-primary' to='/todaysRevenue'>
                <li className="nav-item text-primary">TODAY'S TOTAL REVENUE</li>
              </Link>

              {
                !token &&
                <Link className='navbar-item-link btn border border-success' to='/login'>
                  <li className="nav-item login-text">LOGIN</li>
                </Link>
              }
              {!token && <Link className='navbar-item-link btn border border-info' to='/register'>
                <li className="nav-item text-info">REGISTER</li>
              </Link>}

              {token &&
                <button onClick={handleLogout} className='navbar-item-link btn border border-danger logout-btn'>
                  <li className="nav-item text-danger">LOGOUT</li>
                </button>}
            </ul>
          </div>

          {token && <span className='text-light user-email sm-screen-hide'>{localStorage.getItem('userEmail')}</span>}
          {token && <a href='/login' onClick={handleLogout} className=' text-danger logout-link sm-screen-hide '>LOGOUT</a>}
        </div>
      </nav>
    </>
  )
}
