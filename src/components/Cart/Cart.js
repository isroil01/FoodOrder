import React, { useContext, useState } from "react";
import cartContext from "../../store/cartContext";
import Modal from "../UI/Model";
import style from './Cart.module.css';
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
    const [ isCheck,setIsCheck] = useState(false);
    const [iseSubmitting,setIsSubmitting] = useState(false);
    const [didSubmitting,setDidSubmitting] = useState(false);
    const cartCtx = useContext(cartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.item.length > 0;

    const cartRemoveHandeler = id =>{
        cartCtx.removeItem(id)
    };

    const cartAddHAndeler = item =>{
        cartCtx.addItem(item);
    };

    const orderHandeler = () =>{
        setIsCheck(true);
    };

    const submitHandeler = async(userData) =>{
        setIsSubmitting(true);
        const response = await  fetch('https://food-order-70acd-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.item
            })
        });
        setIsSubmitting(false);
        setDidSubmitting(true);
        
    };

    const moodalAction = 
    <div className={style.actions}>
          <button className={style['button--alt']} onClick={props.onClose}>Close</button>
          {hasItems && <button className={style.button} onClick={orderHandeler}>Order</button>}
     </div>

      const cartItems = <ul className={style['cart-items']}>{cartCtx.item.map((item) => <CartItem key={item.id} onAdd={cartAddHAndeler.bind(null,item)} onRemove={cartRemoveHandeler.bind(null, item.id)} name={item.name} price={item.price} amount={item.amount} />)}</ul>
    
 
 const cartModal = <React.Fragment>
                {cartItems}
                <div className={style.total}>
                <span>Total Amount</span>
               <span>{totalAmount}</span>
               </div>
               {isCheck && <CheckOut onCancel={props.onClose} onSubmit={submitHandeler} />}
                {!isCheck && moodalAction}
       </React.Fragment>;
      
       const isSubmittingModal = <p>Sending oreder data</p>;
        const didSubmitMpdal = <p>Sucessefully sent the order</p>

   
  return <Modal onClose={props.onClose}>
      {!iseSubmitting && !didSubmitting && cartModal}
      {iseSubmitting && isSubmittingModal}
      {didSubmitting && didSubmitMpdal}
     </Modal>;
};

export default Cart;
