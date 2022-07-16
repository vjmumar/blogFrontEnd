import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleGetRandomStories as get } from "./handleGetRandomStories";

const getRandomStoriesSlice = createSlice({
    name: "randomStories",
    initialState: {
        isLoading: false,
        stories: []
    },
    reducers: [],
    extraReducers: {
        [get.pending]: (state) => {
            state.isLoading = true;
        },
        [get.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.stories = payload;
        },
        [get.rejected]: (state) => {
            state.isLoading = false;
            state.stories = [];
        },
    }
});

export const {} = getRandomStoriesSlice.actions;
export default getRandomStoriesSlice.reducer