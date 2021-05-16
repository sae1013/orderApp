import React, { useContext,useEffect,useState } from 'react'
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

function HeaderCartButton(props) {
    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const items= cartCtx.items;

    const btnClasses= `${classes.button} ${btnHighlighted ? classes.bump: ' '}`
    const numberOfCartItems = items.reduce((curNumber,item)=>{
        return curNumber+ item.amount;
    }, 0);


    useEffect(()=>{ 
        if(items.length ===0){ 
            return;
        }
        setBtnHighlighted(true);
        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        }
    },[items]);

    return (
        <button className= {btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>    
            </span>            
            <span >Your Cart</span>            
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>            
        </button>
    )
}

export default HeaderCartButton
