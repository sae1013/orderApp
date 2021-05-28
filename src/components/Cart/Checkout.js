import React,{useState,useRef} from 'react'
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim().length =='';
const isFiveChars = value => value.trim().length ===5;

function Checkout(props) {
    const [formInputValidity,setFormInputValidity] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true,
    })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event)=> {
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);
        
        setFormInputValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postalCode:enteredPostalCodeIsValid,
            city:enteredCityIsValid
        });
        

        const formIsValid = enteredNameIsValid&&enteredStreetIsValid&&enteredPostalCodeIsValid&&enteredCityIsValid;
        if(!formIsValid){
            return;
        }
        //Submit cart dataprops.onConfirm
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postalCode:enteredPostalCode
        });
    };
    
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={`${classes.control} ${formInputValidity.name ? '': classes.invalid}`}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameInputRef}type='text' id='name' />
            {!formInputValidity.name && <p>enter valid value</p>}
          </div>
          <div className={`${classes.control} ${formInputValidity.street ? '': classes.invalid}`}>
            <label htmlFor='street'>Street</label>
            <input ref={streetInputRef} type='text' id='street' />
            {!formInputValidity.street && <p>enter valid value</p>}
          </div>
          <div className={`${classes.control} ${formInputValidity.postalCode ? '': classes.invalid}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input ref={postalCodeInputRef} type='text' id='postal' />
            {!formInputValidity.postalCode && <p>enter 5chars</p>}
          </div>
          <div className={`${classes.control} ${formInputValidity.city ? '': classes.invalid}`}>
            <label htmlFor='city'>City</label>
            <input ref={cityInputRef} type='text' id='city' />
            {!formInputValidity.city && <p>enter valid value</p>}
          </div>
          <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
              Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
          </div>
        </form>
      );
}

export default Checkout

