import React from 'react'
import './Sidebar.css'
import { FaPlus } from "react-icons/fa";
import { PiCookingPotBold } from "react-icons/pi";
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
            <FaPlus />
            <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
            <PiCookingPotBold />
            <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
            <PiCookingPotBold />
            <p>Order</p>
            </NavLink>
            <hr />
            <NavLink to='/restadd' className="sidebar-option">
            <FaPlus />
            <p>Add Restaurant</p>
            </NavLink>
            <NavLink to='/restlist' className="sidebar-option">
            <PiCookingPotBold />
            <p>List Restaurants</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
