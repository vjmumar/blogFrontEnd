/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { handleGetStoryWithAuthor } from "../../Redux/Slices/GetStoryWithAuthor/handleGetStoryWithAuthor";
// Hooks
import { useComponentShouldUpdate } from "../../Hooks/useComponendShouldUpdate";
import useComponentDidUnMount from "../../Hooks/useComponentDidUnMount";
// Router
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
// Routes
import { SIGN_IN } from "../../Routes/index";
// Toast
import { toast } from "react-toastify";
// Socket
import { socket } from "../../App";
import { handleGetComments } from "../../Redux/Slices/GetComments/handleGetComments";
import { handleStoryActions } from "../../Redux/Slices/StoryActions/handleStoryAction";

export const Context = createContext({});

export const ContextProvider = ({ children }) => {
	const [storyComments, setStoryComments] = useState([]);
	const [storyCommentsIncrement, setStoryCommentsIncrement] = useState(5);
	const [storyCommentsTotal, setStoryCommentsTotal] = useState(0);

	// Router Methods
	const params = useParams();
	const navigation = useNavigate();
	const [searchParams] = useSearchParams();
	const story = searchParams.get("story");

	// Redux Methods
	const dispatch = useDispatch();
	const { isSignIn } = useSelector((state) => state.signInStates);
	const {
		authenticatedUserData: { accountId: userId, firstName, lastName, imageLink },
	} = useSelector((state) => state.authenticatedUserDataStates);

	// Socket
	const joinStory = () => {
		socket.emit("story-join", { roomId: story });
	};

	const leaveStory = () => {
		socket.emit("story-leave", { roomId: story });
	};

	// Request
	const getStory = async () => {
		try {
			await dispatch(handleGetStoryWithAuthor({ id: params.id, story })).unwrap();
		} catch (err) {
			toast.error(err);
		}
	};

	const getComment = async () => {
		try {
			const result = await dispatch(
				handleGetComments({
					storyId: story,
					increment: storyCommentsIncrement,
				})
			).unwrap();
			setStoryComments(result?.comments);
			setStoryCommentsTotal(result?.size);
		} catch (err) {
			toast.error(err);
		}
	};

	// Actions
	const handleLikeAndUnlike = async () => {
		if (isSignIn) {
			await dispatch(
				handleStoryActions({
					storyId: story,
					type: "likeAndUnlike",
					ownerId: params.id,
				})
			).unwrap();
		} else {
			navigation(SIGN_IN);
		}
	};

	const handleBookmarkAndUnBookmark = async () => {
		if (isSignIn) {
			await dispatch(
				handleStoryActions({
					storyId: story,
					type: "bookmarkAndUnBookmark",
					ownerId: params.id,
				})
			).unwrap();
		} else {
			navigation(SIGN_IN);
		}
	};

	const handleSendComment = async (data) => {
		if (isSignIn) {
			const obj = {
				storyId: story,
				senderImage: imageLink,
				senderFirstName: firstName,
				senderLastName: lastName,
				sender: userId,
				text: data,
				dateCreated: new Date(),
				status: "Sending",
			};
			setStoryComments((prev) => [...prev, obj]);
			setStoryCommentsTotal((prev) => ++prev);
			socket.emit("story-sendComment", obj);
		} else {
			navigation(SIGN_IN);
		}
	};

	const handleIncrementComments = () => {
		setStoryCommentsIncrement((prev) => (prev += 5));
	};

	// Listen To Socket
	socket.off("story-commentSent").on("story-commentSent", (data) => {
		const storyCommentsClone = [...storyComments, data].filter((e) => !e?.status);
		setStoryComments(storyCommentsClone);
	});

	useComponentShouldUpdate(() => {
		leaveStory();
		joinStory();
		getStory();
		getComment();
	}, [story]);

	useComponentDidUnMount(() => {
		leaveStory();
	});

	useComponentShouldUpdate(() => {
		getComment();
	}, [storyCommentsIncrement]);

	return (
		<Context.Provider
			value={{
				storyComments,
				storyCommentsTotal,
				handleSendComment,
				handleIncrementComments,
				handleLikeAndUnlike,
				handleBookmarkAndUnBookmark
			}}
		>
			{children}
		</Context.Provider>
	);
};
