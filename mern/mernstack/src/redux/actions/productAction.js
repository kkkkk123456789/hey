import { ActionType } from "../contants/action-type"

export const setProducts = (products)=>{
    return{
        type:ActionType.SET_PRODUCTS,
        payload:products
    }
}
export const selectedProducts = (product)=>{
    return{
        type:ActionType.SELECTED_PRODUCT,
        payload:product
    }
}
export const resetProducts = ()=>{
    return{
        type:ActionType.REMOVE_SELECTED_PRODUCT,
    }
}

export const addTocart = (product)=>{
    return{
        type:ActionType.ADD_TO_CART,
        payload:product
    }
}
export const removeFromcart = ()=>{
    return{
        type:ActionType.REMOVE_FROM_CART
    }
}

export const incrementCartItem = (slug,price,title,size,color)=>{
    const product = {slug,price,title,size,color}
    return{
        type:ActionType.ADD_TO_CART,
        payload:product
    }
}
export const decrementCartItem = (slug)=>{
    const product = {slug}
    return{
        type:ActionType.DEC_ITEM_IN_CART,
        payload:product
    }
}
export const fetchmyorder = (order)=>{
    return{
        type:ActionType.FETCH_MY_ORDER,
        payload:order
    }
}

export const fetchmyorderdetails = (orderdetails)=>{
    return{
        type:ActionType.FETCH_MY_ORDER_DETAILS,
        payload:orderdetails
    }
}

export const remove_fetch_order_details = ()=>{
    return{
        type:ActionType.REMOVE_FETCH_MY_ORDER_DETAILS
    }
}

export const setallvariant = (variants)=>{
    return{
        type:ActionType.SET_ALL_VARIANTS,
        payload:variants
    }
}

export const resetallvariants = ()=>{
    return {
        type:ActionType.RESET_ALL_VARIANTS
    }
}