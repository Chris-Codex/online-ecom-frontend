import { createStore, combineReducers, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import reducers
import cartList from "./Reducers/cartObj";

const reducer = combineReducers({
  cartList: cartList,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ThunkMiddleware))
);

export default store;
