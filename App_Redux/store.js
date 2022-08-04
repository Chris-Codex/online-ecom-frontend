import { createStore, combineReducers, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import reducers
import cartObj from "./Reducers/cartObj";

const reducer = combineReducers({
  cartObj: cartObj,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ThunkMiddleware))
);

export default store;
