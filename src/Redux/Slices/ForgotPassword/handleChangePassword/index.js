import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleChangePassword = createAsyncThunk(
	"forgotPassword",
	async (data, { rejectWithValue, fulfillWithValue }) => {
		const { communicate } = useAxios();
		const result = await communicate("post", `/change-password`, {
			id: data?.id,
			token: data?.token,
			newPassword: data?.newPassword
		});

		if (result.data.status === "success") {
			return fulfillWithValue(result.data.data);
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);
