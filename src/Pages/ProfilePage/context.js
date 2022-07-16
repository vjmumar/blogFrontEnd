/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { reset as resetProfile } from "../../Redux/Slices/GetProfile";
import { reset as resetActions } from "../../Redux/Slices/UserAction";
import { handleActions } from "../../Redux/Slices/UserAction/handleActions";
import { handleGetProfile } from "../../Redux/Slices/GetProfile/handleGetProfile";
import { handleGetUserFriends } from "../../Redux/Slices/GetUserFriends/handleGetUserFriends";
import { handleGetUserFollowedPeople } from "../../Redux/Slices/GetUserFollowedPeople/handleGetUserFollowedPeople";
import { handleGetPubAndDraftStories } from "../../Redux/Slices/GetPubAndDraftAndBookmarkedStories/handleGetStories";
// Hooks
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";
import { useComponentShouldUpdate } from "../../Hooks/useComponendShouldUpdate";
import useComponentDidUnMount from "../../Hooks/useComponentDidUnMount";
// Router
import { useParams, useNavigate } from "react-router-dom";
// Toast
import { toast } from "react-toastify";
// Routes
import { HOME_ROUTE } from "../../Routes";

export const Context = createContext({});

export const ContextProvider = ({ children }) => {
	const [storyFilter, setStoryFilter] = useState({ sort: "", searched: "" });
	const [storyIncrement, setStoryIncrement] = useState(5);
	// Redux Methods
	const dispatch = useDispatch();
	const { isSuccessful: actionSuccessful, isLoading } = useSelector(
		(state) => state.userActionsStates
	);

	// Router Methods
	const params = useParams();
	const navigation = useNavigate();
	const userId = params?.profileId;

	// actions
	const handleIncrementStory = () => {
		setStoryIncrement((prev) => (prev += 5));
	};

	// Request
	const getProfile = async () => {
		try {
			await dispatch(handleGetProfile({ profileId: params.profileId })).unwrap();
		} catch (err) {
			toast.error(err);
		}
	};

	const getFollowedUsers = async (search = "") => {
		try {
			await dispatch(handleGetUserFollowedPeople({ id: params.profileId, search })).unwrap();
		} catch (err) {
			toast.error(err);
		}
	};

	const getFriends = async (search = "") => {
		try {
			await dispatch(handleGetUserFriends({ id: params.profileId, search })).unwrap();
		} catch (err) {
			toast.error(err);
		}
	};

	const getStories = async (filters) => {
		try {
			await dispatch(
				handleGetPubAndDraftStories({
					increment: storyIncrement,
					id: params.profileId,
					type: "published-stories",
					...filters,
				})
			).unwrap();
		} catch (err) {
			toast.error(err);
		}
	};

	const handleFilterStories = async (filters) => {
		try {
			await dispatch(
				handleGetPubAndDraftStories({
					increment: storyIncrement,
					id: params.profileId,
					type: "published-stories",
					...filters,
				})
			).unwrap();
			setStoryFilter({
				sort: filters.sort,
				searched: filters.searched,
			});
		} catch (err) {
			toast.error(err);
		}
	};

	// Actions
	const handleAction = async (type) => {
		try {
			await dispatch(handleActions({ id: params.profileId, type })).unwrap();
			dispatch(resetActions());
		} catch (err) {
			toast.error(err);
			if (err === "Invalid Token") {
				navigation(HOME_ROUTE);
			}
		}
	};

	const handleEditInformation = async (data) => {
		try {
			await dispatch(handleActions(data)).unwrap();
			dispatch(resetActions());
		} catch (err) {
			toast.error(err);
			navigation(HOME_ROUTE);
		}
	};

	useComponentDidMount(() => {
		getProfile();
		getFollowedUsers();
		getFriends();
		getStories();
	});

	useComponentShouldUpdate(() => {
		getProfile();
		getStories(storyFilter);
		getFollowedUsers();
		getFriends();
	}, [storyIncrement, params, dispatch, actionSuccessful]);

	useComponentDidUnMount(() => {
		dispatch(resetProfile());
	});

	return (
		<Context.Provider
			value={{
				handleAction,
				handleIncrementStory,
				handleEditInformation,
				userId,
				storyIncrement,
				handleFilterStories,
				getFollowedUsers,
				getFriends
			}}
		>
			{children}
		</Context.Provider>
	);
};
