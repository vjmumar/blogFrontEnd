import React, { createContext } from "react";
// Router
import { useNavigate } from "react-router-dom";
// Toast
import { toast } from "react-toastify";
// Hooks
import useComponentDidUnMount from "../../Hooks/useComponentDidUnMount";
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";
// Redux
import { useDispatch } from "react-redux";
import { handleCreateStory } from "../../Redux/Slices/CreateStory/handleCreateStory";
import { handleEditStory } from "../../Redux/Slices/CreateStory/handleEditStory";
import { handleGetAuthenticatedUserStory } from "../../Redux/Slices/GetAuthenticatedUserStory/handleGetStory";
import { reset as resetCreateStory } from "../../Redux/Slices/CreateStory";
import { reset as resetStory } from "../../Redux/Slices/GetAuthenticatedUserStory";
// Router
import { useSearchParams } from "react-router-dom";
// Routes
import { MY_STORIES_ROUTE } from "../../Routes";

export const Context = createContext({});

export const ContextProvider = ({ children }) => {
	// Router Methods
	const [searchParams] = useSearchParams();
	const editParams = searchParams.get("edit");
	// Router Methods
	const navigation = useNavigate();
	const dispatch = useDispatch();

	const handleUpload = async (obj) => {
		try {
			const result = await dispatch(handleCreateStory(obj)).unwrap();
			toast.success(result);
			navigation(MY_STORIES_ROUTE + `?type=${obj.get("type")}-stories`);
		} catch (err) {
			toast.error(err);
		}
	};

	const handleEdit = async (obj) => {
		if (editParams) {
			try {
				obj.append("id", editParams);
				const result = await dispatch(handleEditStory(obj)).unwrap();
				toast.success(result);
				navigation(MY_STORIES_ROUTE + `?type=${obj.get("type")}-stories`);
			} catch (err) {
				toast.error(err);
			}
		}
	};

	const getStory = async () => {
		if (editParams) {
			try {
				await dispatch(handleGetAuthenticatedUserStory({ id: editParams })).unwrap();
			} catch (err) {
				toast.error(err);
			}
		}
	};

	useComponentDidMount(() => {
		getStory();
	});

	useComponentDidUnMount(() => {
		dispatch(resetCreateStory());
		dispatch(resetStory());
	});

	return <Context.Provider value={{ handleUpload, handleEdit }}>{children}</Context.Provider>;
};

export default ContextProvider;
