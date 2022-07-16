import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleRequest = createAsyncThunk("emailRequest", async (data, { rejectWithValue }) => {
	const { communicate } = useAxios();
	const result = await communicate("post", `/email-verification-request`, {
		id: data?.id,
		type: "emailVerification"
	});
	if (result.data.status === "success") {
		return true;
	} else {
		return rejectWithValue(result.data.error);
	}
});
