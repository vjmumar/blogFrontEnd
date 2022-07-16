import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import { useAxios } from "../../../../Helpers";

export const handleActions = createAsyncThunk(
	"userAction",
	async (data, { fulfillWithValue, rejectWithValue, getState }) => {
		const { isSignIn, token } = getState().signInStates;
		if (!isSignIn) return rejectWithValue("User Not Sign In");
		const { communicate } = useAxios(token);
		const result = await communicate("post", "/user-action", data);
		if (result.data.status === "success") {
			return fulfillWithValue("Action Success");
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);
