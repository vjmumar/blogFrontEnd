import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleSignIn = createAsyncThunk("signIn", async (data, { rejectWithValue }) => {
	const { communicate } = useAxios();
	const result = await communicate("post", `/signin`, data);
	if (result.data.status === "success") {
		return result.data.data;
	} else {
		return rejectWithValue(result.data.error);
	}
});
