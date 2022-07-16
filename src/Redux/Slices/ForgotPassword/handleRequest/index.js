import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleRequest = createAsyncThunk("forgotPassword", async (data, { rejectWithValue }) => {
	const { communicate } = useAxios();
	const result = await communicate("post", `/email-verification-request`, {
		email: data?.email,
		type: "changePassword"
	});
	if (result.data.status === "success") {
		return true;
	} else {
		return rejectWithValue(result.data.error);
	}
});
