import { useEffect, useState } from "react";
import {
  getProviderOrders,
  updateOrderStatus,
  deleteOrder
} from "../../api/order.service";

import "../../styles/orders.css";

const providerStatuses = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" }
];

export const ProviderOrders = () => {

  const [orders,setOrders] = useState<any[]>([])
  const [loading,setLoading] = useState(true)
  const [updatingId,setUpdatingId] = useState<number|null>(null)

  useEffect(()=>{
    loadOrders()
  },[])

  const loadOrders = async()=>{
    try{
      const res = await getProviderOrders()
      setOrders(res.data.data)
    }catch(err){
      console.error("Error loading orders")
    }finally{
      setLoading(false)
    }
  }

  const handleStatusChange = async(id:number,status:string)=>{
    try{
      setUpdatingId(id)
      await updateOrderStatus(id,status)
      await loadOrders()
    }catch(e){
      alert("Error updating order")
    }finally{
      setUpdatingId(null)
    }
  }

  const handleDelete = async(id:number)=>{
    if(!window.confirm("Remove this order from list?")) return

    try{
      await deleteOrder(id)
      await loadOrders()
    }catch(e){
      alert("Error deleting order")
    }
  }

  if(loading){
    return(
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    )
  }

  return(
    <div className="orders-container">
      {orders.map(order=>{
        const totalItems = order.items?.reduce(
          (sum:number,item:any)=>sum + item.quantity,
          0
        )
        const isLocked = ["cancelled","delivered"].includes(order.status)
        return(
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3 className="order-title">
                Order #{order.id}
              </h3>
              <span className={`order-status status-${order.status}`}>
                {order.status}
              </span>
            </div>

            <div className="order-info-grid">
              <div className="info-box">
                <span className="label">Client</span>
                <span className="value">#{order.user_id}</span>
              </div>
              <div className="info-box">
                <span className="label">Order date</span>
                <span className="value">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString()
                    : "-"
                  }
                </span>
              </div>
              <div className="info-box">
                <span className="label">Total</span>
                <span className="value total">
                  €{order.total_amount}
                </span>
              </div>
              <div className="info-box">
                <span className="label">Items</span>
                <span className="value">{totalItems}</span>
              </div>
            </div>
            <div className="order-products">
              <h4 className="products-title">Products</h4>
              {order.items?.map((item:any)=>(
                <div key={item.id} className="product-row">
                  <span className="product-name">
                    {item.product?.name || "Product"}
                  </span>
                  <span className="product-qty">
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {!isLocked ?(
              <div className="order-actions">

                <select
                  className={`order-select status-${order.status}`}
                  value={order.status}
                  disabled={updatingId===order.id}
                  onChange={(e)=>
                    handleStatusChange(order.id,e.target.value)
                  }>

                  {providerStatuses.map(status=>(
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            ):(
              <button
                className="remove-order-btn"
                onClick={()=>handleDelete(order.id)}>
                Remove from list
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}