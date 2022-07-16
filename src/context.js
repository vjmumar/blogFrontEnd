/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState } from "react";
// Redux
import { useSelector } from "react-redux";
// Hooks
import { useComponentDidMount } from "./Hooks/useComponendDidMount";
import { useComponentShouldUpdate } from "./Hooks/useComponendShouldUpdate";
// Socket
import { socket } from "./App";

export const Context = createContext({});

export const ContextProvider = ({ children }) => {
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { userId: accountId, isSignIn } = useSelector((state) => state.signInStates);

	const pushUserToOnlineUsers = () => {
		socket.emit("onlineUserConnect", { accountId });
	}

	useComponentDidMount(() => {
		if (isSignIn) {
			pushUserToOnlineUsers();
		}
	});

	useComponentShouldUpdate(() => {
		if (isSignIn) {
			pushUserToOnlineUsers();
		}
	},[isSignIn]);

	// Socket Listener
	socket.off("onlineUsers").on("onlineUsers", (data) => {
		setOnlineUsers(data);
	});

	return <Context.Provider value={{ onlineUsers }}>{children}</Context.Provider>;
};
