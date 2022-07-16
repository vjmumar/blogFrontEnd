import React, { useState, createContext } from "react";
// Redux
import { useDispatch } from "react-redux";
import { handleActions } from "../../Redux/Slices/UserAction/handleActions";
import { handleGetNotification } from "../../Redux/Slices/GetNotifications/handleGetNotification";
import { clearNotifications } from "../../Redux/Slices/GetNotifications";
// Hooks
import { useComponentShouldUpdate } from "../../Hooks/useComponendShouldUpdate";
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";
// Components
import { toast } from "react-toastify";

export const Context = createContext({});

export const ContextProvider = ({ children }) => {
	const [increment, setIncrement] = useState(10);

	// Redux Methods
	const dispatch = useDispatch();

	const handleIncrement = () => {
		setIncrement((prev) => prev + 5);
	};

	const handleClearNotification = async () => {
		try {
			await dispatch(handleActions({ type: "clearNotifications" })).unwrap();
			dispatch(clearNotifications());
		} catch (err) {
			toast.error(err);
		}
	};

	useComponentDidMount(() => {
		dispatch(handleGetNotification({ increment, readAllNotifications: true }));
	});

	useComponentShouldUpdate(() => {
		dispatch(handleGetNotification({ increment, readAllNotifications: true }));
	}, [increment, dispatch]);

	return (
		<Context.Provider
			value={{ increment, handleIncrement, handleClearNotification }}
		>
			{children}
		</Context.Provider>
	);
};
