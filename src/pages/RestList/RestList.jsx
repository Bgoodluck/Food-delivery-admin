import React, { useEffect, useState } from 'react'
import './RestList.css'
import axios from 'axios'
import {toast} from 'react-toastify'

function RestList({url}) {

  
  const [list, setList] = useState([]);

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/restaurant/list`)
    // console.log(response.data);

    if (response.data.success) {
        setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const removeRest = async(restaurantId)=>{
     const response = await axios.post(`${url}/api/restaurant/remove`, {id:restaurantId});
     await fetchList();
     if (response.data.success) {
        toast.success(response.data.message)
     }
     else{
      toast.error("Error");
     }
  }

  useEffect(()=>{
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>Restaurant List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Menu</b>
          <b>Address</b>
          <b>Action</b>
        </div>
        {list.map((item, index)=>{
            return (
              <div key={index} className='list-table-format'>
                  <img src={`${url}/images/` + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.menu}</p>
                  <p>{item.address}</p>
                  <p onClick={() =>removeRest(item._id)} className='cursor'>x</p>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default RestList
