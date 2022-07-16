/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useState, createContext } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateFriendsPosition } from "../../Redux/Slices/GetUserFriends";
import { handleActions } from "../../Redux/Slices/UserAction/handleActions";
import { handleGetMessage } from "../../Redux/Slices/SelectedUser/handleGetMessage/index";
import { handleGetUserFriends } from "../../Redux/Slices/GetUserFriends/handleGetUserFriends";
import { handleGetNotification } from "../../Redux/Slices/GetNotifications/handleGetNotification";
// Router
import { useParams, useLocation } from "react-router-dom";
// Routes
import { NOTIFICATION_ROUTE } from "../../Routes";
// Hooks
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";
import useComponentDidUnMount from "../../Hooks/useComponentDidUnMount";
import { useComponentShouldUpdate } from "../../Hooks/useComponendShouldUpdate";
// Helper
import { truncateString } from "../../Helpers";
// Socket
import { socket } from "../../App";
// Toast
import { toast } from "react-toastify";

export const Context = createContext({});

export const ContextProvider = ({ children }) => {
	const [increment,setIncrement] = useState(10);
	const [roomId, setRoomId] = useState("");
	const [messages, setMessages] = useState([]);

	// Router Methods
	const location = useLocation();
	const params = useParams();

	// redux
	const dispatch = useDispatch();
	const { userId: accountId } = useSelector((state) => state.signInStates);

	// Listen on Sent Message
	socket.off("message-messagesSent").on("message-messagesSent", (msg) => {
		const messagesClone = [...messages, msg].filter((e) => !e.status);
		setMessages(messagesClone);
	});

	const joinRoom = () => {
		const roomId = () => {
			if (params.id > accountId) {
				return `${params.id}${accountId}`;
			} else {
				return `${accountId}${params.id}`;
			}
		};
		setRoomId(roomId());
		socket.emit("message-joinConversation", { roomId: roomId(), accountId });
	};

	const leaveRoom = () => {
		socket.emit("message-leaveConversation", { roomId, accountId });
	};

	const getFriends = async (search) => {
		try {
			await dispatch(
				handleGetUserFriends({ id: accountId, search, isMessage: true })
			).unwrap();
		} catch (err) {
			toast.error(err);
		}
	};

	const getMessage = async () => {
		try {
			const result = await dispatch(handleGetMessage({ id: params.id, increment })).unwrap();
			await getFriends();
			setMessages(result.messages || []);
			setIncrement(prev => prev + 10);
		} catch (err) {
			toast.error(err);
		}
	};

	const handleSendMessage = async (msg) => {
		try {
			const obj = {
				text: msg.message,
				sender: accountId,
				receiver: params.id,
				roomId,
				isReplyingTo: msg.replyingTo.length > 100
				? truncateString(msg.replyingTo, 150)
				: msg.replyingTo,
				status: "sending",
				media: msg.media
			}	
			setMessages((prev) => [...prev, {
				...obj,
				media: msg.media.map(e => e?.blob)
			}]);
			dispatch(updateFriendsPosition({ accountId: params.id, latestMessage: obj }));
			socket.emit("message-sendMessage", obj);
		} catch (err) {
			toast.error("Something Wrong. Please Try Again Later");
		}
	};

	const getNotifications = async () => {
		try {
			await dispatch(
				handleGetNotification({
					readAllNotifications: location.pathname === NOTIFICATION_ROUTE ? true : false,
				})
			).unwrap();
		} catch (err) {
			toast(err);
		}
	};

	const handleClearMessage = async () => {
		try {
			await dispatch(
				handleActions({
					selectedUser: params.id,
					type: "clearSelectedUserMessages",
				})
			).unwrap();
			setMessages([]);
		} catch (err) {
			toast.error(err);
		}
	};

	useComponentDidMount(() => {
		getFriends();
		if (params !== "ChooseUser") {
			dispatch(handleGetMessage(params));
			joinRoom();
		}
	});

	useComponentShouldUpdate(async () => {
		setMessages([]);
		leaveRoom();
		joinRoom();
		setIncrement(10);
		await getMessage();
		await getNotifications();
	}, [params.id]);

	useComponentDidUnMount(() => {
		leaveRoom();
	});

	return (
		<Context.Provider
			value={{
				getFriends,
				getMessage,
				handleSendMessage,
				handleClearMessage,
				messages,
				accountId,
				roomId,
			}}
		>
			{children}
		</Context.Provider>
	);
};
