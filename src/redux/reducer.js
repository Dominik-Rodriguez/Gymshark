// import { bindActionCreators } from "redux";

import { $CombinedState } from "redux";

const initialState = {
    cart: {
        items: [],
        totalPrice: 0,
        totalNumItems: 0
    }
}


//action types
const CLEAR_ITEM = 'CLEAR_ITEM',
      ADD_TO_CART = 'ADD_TO_CART',
      DECREASE_QUANTITY = 'REDUCE_QUANTITY',
      INCREASE_QUANTITY = 'INCREASE_QUANTITY';
    //   CLEAR_CART = 'CLEAR_CART'

export function increaseQuantity(item_id){
    return{
        type: INCREASE_QUANTITY,
        payload: item_id
    }
}

export function decreaseQuantity(item_id){
    return{
        type: DECREASE_QUANTITY,
        payload: item_id
    }
}

export function addToCart(item_id){
    return{
        type: ADD_TO_CART,
        payload: item_id
    }
}

export function clearItem(item_id){
    return{
        type: CLEAR_ITEM,
        payload: item_id
    }
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    let updatedCart;
    let updatedItemIndex;

    switch (type) {
        case INCREASE_QUANTITY:
            updatedCart = {...state.cart};
            updatedItemIndex = state.cart.items.findIndex((item) => {
                return payload === item.item_id;
            })
            let [updateItem] = state.cart.items.splice(updatedItemIndex, 1);
            updateItem.quantity += 1;
            return{
                ...state, cart:{
                    items: [
                        ...state.cart.items, updateItem
                    ],
                    totalPrice: state.cart.totalPrice + updateItem.price,
                    totalNumItems: state.cart.totalNumItems + 1
                }
            }

        case DECREASE_QUANTITY:
            updatedCart = {...state.cart};
            updatedItemIndex = state.cart.items.findIndex((item) => {
                return payload === item.item_id;
            })
            let [updatedItem] = state.cart.items.splice(updatedItemIndex, 1);
            if(updatedItem.quantity === 1){
                return{
                    ...state, cart:{
                        items: [
                            ...state.cart.items, updatedItem
                        ],
                        totalPrice: state.cart.totalPrice,
                        totalNumItems: state.cart.totalNumItems
                    } 
                }
            }
            updatedItem.quantity -= 1;
            return{
                ...state, cart:{
                    items: [
                        ...state.cart.items, updatedItem
                    ],
                    totalPrice: state.cart.totalPrice - updatedItem.price,
                    totalNumItems: state.cart.totalNumItems - 1
                }
            }

        case ADD_TO_CART:
            updatedCart = {...state.cart};
            updatedItemIndex = state.cart.items.findIndex((item) => {
                return payload.item_id === item.item_id;
            })
            if(updatedItemIndex < 0){
                return {
                    ...state, cart: {
                        items: [...state.cart.items, payload],
                        totalPrice: state.cart.totalPrice + payload.price,
                        totalNumItems: state.cart.totalNumItems + 1 
                    }
                }
            } else if(payload.size === state.cart.items[updatedItemIndex].size) {
                let [updatedItem] = state.cart.items.splice(updatedItemIndex, 1);
                updatedItem.quantity += 1;
                return {
                    ...state, cart: {
                        items: [...state.cart.items, updatedItem],
                        totalPrice: state.cart.totalPrice + payload.price,
                        totalNumItems: state.cart.totalNumItems + 1 
                    }
                }
            } else {
                return {
                    ...state, cart: {
                        items: [...state.cart.items, payload],
                        totalPrice: state.cart.totalPrice + payload.price,
                        totalNumItems: state.cart.totalNumItems + 1 
                    }
                }
            }
        
        case CLEAR_ITEM:
            updatedCart = {...state.cart};
            updatedItemIndex = state.cart.items.findIndex((item) => {
                return payload.item_id === item.item_id;
            })

            let [removeItem] = state.cart.items.splice(updatedItemIndex, 1);
            updatedCart.totalNumItems -= 1;

            return{
                ...state, cart:{
                    items: [...state.cart.items],
                    totalPrice: state.cart.totalPrice - removeItem.price,
                    totalNumItems: state.cart.totalNumItems - 1
                }
            }
        default: return state;
    }
}

export default reducer;