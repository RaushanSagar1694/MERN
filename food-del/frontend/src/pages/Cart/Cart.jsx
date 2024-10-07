import React, { useContext } from 'react'
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';


const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((items, index) => {
          if (cartItems[items._id] > 0) {
            return (
              <>
                <div className="cart-items-title cart-items-item">
                  <img src={items.image} alt='' />
                  <p>{items.name}</p>
                  <p>${items.price}</p>
                  <p>{cartItems[items._id]}</p>
                  <p>${cartItems[items._id] * items.price}</p>
                  <p onClick={() => removeFromCart(items._id)} className='cross'>x</p>
                </div>
                <hr />
              </>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${ getTotalCartAmount() > 0 ? getTotalCartAmount() : 0 }</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delevery Fee</p>
              <p>${getTotalCartAmount() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${ getTotalCartAmount() > 0 ? getTotalCartAmount()+2 : 0 }</b>
            </div>
          </div>
          <button onClick={()=> navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type='text' placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
