import React, { useRef, useState } from "react";
import style from './CheckOut.module.css';

const isEmpty = value => value.trim() === '';
//const isNotFiveChars = value => value.trim().length !== 5;

const CheckOut = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postCodeInputRef = useRef();
    const cityInputRef = useRef();

    const [formInputValidty,setFormInputValidty] = useState({
        name: true,
        street: true,
        city: true,
        postCode: true
    });

    const confirmHandeler = (e) =>{
           e.preventDefault();

           const enteredName = nameInputRef.current.value;
           const enteredStreet = streetInputRef.current.value;
           const enteredCity = cityInputRef.current.value;
           const enteredPostCode = postCodeInputRef.current.value;

           const enterdNameIsVAlid = !isEmpty(enteredName);
           const enterCityIsValid = !isEmpty(enteredCity);
           const enterStreetIsValid =  !isEmpty(enteredStreet);
           const enterdPostIsValid = !isEmpty(enteredPostCode);

           setFormInputValidty({
               name: enterdNameIsVAlid,
               street: enterStreetIsValid,
               city: enterCityIsValid,
               postCode: enterdPostIsValid
           })

           const formIsValid = enterdNameIsVAlid && enterCityIsValid && enterStreetIsValid && enterdPostIsValid;

           if(!formIsValid){
               return;
           }
   
           props.onSubmit({
               name: enteredName,
               city: enteredCity,
               street: enteredStreet,
               postCode: enteredPostCode
           });
    }

  return <form className={style.form} onSubmit={confirmHandeler}>
      <div className={`${style.control} ${formInputValidty.name? '' : style.invalid }`}>
          <label htmlFor="name">Your Name</label>
          <input type='text' id="name" ref={nameInputRef} />
          {!formInputValidty.name && <p>Please enter valid name</p>}
      </div>
      <div className={`${style.control} ${formInputValidty.street? '' : style.invalid }`}>
          <label htmlFor="street">Street</label>
          <input type='text' id="street" ref={streetInputRef} />
          {!formInputValidty.street && <p>Please enter valid street</p>}
      </div>
      <div className={`${style.control} ${formInputValidty.postCode? '' : style.invalid }`}>
          <label htmlFor="postal">Post Code</label>
          <input type='text' id="postal" ref={postCodeInputRef} />
          {!formInputValidty.postCode && <p>Please enter valid PostCode</p>}
      </div>
      <div className={`${style.control} ${formInputValidty.city? '' : style.invalid }`}>
          <label htmlFor="city">City</label>
          <input type='text' id="city" ref={cityInputRef} />
          {!formInputValidty.city && <p>Please enter valid City</p>}
      </div>
      <div className={style.actions}>
           <button type="button" onClick={props.onCancel}>Cancel</button>
           <button className={style.submit}>Confirm</button>
      </div>
     
  </form>;
};

export default CheckOut;
