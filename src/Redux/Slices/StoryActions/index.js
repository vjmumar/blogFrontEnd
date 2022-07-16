import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleStoryActions as action } from "./handleStoryAction";

const storyActionSlice = createSlice({
    name: "storyAction",
    initialState: {
        isLoading: false
    },
    reducers: {},
    extraReducers: {
        [action.pending]: (state) => {
            state.isLoading = true;
        },
        [action.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [action.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const {} = storyActionSlice.actions;
export default storyActionSlice.reducer