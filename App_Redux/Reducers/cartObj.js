import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_ITEM_FROM_CART,
  INCREASE_QUANTITY,
} from "../constants";

const cartList = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.payload];
    case REMOVE_ITEM_FROM_CART:
      return state.filter((item) => item.id !== action.payload);
    case CLEAR_ITEM_FROM_CART:
      return (state = []);

    case INCREASE_QUANTITY:
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
  }
  return state;
};

export default cartList;
