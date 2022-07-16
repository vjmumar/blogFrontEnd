import { createAsyncThunk } from "@reduxjs/toolkit";
// Helper
import { useAxios } from "../../../../Helpers";

export const handleGetAuthenticatedUserData = createAsyncThunk(
	"getAuthenticatedUserData",
	async (data, { getState, rejectWithValue, fulfillWithValue }) => {
		const { token } = getState().signInStates;
		const { communicate } = useAxios(token);
		const result = await communicate("get", "/get-user", []);
		if (result.data.status === "success") {
			return fulfillWithValue(result.data.data);
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);
