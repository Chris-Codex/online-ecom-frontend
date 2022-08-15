import { SET_CURRENT_USER } from "../actions/Authentication";
import checkIfEmpty from "../../generator/checkIfEmpty";

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        userProfile: action.userProfile,
        isAuth: !checkIfEmpty(action.payload),
      };
    default:
      return state;
  }
}
