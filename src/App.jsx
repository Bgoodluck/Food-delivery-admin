import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestAdd from './pages/RestAdd/RestAdd'
import RestList from './pages/RestList/RestList'


function App() {
  // https://food-delivery-api-cyj9.onrender.com

  const url = "https://food-delivery-api-cyj9.onrender.com";

  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url} />}/>
          <Route path='/list' element={<List url={url} />}/>
          <Route path='/orders' element={<Orders url={url} />}/>
          <Route path='/restadd' element={<RestAdd url={url} />}/>
          <Route path='/restlist' element={<RestList url={url} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
