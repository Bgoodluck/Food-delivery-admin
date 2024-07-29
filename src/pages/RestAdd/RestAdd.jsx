import React, {  useState } from 'react'
import './RestAdd.css'
import upload from '/upload-img.jpg'
import axios from 'axios'
import { toast } from 'react-toastify';

function RestAdd({url}) {

    const [image, setImage] = useState(false)

    const [data, setData] = useState({
        name: "",
        menu: "Appertizer",
        address: "",
        operating_hours: "",
        operating_days: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name] : value}))
    }

    const onSubmitHandler = async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append("name", data.name)
            formData.append("menu", data.menu)
            // formData.append("address", Number(data.price))
            formData.append("address", data.address)
            formData.append("operating_hours", data.operating_hours)
            formData.append("operating_days", data.operating_days)
            formData.append("image", image)
            const response = await axios.post(`${url}/api/restaurant/adds`, formData);
            if (response.data.success) {
                setData(
                    {
                        name: "",
                        menu: "Appertizer",
                        address: "",
                        operating_hours: "",
                        operating_days: ""
                    }
                )
                setImage(false)
                toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)
            }
    }

    // useEffect(() =>{
    //     console.log(data);
    // }, [data])

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
               <img src={image ? URL.createObjectURL(image):upload} alt="" />
            </label>
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Restaurant name</p>
            <input onChange={onChangeHandler} value={data.name}  type="text" name='name' placeholder='Type here' />
        </div>        
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Restaurant Menu</p>
                <select onChange={onChangeHandler} name="menu">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Desert">Desert</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodle">Noodle</option>
                </select>
            </div>
            <div className="add-product-description flex-col">
            <p>Address</p>
             <textarea onChange={onChangeHandler} value={data.address} name="address" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="add-price flex-col">
                <p>Open Hours</p>
                <input onChange={onChangeHandler} value={data.operating_hours} type="time" name='operating_hours' placeholder='open' />
            </div>
            <div className="add-price flex-col">
                <p>Closing Hours</p>
                <input onChange={onChangeHandler}  type="time" name='operating_hours' placeholder='close' />
            </div>
            <div className="add-price flex-col">
                <p>Menu</p>
                <textarea onChange={onChangeHandler} value={data.menu} name="menu" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="add-price flex-col">
                <p>Operating Days</p>
                <input onChange={onChangeHandler} value={data.operating_days} type="text" name='operating_days' placeholder='Type here' />
            </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default RestAdd
