import { SET_USER_ID_TYPE } from "../../Types";

export const SET_USER_ID_REDUCER = (state = '', action) => {
  switch(action.type) {
      case SET_USER_ID_TYPE: return state = action.payload
      default: return state
  }
}