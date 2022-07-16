import React, { createContext, useState } from "react";

// Constant
import {
	FOLLOWED_STORIES_PARAMS,
	LATEST_STORIES_PARAMS,
} from "./constant";

// Router
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleGetHomeStories } from "../../Redux/Slices/HomeStories/handleGetStories";

// Life Cycle Methods
import { useComponentShouldUpdate } from "../../Hooks/useComponendShouldUpdate";
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";

// Hooks
import { toast } from "react-toastify";

// Routes
import { SIGN_IN } from "../../Routes";

// Created Context
export const Context = createContext({});

export const ContextProvider = ({ children }) => {
	// Router Methods
	let location = useLocation();
	const [searchParams] = useSearchParams();
	const type = searchParams.get("type");
	const navigation = useNavigate();

	// Redux Method
	const dispatch = useDispatch();
	const { isSignIn, userId } = useSelector((state) => state.signInStates);

	// States
	const [storyIncrement, setStoryIncrement] = useState(5);

	// Functions That is Not Returning Something
	const handleTogglePage = (e) => {
		const name = e.target.getAttribute("name");
		location = {
			search: `?type=${name}`,
		};
		if (name !== type) {
			navigation(location);
		}

		if (!isSignIn && name === FOLLOWED_STORIES_PARAMS) {
			navigation(SIGN_IN);
		}
	};

	const handleIncrementStory = () => {
		setStoryIncrement((prev) => (prev += 5));
	};

	const getStories = async () => {
		try {
			await dispatch(
				handleGetHomeStories({ increment: storyIncrement, id: userId, type })
			).unwrap();
		} catch (err) {
			if (isSignIn) {
				toast.error(err);
			}
		}
	};

	useComponentDidMount(() => {
		location = {
			search: `?type=${LATEST_STORIES_PARAMS}`,
		};
		navigation(location);
		getStories();
	});

	useComponentShouldUpdate(() => {
		getStories();
	}, [storyIncrement, type]);

	return (
		<Context.Provider
			value={{
				storyIncrement,
				handleTogglePage,
				handleIncrementStory,
			}}
		>
			{children}
		</Context.Provider>
	);
};
