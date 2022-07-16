import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import { useAxios } from "../../../../Helpers";

export const handleSearchPeople = createAsyncThunk(
	"searchPeople",
	async (data, { rejectWithValue, fulfillWithValue, getState }) => {
		const { token, userId } = getState().signInStates;
		const { communicate } = useAxios(token);
		const result = await communicate("post", "/search-people", { ...data, accountId: userId });
		if (result.data.status === "success") {
			return fulfillWithValue(result?.data?.data);
		} else {
			return rejectWithValue(result?.data?.error);
		}
	}
);
