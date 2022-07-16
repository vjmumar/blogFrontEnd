import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import { useAxios } from "../../../../Helpers";

export const handleSearchStories = createAsyncThunk(
	"searchStories",
	async (data, { rejectWithValue, fulfillWithValue, getState }) => {
		const { userId: accountId } = getState().signInStates;
		const { communicate } = useAxios();
		const result = await communicate("post", "/search-stories", {...data, accountId});
		if (result.data.status === "success") {
			return fulfillWithValue(result?.data?.data);
		} else {
			return rejectWithValue(result?.data?.error);
		}
	}
);