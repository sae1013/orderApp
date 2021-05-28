import React,{useState,useContext} from 'react'
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from'../Cart/CartItem';
import CartContext from '../../store/cart-context'; 
import Checkout from './Checkout';
import env from 'react-dotenv';

function Cart(props) {
    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [didSubmit,setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length>0;
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item,amount:1});
    };
    const orderHandler = ()=> {
        setIsCheckout(true);
    };
    const submitOrderHandler = async(userData)=>{
        setIsSubmitting(true);
        const response = await fetch(process.env.REACT_APP_REQUEST_ORDER,{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item=>
        <CartItem 
         key={item.id}
         id = {item.id}
         name={item.name} 
         amount={item.amount} 
         price={item.price}
         onRemove = {cartItemRemoveHandler.bind(null,item.id)}
         onAdd = {cartItemAddHandler.bind(null,item)}
         ></CartItem>)}
        </ul>

    const modalActions = <div className={classes.actions}>
    <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
    
    const cartModalContent = (
        <React.Fragment>
            {cartItems} 
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose} onConfirm ={submitOrderHandler}/>}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = 
    <React.Fragment>
        <p>Successfully sent the order</p>
        <div className={classes.actions}>
        <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>;

    return (
        <Modal onClose = {props.onClose}>
            {!isSubmitting && !didSubmit&& cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart

