import { createStore, combineReducer, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducer({});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ThunkMiddleware))
);

export default store;
