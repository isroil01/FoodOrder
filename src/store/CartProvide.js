import React, { useReducer } from "react";
import CartContext from "./cartContext";


const defaultState = {
    item: [],
    totalAmount: 0
}

const cartReducer = (state,action) =>{

    if(action.type === 'ADD'){
               const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;
               const exitingCArtItem = state.item.findIndex(item=> item.id === action.item.id);

               const exitingCartItems = state.item[exitingCArtItem]
               
               let updatedItems;

               if(exitingCartItems){
                  
                const  updateItem={
                       ...exitingCartItems,
                       amount: exitingCartItems.amount + action.item.amount
                   };
                   updatedItems = [...state.item];
                   updatedItems[exitingCArtItem] = updateItem;
               }else{
                    updatedItems = state.item.concat(action.item)
               }
     
      
 
        return {
            item: updatedItems,
            totalAmount: newTotalAmount
        }
    }
    if(action.type === 'DELETE'){
        const exitingCartItemIndex = state.item.findIndex(item=> item.id === action.id);
        const exitingItem = state.item[exitingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - exitingItem.price;
        let updatedItems ;
        if(exitingItem.amount ===1){
             updatedItems = state.item.filter(item => item.id !== action.id);
        }else{
            const updatedItem = {...exitingItem, amount: exitingItem.amount -1};
            updatedItems = [...state.item];
            updatedItems[exitingCartItemIndex] = updatedItem;
        }
        return{
            item: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultState;
}

const CartProvide = (props) => {

    const [cartState,dispatchCart] = useReducer(cartReducer,defaultState);

    const addItemHabndeler = (item) =>{
        dispatchCart({type: 'ADD' , item: item})
    };

    const removeHandeler = (id) =>{
        dispatchCart({type: 'DELETE', id})
    };


    const cartContext = {
        item: cartState.item,
        totalAmount: cartState.totalAmount,
        addItem: addItemHabndeler,
        removeItem: removeHandeler
    }

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvide;
