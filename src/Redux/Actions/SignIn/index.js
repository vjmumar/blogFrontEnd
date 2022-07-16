import { SET_SIGN_IN_TYPE } from "../../Types"

export const SET_SIGN_IN_ACTION = (payload) => {
    return {
        type: SET_SIGN_IN_TYPE,
        payload: payload
    }
}