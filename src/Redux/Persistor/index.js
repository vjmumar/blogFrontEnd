import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { reducers as rootReducer } from "../CombineReducers";

const persistConfig = {
	key: "root",
	storage,
	blacklist: [
		"signUpStates",
		"emailVerificationStates",
		"authenticatedUserStoryStates",
		"createStoryStates",
		"storyCommentsStates",
		"pubAndDraftStoriesStates",
		"selectedUserStates",
		"storyActionsStates",
		"getRandomStoriesStates",
		"userFriendsStates",
		"userActionsStates",
		"emailVerificationStates",
		"forgotPasswordStates",
		"searchPeopleStates",
	],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
	const store = configureStore({
		reducer: persistedReducer,
		middleware: getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	});
	const persistor = persistStore(store);
	return { store, persistor };
};
