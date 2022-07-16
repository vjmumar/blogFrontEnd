import React, { createContext, useState } from "react";

// Constant
import { USERS_TYPE, STORIES_TYPE, STORIES_PARAMS, USER_PARAMS } from "./constant";

// Router
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

// Life Cycle Methods
import { useComponentShouldUpdate } from "../../Hooks/useComponendShouldUpdate";
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";

// Toast
import { toast } from "react-toastify";

// Redux
import { useDispatch } from "react-redux";
import { handleSearchStories } from "../../Redux/Slices/SearchStories/handleSearch";
import { handleSearchPeople } from "../../Redux/Slices/SearchPeople/handleSearch";

// Created Context
export const Context = createContext({});

export const ContextProvider = ({ children }) => {
	// Story
	const [storyIncrement, setStoryIncrement] = useState(5);

	// User
	const [userIncrement, setUserIncrement] = useState(5);

	// Router Methods
	const navigation = useNavigate();
	let location = useLocation();
	const params = useParams();
	const [searchParams] = useSearchParams();
	const type = searchParams.get("type");

	// Redux Methods
	const dispatch = useDispatch();

	// Functions That is Not Returning Something
	const handleTogglePage = (e) => {
		const name = e.target.getAttribute("name");
		if (name === STORIES_TYPE) {
			location = {
				search: `?type=${STORIES_PARAMS}`,
			};
		} else if (name === USERS_TYPE) {
			location = {
				search: `?type=${USER_PARAMS}`,
			};
		}
    	handleSearch();
		navigation(location);
	};

	const handleIncrementStory = () => {
		setStoryIncrement((prev) => (prev += 5));
	};

	const handleIncrementUser = () => {
		setUserIncrement((prev) => (prev += 5));
	};

	const handleSearch = async () => {
		try {
			const searched = params.search.trim().toLocaleLowerCase();
			await dispatch(
				handleSearchStories({
					increment: storyIncrement,
					searched: searched
				})
			).unwrap();
			await dispatch(
				handleSearchPeople({
					increment: userIncrement,
					searched: searched,
				})
			).unwrap();
		} catch (err) {
			toast.error(err);
		}
	};

	useComponentDidMount(() => {
		if (type === STORIES_PARAMS) {
			location = {
				search: `?type=${STORIES_PARAMS}`,
			};
		} else if (type === USER_PARAMS) {
			location = {
				search: `?type=${USER_PARAMS}`,
			};
		} else {
			location = {
				search: `?type=${STORIES_PARAMS}`,
			};
		}
		handleSearch();
		navigation(location);
	});

	useComponentShouldUpdate(() => {
		handleSearch();
	}, [params.search, storyIncrement, userIncrement, type]);

	return (
		<Context.Provider
			value={{
				storyIncrement,
				userIncrement,
				handleTogglePage,
				handleIncrementUser,
				handleIncrementStory,
			}}
		>
			{children}
		</Context.Provider>
	);
};
