/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";

// Constant
import {
	BOOKMARKED_STORIES_PARAMS,
	BOOKMARKED_STORIES_TYPE,
	DRAFT_STORIES_PARAMS,
	DRAFT_STORIES_TYPE,
	PUBLISHED_STORIES_PARAMS,
	PUBLISHED_STORIES_TYPE,
} from "./constant";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleGetPubAndDraftStories } from "../../Redux/Slices/GetPubAndDraftAndBookmarkedStories/handleGetStories";
import { handleRemoveStory } from "../../Redux/Slices/CreateStory/handleRemoveStory";
import { reset } from "../../Redux/Slices/CreateStory";

// Router
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// Life Cycle Methods
import { useComponentShouldUpdate } from "../../Hooks/useComponendShouldUpdate";
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";
// Toast
import { toast } from "react-toastify";

// Created Context
export const Context = createContext({});

export const ContextProvider = ({ children }) => {
	// Router Methods
	let location = useLocation();
	const [searchParams] = useSearchParams();
	const type = searchParams.get("type");
	const naviagtion = useNavigate();

	const [activeType, setActiveType] = useState(PUBLISHED_STORIES_TYPE);
	const [storyIncrement, setStoryIncrement] = useState(5);
	const [storyFilter, setStoryFilter] = useState({
		sort: "",
		searched: "",
	});

	// Redux
	const { userId } = useSelector((state) => state.signInStates);
	const { isSuccessful } = useSelector((state) => state.createStoryStates);
	const dispatch = useDispatch();

	// Actions
	const handleTogglePage = (e) => {
		const name = e.target.getAttribute("name");
		setActiveType(name);
		setStoryIncrement(5);
		if (name === PUBLISHED_STORIES_TYPE) {
			location = {
				search: `?type=${PUBLISHED_STORIES_PARAMS}`,
			};
		} else if (name === DRAFT_STORIES_TYPE) {
			location = {
				search: `?type=${DRAFT_STORIES_PARAMS}`,
			};
		} else if (name === BOOKMARKED_STORIES_TYPE) {
			location = {
				search: `?type=${BOOKMARKED_STORIES_PARAMS}`,
			};
		}
		naviagtion(location);
	};

	const handleIncrementStory = () => {
		setStoryIncrement((prev) => (prev += 5));
	};

	const handleRemove = async (id) => {
		try {
			await dispatch(handleRemoveStory({ id })).unwrap();
			dispatch(reset());
		} catch (err) {
			toast.error(err);
		}
	};

	// Request
	const handleGetStories = async (filters) => {
		try {
			await dispatch(
				handleGetPubAndDraftStories({ storyIncrement, type, id: userId, ...filters })
			).unwrap();
		} catch (err) {
			toast.error(err);
		}
	};

	const handleFilterStories = async (filters) => {
		try {
			await dispatch(
				handleGetPubAndDraftStories({ storyIncrement, type, id: userId, ...filters })
			).unwrap();
			setStoryFilter({
				sort: filters.sort,
				searched: filters.searched,
			});
		} catch (err) {
			toast.error(err);
		}
	};

	useComponentDidMount(() => {
		location = {
			search: `?type=${PUBLISHED_STORIES_PARAMS}`,
		};
		!type && naviagtion(location);
	});

	useComponentShouldUpdate(() => {
		type && handleGetStories(storyFilter);
	}, [storyIncrement, type, dispatch, isSuccessful]);

	return (
		<Context.Provider
			value={{
				activeType,
				storyIncrement,
				handleTogglePage,
				handleIncrementStory,
				handleRemove,
				type,
				handleFilterStories,
			}}
		>
			{children}
		</Context.Provider>
	);
};
