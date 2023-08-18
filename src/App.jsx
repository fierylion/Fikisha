import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routes from './Routes'
import Navbar from './components/Navbar'
import { BsFacebook } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { AiFillInstagram } from 'react-icons/ai'
import { AiFillGithub } from 'react-icons/ai'
import logo from './assets/fikisha_logo.png'

function App() {
  return (
    <>
      <header className='p-0'>
        <Navbar />
      </header>
      <main className='container  mt-3  p-0 '>
        <Routes />
      </main>
      <footer>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6 text-center'>
             
              <div className='m-3'>
                <img src={logo} alt='logo' className='logo ' />
                <h3 className='text-center ms-3 d-inline-block'>Fikisha</h3>
              </div>
              <div className=''>
                <BsFacebook className='footer_icons mx-2' />
                <AiFillTwitterCircle className='footer_icons mx-2' />
                <AiFillGithub className='footer_icons mx-2' />
                <AiFillInstagram className='footer_icons mx-2' />
              </div>
            </div>
            <div className='col-6 text-center'>
              <h5 className='my-2'>Links</h5>
              <ul className='list-unstyled'>
                <li>
                  <a href='/#sect1' className='footer_links'>
                    Home
                  </a>
                </li>
                <li>
                  <a href='/#sect4' className='footer_links'>
                    Impact
                  </a>
                </li>
                <li>
                  <a href='/#sect2' className='footer_links'>
                    How it works
                  </a>
                </li>
                <li>
                  <a href='/#sect5' className='footer_links'>
                    Who are we
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
