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
const GET_CART = 'GET_CART',
      CLEAR_ITEM = 'CLEAR_ITEM',
      ADD_TO_CART = 'ADD_TO_CART',
      DECREASE_QUANTITY = 'REDUCE_QUANTITY',
      INCREASE_QUANTITY = 'INCREASE_QUANTITY',
      CLEAR_CART = 'CLEAR_CART';

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

// export function getCart(){
//     return{
//         type: GET_CART,
//         payload: item_id
//     }
// }
 

// export function clearCart(){
//     return{
//         type: CLEAR_CART,
//         payload: item_id
//     }
// }

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    let updatedCart;
    let updatedItemIndex;

    switch (type) {
        case INCREASE_QUANTITY:
            updatedCart = {...state.cart};
            updatedItemIndex = updatedCart.items.find((item) => {
                return item.item_id === payload;
            })
            updatedItemIndex.quantity += 1;
            updatedCart.totalNumItems += 1;
            return{
                ...state,
                cart: updatedCart
            }

        case DECREASE_QUANTITY:
            updatedCart = {...state.cart};
            // updatedItemIndex = updatedCart.findIndex(item => item.item_id === payload.item_id);
            updatedItemIndex = updatedCart.items.find((item) => {
                return updatedCart.items.item_id === payload.item_id;
            })
            updatedItemIndex.quantity -= 1;
            updatedCart.totalNumItems -=1;
            return{
                ...state,
                cart: updatedCart
            }

        case ADD_TO_CART:
            // console.log('/////')
            // console.log({payload});
            //setting a temp cart
            updatedCart = {...state.cart};
            //finding the correct index to operate in
            updatedItemIndex = state.cart.items.findIndex((item) => {
                console.log(payload.item_id, item.item_id);
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
            } else {
                let [updatedItem] = state.cart.items.splice(updatedItemIndex, 1);
                updatedItem.quantity += 1;
                // console.log(updatedItem);
                return {
                    ...state, cart: {
                        items: [...state.cart.items, updatedItem],
                        totalPrice: state.cart.totalPrice + payload.price,
                        totalNumItems: state.cart.totalNumItems + 1 
                    }
                }
            }
        
        case CLEAR_ITEM:
            updatedCart = {...state.cart};
            updatedItemIndex = updatedCart.find((item) => {
                return item.item_id === payload;
            });

            updatedCart.splice(updatedItemIndex, 1);
            updatedCart.totalNumItems -= 1;

            return{...state, cart: updatedCart}

        default: return state;
    }
}

export default reducer;