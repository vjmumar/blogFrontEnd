import { SET_SIGN_IN_TYPE } from "../../Types";

export const SET_SIGN_IN_REDUCER = (state = false, action) => {
  switch(action.type) {
      case SET_SIGN_IN_TYPE: return state = action.payload
      default: return state
  }
}