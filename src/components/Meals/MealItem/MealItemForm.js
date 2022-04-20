import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import style from './MealItemForm.module.css';

const MealItemForm = props =>{
  const amountRef =  useRef();
  const [amountIsValid,setAmountIsValid] = useState(true);
    const submitHnadler = event =>{
      event.preventDefault();

      const enteredAmount = amountRef.current.value;
      const entertAmountNumber = +enteredAmount;

      if(enteredAmount.trim().length === 0 || entertAmountNumber < 1 || entertAmountNumber >5){
        setAmountIsValid(false);
          return;
      }
      props.onAddToCard(entertAmountNumber);
    }
    return <form className={style.form} onSubmit={submitHnadler}>
        <Input  ref={amountRef} label='Amount' input={{
        
            id: 'amount_' +props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }} />
        {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
        <button>+ Add</button>
    </form>
};

export default MealItemForm;