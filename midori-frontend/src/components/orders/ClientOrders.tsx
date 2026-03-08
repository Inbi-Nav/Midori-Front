import { useEffect, useState } from "react";
import {
  getMyOrders,
  cancelOrder,
} from "../../api/order.service";
import "../../styles/orders.css";
const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace("/api", "") || "";
export const ClientOrders = () => {

  const [orders,setOrders] = useState<any[]>([])
  const [loadingId,setLoadingId] = useState<number|null>(null)

  const fetchOrders = async()=>{
    try{
      const res = await getMyOrders()
      setOrders(res.data.data)
    }catch(error){
      console.error("Error loading orders")
    }
  }

  useEffect(()=>{
    fetchOrders()
  },[])

  const handleCancel = async(orderId:number)=>{
    try{
      setLoadingId(orderId)
      await cancelOrder(orderId)
      await fetchOrders()
    }catch(err:any){
      alert(err.response?.data?.message || "Cancel failed")
    }finally{
      setLoadingId(null)
    }
  }

  if(!orders.length){
    return <p className="no-orders">No orders yet.</p>
  }

  return(

    <div className="orders-container">
      {orders.map(order=>{
        const totalItems = order.items?.reduce(
          (sum:number,item:any)=>sum + item.quantity,
          0
        )

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
                <span className="value">
                  {totalItems}
                </span>
              </div>
            </div>

            <div className="order-products">
              <h4 className="products-title">Products</h4>
              {order.items?.map((item:any)=>(
              
                <div key={item.id} className="product-row">
                  <div className="product-info">
                    <img
                      src={`${BASE_URL}/${item.product?.image_url}`}
                      className="product-img"
                      alt={item.product?.name}/>
                    <div className="product-text">
                      <span className="product-name">
                        {item.product?.name}
                      </span>
                      <span className="product-price">
                        €{item.price}
                      </span>
                    </div>
                  </div>
                  <span className="product-qty">
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {["pending","processing"].includes(order.status) && (
              <button
                className="cancel-order-btn"
                onClick={()=>handleCancel(order.id)}
                disabled={loadingId === order.id} >
                {loadingId === order.id
                  ? "Cancelling..."
                  : "Cancel Order"}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}