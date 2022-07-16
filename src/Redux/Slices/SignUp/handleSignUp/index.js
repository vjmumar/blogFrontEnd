import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleSignUp = createAsyncThunk("signUp", async (data, { rejectWithValue }) => {
    const { communicate } = useAxios();
	const result = await communicate('post',`/signup`, data);
	if (result.data.status === "success") {
		return true;
	} else {
		return rejectWithValue(result.data.error);
	}
});
