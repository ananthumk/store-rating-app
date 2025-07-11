import React from 'react'
import { FaHouseChimney } from "react-icons/fa6";
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar-container'>
        <div><FaHouseChimney className='navbar-icon'/> <h1>StoreConnect</h1></div>
        <div>
            <h5>Welcome, Arun</h5>
            <div className='profile'>
                A
            </div>
        </div>
    </div>
  )
}

export default Navbar