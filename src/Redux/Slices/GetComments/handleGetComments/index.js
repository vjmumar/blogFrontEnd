import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import { useAxios } from "../../../../Helpers";

export const handleGetComments = createAsyncThunk(
	"getComments",
	async (data, { rejectWithValue, fulfillWithValue }) => {
		const { communicate } = useAxios();
		const result = await communicate("post", "/story-actions", {...data, type: "getComments"});
		if (result.data.status === "success") {
			return fulfillWithValue(result?.data?.data);
		} else {
			return rejectWithValue(result?.data?.error);
		}
	}
);
