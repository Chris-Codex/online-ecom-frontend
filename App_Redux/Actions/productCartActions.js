import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_ITEM_FROM_CART,
} from "../constants";

export const addItemToCart = (payload) => {
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
