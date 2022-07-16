import React, { useContext, useState } from "react";
// Components
import { VStack, Text, Divider } from "@chakra-ui/react";
import FollowedPeople from "./Followed";
import Friends from "./Friends";
import UserActionButtons from "./UserActionButton";
import { Modal } from "../FriendsAndFollowedModal";
import Blank from "./Description/Blank";
import AboutMe from "./Description/AboutMe";
import UserImage from "./Description/UserImage";
// Context
import { Context } from "../../../Pages/ProfilePage/context";
// Icons
// React hook form
import { useForm } from "react-hook-form";
// Toast
import { toast } from "react-toastify";
// Helper
import { bytesToMb, dateFormatter, numberFormatter } from "../../../Helpers";
// Redux
import { useSelector } from "react-redux";

const Information = () => {
	const { handleAction, handleEditInformation, getFollowedUsers, getFriends } =
		useContext(Context);

	// Modal
	const [isOpen, setIsOpen] = useState({
		open: false,
		type: "",
	});

	// Edited Photo
	const [editPhoto, setEditPhoto] = useState("");

	// Redux Methods
	const { isLoading: profileLoading, profile } = useSelector((state) => state.profileStates);
	const { isLoading: actionLoading } = useSelector((state) => state.userActionsStates);

	const { handleSubmit, register } = useForm();
	const [isEdit, setIsEdit] = useState(false);

	const handleEdit = (data) => {
		setIsEdit((prev) => !prev);
		const formData = new FormData();
		const image = data.profilePicture[0];
		formData.append("type", "editInformation");
		formData.append("media", image);
		formData.append("profileDescription", data.profileDescription);
		if (bytesToMb(image?.size) > 2) {
			toast.error("Profile Picture File Size Must Not Exceed 2mb");
		} else if (image && !image.type.includes("image")) {
			toast.error("Please Choose An Image");
		} else {
			handleEditInformation(formData);
		}
	};

	const handleEditPhoto = (e) => {
		const file = e.target.files[0];
		const blob = URL.createObjectURL(file);
		if (file.type.includes("image")) {
			setEditPhoto(blob);
		} else {
			toast.error("Please Choose An Image");
		}
	};

	const handleToggleModal = (type) => {
		setIsOpen((prev) => ({ ...prev, open: !prev.open, type }));
	};

	return (
		<VStack
			overflow={"hidden"}
			w={"100%"}
			bg={"white"}
			border={{ base: "none",lg: "1px solid #E6E6E6" }}
			borderRadius={{ base: "0px", lg: "10px" }}
			mt={"0px !important"}
		>
			<Blank setIsEdit={setIsEdit} isCurrentUser={profile?.isCurrentUser} />
			<UserImage
				profileLoading={profileLoading}
				actionLoading={actionLoading}
				editPhoto={editPhoto}
				handleEditPhoto={handleEditPhoto}
				register={register}
				imageLink={profile?.imageLink}
				isEdit={isEdit}
			/>
			<Text textAlign={"center"} fontSize={"20px"}>
				{profile?.firstName} {profile?.lastName}
			</Text>
			<VStack mt={"0px !important"} p={"15px 15px 25px 15px"} w={"100%"}>
				<UserActionButtons profile={profile} handleAction={handleAction} />
				<AboutMe
					isEdit={isEdit}
					profileLoading={profileLoading}
					register={register}
					handleEdit={handleEdit}
					handleSubmit={handleSubmit}
					aboutMe={profile?.aboutMe}
				/>
				<Divider />
				<Text textAlign={"left"} w={"100%"}>
					Joined: {dateFormatter(profile?.dateCreated)}
				</Text>
				<Divider />
				<Text textAlign={"left"} w={"100%"}>
					Followers: {numberFormatter(profile?.followers?.length || 0)}
				</Text>
				<Divider />
				<FollowedPeople handleOpenModal={handleToggleModal} />
				<Divider />
				<Friends handleOpenModal={handleToggleModal} />
				<Modal
					getFriends={getFriends}
					getFollowedUsers={getFollowedUsers}
					isOpen={isOpen.open}
					type={isOpen.type}
					handleClose={handleToggleModal}
				/>
			</VStack>
		</VStack>
	);
};

export default Information;
