import { useContext, useEffect, useState } from 'react';
import cartContext from '../../store/cartContext';
import CartIcon from '../Cart/CartIcon';
import style from './HeaderCartButton.module.css'

const HeadrerCartButton = props =>{

    const cartCtx = useContext(cartContext);
    const [btnBump,setBtnBump] = useState(false);
const {item} = cartCtx
    const numberofItem = cartCtx.item.reduce((a,b)=>{
        return a + b.amount;
    },0);
    
    const btnClass = `${style.button} ${btnBump? style.bump : ''}`;
    useEffect(() =>{
        if(item.length ===0){
            return;
        }
      setBtnBump(true)

   const timer =  setTimeout(() =>{
          setBtnBump(false);
      },300);

      return () =>{
          clearTimeout(timer);
      }
    },[item])

    return <button className={btnClass} onClick={props.onClick}>
        <span className={style.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={style.badge}>{numberofItem}</span>
    </button>
}

export default HeadrerCartButton;