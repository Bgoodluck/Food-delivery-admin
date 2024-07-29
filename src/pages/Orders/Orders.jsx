import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import parcel from '/parcels-icon.jpg';

function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  const deleteOrder = async (orderId) => {
    const response = await axios.delete(url + `/api/order/delete/${orderId}`);
    if (response.data.success) {
      await fetchAllOrders();
      toast.success("Order deleted successfully");
    } else {
      toast.error("Error deleting order");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const getAddress = (order) => {
    if (order.useRegisteredAddress && order.userId && order.userId.address) {
      return order.userId.address;
    }
    return order.address || {};
  };

  const getName = (order) => {
    if (order.firstName && order.lastName) {
      return `${order.firstName} ${order.lastName}`;
    }
    if (order.userId && order.userId.firstName && order.userId.lastName) {
      return `${order.userId.firstName} ${order.userId.lastName}`;
    }
    return 'N/A';
  };

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          const address = getAddress(order);
          return (
            <div key={index} className="order-item">
              <img src={parcel} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    return index === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `;
                  })}
                </p>
                <p className='order-item-name'>{getName(order)}</p>
                <p className='order-item-email'>{order.email || (order.userId && order.userId.email) || 'N/A'}</p>
                <p className='order-item-usertype'>{order.userId ? 'Registered' : 'Guest'}</p>
                <div className="order-item-address">
                  <p>{address.street ? `${address.street}, ` : ''}</p>
                  <p>{`${address.city || ''}, ${address.state || ''}, ${address.country || ''}`}</p>
                </div>
                <p className='order-item-phone'>{order.phone || (order.userId && order.userId.phone) || 'N/A'}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>₦{order.amount}</p>

              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

              {order.status === "Delivered" && (
                <button onClick={() => deleteOrder(order._id)}>Delete</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
