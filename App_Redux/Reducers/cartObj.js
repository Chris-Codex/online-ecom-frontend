import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_ITEM_FROM_CART,
} from "../constants";

const cartObj = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.payload];
    case REMOVE_ITEM_FROM_CART:
      return state.filter((item) => item.id !== action.payload);
    case CLEAR_ITEM_FROM_CART:
      return (state = []);
  }
  return state;
};

export default cartObj;
