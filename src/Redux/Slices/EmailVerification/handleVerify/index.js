import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleVerify = createAsyncThunk("emailVerify", async (data, { rejectWithValue }) => {
	const { communicate } = useAxios();
	const result = await communicate("post", `/email-verification-verify`, {
		id: data?.id,
		token: data?.token,
	});

	if (result.data.status === "success") {
		return true;
	} else {
		return rejectWithValue(result.data.error);
	}
});
