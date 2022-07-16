import { SET_USER_ID_TYPE } from "../../Types"

export const SET_USER_ID_ACTION = (payload) => {
    return {
        type: SET_USER_ID_TYPE,
        payload: payload
    }
}