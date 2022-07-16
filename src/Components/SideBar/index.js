/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { memo, useState } from "react";
// Router
import { useLocation, Link } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { handleGetAuthenticatedUserData } from "../../Redux/Slices/AuthenticatedUserData/handleGetUserData";
import { handleGetNotification } from "../../Redux/Slices/GetNotifications/handleGetNotification";
// Components
import { Text, Stack, VStack } from "@chakra-ui/react";
import UserOptions from "./UserOptions";
import SideBarIcon from "./Icon";
// Icons
import { AiOutlineHome, AiFillHome, AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { BsPencil, BsPencilFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { GiNotebook } from "react-icons/gi";
import { FaBlog } from "react-icons/fa";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { RiSearch2Line, RiSearchFill } from "react-icons/ri";
// Socket
import { socket } from "../../App";
// Hooks
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";
// Routes
import {
	CREATE_STORY_ROUTE,
	HOME_ROUTE,
	MY_STORIES_ROUTE,
	MESSAGE_ROUTE,
	NOTIFICATION_ROUTE,
	SEARCH_ROUTE,
} from "../../Routes";
// Toast
import { toast } from "react-toastify";

const SideBar = memo(() => {
	const [isOpen, setIsOpen] = useState(false);
	// Router Methods
	const location = useLocation();
	const path = location.pathname;
	// Redux Methods
	const dispatch = useDispatch();
	const { isSignIn } = useSelector((state) => state.signInStates);
	const { totalOfUnreadNotifications, totalOFriendWhoHaveUnreadMessages } = useSelector(
		(state) => state.notificationStates
	);

	const getData = async () => {
		try {
			await dispatch(handleGetAuthenticatedUserData()).unwrap();
		} catch (err) {
			if (isSignIn) {
				toast.error(err);
			}
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
			if (isSignIn) {
				toast.error(err);
			}
		}
	};

	// Life Cycle Methods
	useComponentDidMount(() => {
		getData();
		getNotifications();
	});

	socket.off("notification").on("notification", () => {
		getNotifications();
	});

	return (
		<VStack
			p={{ base: "15px", lg: "20px" }}
			borderRight={{ base: "0", lg: "1px solid #E6E6E6" }}
			borderTop={{ base: "1px solid #E6E6E6", lg: "0" }}
			position={{ base: "fixed", lg: "sticky" }}
			top={{ base: "unset", lg: "0" }}
			bottom={{ base: "0", lg: "unset" }}
			left={"0"}
			zIndex={"9999999"}
			backgroundColor={"white"}
			flexDirection={{ base: "row", lg: "column" }}
			w={{ base: "100%", lg: "fit-content" }}
			h={{ base: "8.5vh", lg: "100vh" }}
			alignItems={"center"}
			justifyContent={"space-between"}
		>
			<VStack display={{ base: "none", lg: "flex" }} className='logo-wrapper'>
				<FaBlog size={"30px"} />
			</VStack>
			<VStack
				flex={{ base: "1", lg: "unset" }}
				justifyContent={{ base: "space-around", lg: "unset" }}
				alignItems={"center"}
				flexDirection={{ base: "row", lg: "column" }}
				className={"menu-wrapper"}
				mt={"0px !important"}
			>
				<Stack
					marginBottom={{ base: "0px !important", lg: "20px !important" }}
					marginTop={{ base: "0px !important", lg: ".5rem !important" }}
					cursor={"pointer"}
				>
					<Link style={{ margin: '0px' }} to={HOME_ROUTE}>
						<SideBarIcon
							Icon={
								path !== HOME_ROUTE ? (
									<AiOutlineHome size={"25px"} />
								) : (
									<AiFillHome size={"25px"} />
								)
							}
							name={"Home"}
						/>
					</Link>
				</Stack>
				<Stack
					marginBottom={{ base: "0px !important", lg: "20px !important" }}
					marginTop={{ base: "0px !important", lg: ".5rem !important" }}
					cursor={"pointer"}
					position={"relative"}
				>
					{totalOFriendWhoHaveUnreadMessages && (
						<Text
							borderRadius={"50%"}
							bg={"black"}
							color={"white"}
							textAlign={"center"}
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
							w={{ base: "23px", lg: "25px"}}
							h={{ base: "23px", lg: "25px"}}
							fontSize={{ base: "8px",lg: "10px"}}
							zIndex={"999"}
							position={"absolute"}
							top={"0"}
							mb={"0px !important"}
							transform={"translate(10px, -3px)"}
						>
							{totalOFriendWhoHaveUnreadMessages}
						</Text>
					)}
					<Link style={{ margin: '0px' }} to={`${MESSAGE_ROUTE}/_blank`}>
						<SideBarIcon
							Icon={
								!path.includes("message") ? (
									<AiOutlineMessage size={"25px"} />
								) : (
									<AiFillMessage size={"25px"} />
								)
							}
							name={"Message"}
						/>
					</Link>
				</Stack>
				<Stack
					marginBottom={{ base: "0px !important", lg: "20px !important" }}
					marginTop={{ base: "0px !important", lg: ".5rem !important" }}
					position={"relative"}
					cursor={"pointer"}
				>
					{totalOfUnreadNotifications && (
						<Text
							borderRadius={"50%"}
							bg={"black"}
							color={"white"}
							textAlign={"center"}
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
							w={{ base: "23px", lg: "25px"}}
							h={{ base: "23px", lg: "25px"}}
							fontSize={{ base: "8px",lg: "10px"}}
							zIndex={"999"}
							position={"absolute"}
							top={"0"}
							transform={{ base: "translate(10px, -7px)", lg: "translate(10px, -13px)" }}
						>
							{totalOfUnreadNotifications}
						</Text>
					)}
					<Link style={{ margin: '0px' }} to={NOTIFICATION_ROUTE}>
						<SideBarIcon
							Icon={
								path !== NOTIFICATION_ROUTE ? (
									<IoMdNotificationsOutline size={"27px"} />
								) : (
									<IoMdNotifications size={"27px"} />
								)
							}
							name={"Notifications"}
						/>
					</Link>
				</Stack>
				<UserOptions
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					display={{ base: "flex", lg: "none" }}
					alignItems={"center"}
					mt={"0px !important"}
				/>
				<Stack
					marginBottom={{ base: "0px !important", lg: "20px !important" }}
					marginTop={{ base: "0px !important", lg: ".5rem !important" }}
					cursor={"pointer"}
				>
					<Link style={{ margin: '0px' }} to={MY_STORIES_ROUTE}>
						<SideBarIcon
							Icon={
								path !== MY_STORIES_ROUTE ? (
									<CgNotes size={"25px"} />
								) : (
									<GiNotebook size={"25px"} />
								)
							}
							name={"My Stories"}
						/>
					</Link>
				</Stack>
				<Stack
					marginBottom={{ base: "0px !important", lg: "20px !important" }}
					marginTop={{ base: "0px !important", lg: ".5rem !important" }}
					cursor={"pointer"}
				>
					<Link style={{ margin: '0px' }} to={CREATE_STORY_ROUTE}>
						<SideBarIcon
							Icon={
								path !== CREATE_STORY_ROUTE ? (
									<BsPencil size={"25px"} />
								) : (
									<BsPencilFill size={"25px"} />
								)
							}
							name={"Create Story"}
						/>
					</Link>
				</Stack>
				<Stack
					marginBottom={{ base: "0px !important", lg: "20px !important" }}
					marginTop={{ base: "0px !important", lg: ".5rem !important" }}
					cursor={"pointer"}
					display={{ base: "unset", lg: "none" }}
				>
					<Link style={{ margin: '0px' }} to={`${SEARCH_ROUTE}/__blank/?type=stories`} >
						<SideBarIcon
							Icon={
								!path.includes(SEARCH_ROUTE) ? (
									<RiSearch2Line size={"25px"} />
								) : (
									<RiSearchFill size={"25px"} />
								)
							}
							name={"Create Story"}
						/>
					</Link>
				</Stack>
			</VStack>
			<UserOptions
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				display={{ base: "none", lg: "flex" }}
				alignItems={"center"}
			/>
		</VStack>
	);
});

export default SideBar;
