import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_ITEM_FROM_CART,
  INCREASE_QUANTITY,
} from "../constants";

export const addToCart = (payload) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload,
  };
};

export const removeItemFromCart = (payload) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload,
  };
};

export const clearItemFromCart = () => {
  return {
    type: CLEAR_ITEM_FROM_CART,
  };
};

export const increaseQuantity = (payload) => {
  return {
    type: INCREASE_QUANTITY,
    payload,
  };
};
