import { ActionType } from "../contants/action-type";

const initialState = {
  products: [],
};
let ca = localStorage.getItem("rcart")
const INIT_STATE = {
  cartitem: JSON.parse(ca) || {}
};

const MY_ORDERS = {
  myorder : {}
}

const initialVariant = {
  allvariants:[]
}

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionType.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionType.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionType.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const addTocartReducer = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case ActionType.ADD_TO_CART:
      const slug = payload.slug;
      const price = payload.price;
      const itemname = payload.title;
      const size = payload.size;
      const variant = payload.color;
      const qty = 1;
      let newCart = state.cartitem;
      if (slug in state.cartitem) {
        newCart[slug].qty = newCart[slug].qty + qty;
      } else {
        newCart[slug] = { qty: 1, price, itemname, size, variant };
      }
      localStorage.setItem("rcart",JSON.stringify(newCart))
      return {
        ...state,
        cartitem: { ...state.cartitem },
      };
    case ActionType.DEC_ITEM_IN_CART:
        const slugi = payload.slug;
        const qtyy = 1;
        let newCartt = state.cartitem;
        if (slugi in state.cartitem) {
          newCartt[slugi].qty = newCartt[slugi].qty - qtyy;
        }
        if (newCartt[slugi]["qty"] <= 0) {
          delete newCartt[slugi];
        }
        localStorage.setItem("rcart",JSON.stringify(newCartt))
        return {
          ...state,
          cartitem: { ...state.cartitem },
        };
    case ActionType.REMOVE_FROM_CART:
        localStorage.setItem("rcart",JSON.stringify({}))
        return {
            ...state,
            cartitem: {},
          };
    default:
      return state;
  }
};

export const dcrTocartReducer = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case ActionType.DEC_ITEM_IN_CART:
      const slug = payload.slug;
      const qty = 1;
      let newCart = state.cartitem;
      if (slug in state.cartitem) {
        newCart[slug].qty = newCart[slug].qty - qty;
      }
      if (newCart[slug]["qty"] <= 0) {
        delete newCart[slug];
      }
      localStorage.setItem("rcart",JSON.stringify(newCart))
      return {
        ...state,
        cartitem: { ...state.cartitem },
      };
    
    case ActionType.REMOVE_FROM_CART:
        localStorage.setItem("rcart",JSON.stringify({}))
        return {
            ...state,
            cartitem: {},
          };
    default:
      return state;
  }
};

export const myorderreducer = (state=MY_ORDERS,{type,payload})=>{
  switch (type) {
    case ActionType.FETCH_MY_ORDER:
      return{
        ...state,
        myorder:payload
      }
  
    default:
      return state
  }
}

export const myorderdetailreducer = (state={},{type,payload})=>{
  switch (type) {
    case ActionType.FETCH_MY_ORDER_DETAILS:
      return{
        ...state,...payload
      }
    case ActionType.REMOVE_FETCH_MY_ORDER_DETAILS:
      return {}
    default:
      return state
  }
}

export const allvariantreducer = (state=initialVariant,{type,payload})=>{
  switch (type) {
    case ActionType.SET_ALL_VARIANTS:
      return {
        ...state, allvariants:payload
      }
    case ActionType.RESET_ALL_VARIANTS:
      return {
        ...state, allvariants:[]
      }
  
    default:
      return state
  }
}