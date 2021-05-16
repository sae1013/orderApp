import React, { createContext } from 'react'

const CartContext= React.createContext({ //auto Completion 을 위해 작성
    items:[], // 아이템객체들
    totalAmount:0,
    addItem:(item) =>{},
    removeItem:(id)=>{},
});

export default CartContext;