import { useContext } from 'react';
import style from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import cartContext from '../../../store/cartContext';

const MealItem = props =>{
    const cartCtx = useContext(cartContext)

    const price = `$${props.price.toFixed(2)}`

    const addToCardHandeler = amount =>{
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    };

    return <li className={style.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={style.description}>{props.description}</div>
            <div className={style.price}>{price}</div>
        </div>
        <div>
            <MealItemForm id={props.id} onAddToCard={addToCardHandeler} />
        </div>
    </li>
}

export default MealItem;