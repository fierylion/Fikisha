import React from 'react'
import logo from '../assets/log.png'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

  
  return (
    <>
      <nav className='navbar navbar-expand-md back-black pt-3'>
        <div className='container'>
          <div>
            <img src={logo} alt='logo' className='logo ms-3 nav-brand ' />
            <span className='ms-3 fw-bold'>AidReach</span>
          </div>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapsibleNavbar'
          >
            <span className='navbar-toggler-icon ' />
          </button>
          <div className='collapse navbar-collapse  ' id='collapsibleNavbar'>
            <ul className='navbar-nav ms-auto me-5 ps-3'>
              <li className='nav-item m-2'>
                <a className='nav-link' href='/'>
                  Home
                </a>
              </li>
              <li className='nav-item m-2'>
                <a className='nav-link' href='/login'>
                  Login
                </a>
              </li>
              <li className='nav-item m-2'>
                <a className='nav-link' href='/register'>
                  Sign Up
                </a>
              </li>
              <li
                className='nav-item
              m-2'
              >
                <button className='btn btn-outline-dark nav-link rounded border px-3'>
                  Connect
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>

    // <nav className='navbar back-black'>
    //   <img src={logo} className='navbar-brand logo' alt="" />
    //   <div className='collapse navbar-collapse' id='navbarContent'>
    //     <div className='navbar-nav'>
    //       <button className='nav-item btn btn-outline-dark my-2 my-sm-0 mr-2 me-4'>
    //         Login
    //       </button>
    //       <button className='nav-item btn btn-outline-dark my-2 my-sm-0 mr-2 me-4'>
    //         Signup
    //       </button>
    //       <button className='nav-item btn back-purple my-2 my-sm-0 mr-2 me-4'>
    //         Connect
    //       </button>
    //     </div>
    //   </div>
    //   <button className='navbar-toggler me-4' type='button' data-toggle='collapse' data-target='#navbarContent'>
    //     <span className='navbar-toggler-icon'></span>
    //   </button>
    // </nav>
  )
}

export default Navbar