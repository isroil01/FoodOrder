import React, { useContext } from "react";
import cartContext from "../../store/cartContext";
import Modal from "../UI/Model";
import style from './Cart.module.css';
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(cartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.item.length > 0;

    const cartRemoveHandeler = id =>{
        cartCtx.removeItem(id)
    };

    const cartAddHAndeler = item =>{
        cartCtx.addItem(item);
    };

    const cartItems = <ul className={style['cart-items']}>{cartCtx.item.map((item) => <CartItem key={item.id} onAdd={cartAddHAndeler.bind(null,item)} onRemove={cartRemoveHandeler.bind(null, item.id)} name={item.name} price={item.price} amount={item.amount} />)}</ul>
  return <Modal onClose={props.onClose}>
      {cartItems}
      <div className={style.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
      </div>
      <div className={style.actions}>
          <button className={style['button--alt']} onClick={props.onClose}>Close</button>
          {hasItems && <button className={style.button}>Order</button>}
      </div>
  </Modal>;
};

export default Cart;
