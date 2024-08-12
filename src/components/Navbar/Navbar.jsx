import React from 'react'
import './Navbar.css'
import logo from '/logo.png'


function Navbar() {
  return (
    <div className='navbar'>
        <div>
            <img className='logo' src={logo} alt="" />
            <h6>Admin Portal!</h6>
        </div> 
        <img className='profile' src={logo} alt="" />
      
    </div>
  )
}

export default Navbar
