import React, { Suspense, useContext, lazy, useCallback } from "react";
// Components
import { VStack, Text } from "@chakra-ui/react";
import InputSearch from "./InputSearch";
// Router
import { Link } from "react-router-dom";
// Routes
import { MESSAGE_ROUTE } from "../../../Routes";
// Socket
import { socket } from "../../../App";
import { Context } from "../../../context";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateSelectedBasicInfo } from "../../../Redux/Slices/SelectedUser";
import MessageFriendSkeleton from "../../MessageFriendsSkeleton";

// lazy
const Friends = lazy(() => import("./Friends/index"));

const FriendsList = ({ getFriends, accountId, selectedUser, setShowFriendsList }) => {
	// Redux
	const dispatch = useDispatch();
	const { friends } = useSelector((state) => state.userFriendsStates);
	// Context
	const { onlineUsers } = useContext(Context);

	const handleUpdateSelectedInfo = useCallback(
		(e) => {
			// Update Slected User
			dispatch(
				handleUpdateSelectedBasicInfo({
					imageLink: e.imageLink,
					firstName: e.firstName,
					lastName: e.lastName,
				})
			);
			// Then In Mobile Update The Show Friends List State
			setShowFriendsList(false);
		},
		[selectedUser]
	);

	// Incoming Message Listener From Socket
	// Then Re Invoke Get Friends to update friends
	socket.on("message-incomingMessage", () => {
		getFriends();
	});

	return (
		<VStack
			overflowY={"scroll"}
			h={"100%"}
			w={{ base: "100%", lg: "320px" }}
			border={"1px solid #E6E6E6"}
			p={"0px 0px"}
			ml={"0px"}
			mr={"0px"}
			sx={{
				"&::-webkit-scrollbar": {
					display: "none",
				},
			}}
		>
			<InputSearch getFriends={getFriends} />
			<Text p={"0px 8px"} textAlign={"left"} w={"100%"} fontSize={"20px"} fontWeight={"600"}>
				Messages
			</Text>
			<VStack w={"100%"} mt={"0px !important"}>
				{friends?.map((e, index) => (
					<Link
						style={{
							marginTop: "0px",
							width: "100%",
						}}
						onClick={() => handleUpdateSelectedInfo(e)}
						key={e.accountId}
						to={`${MESSAGE_ROUTE}/${e.accountId}`}
					>
						<Suspense fallback={<MessageFriendSkeleton />}>
							<Friends
								currentUserAccountId={accountId}
								friend={e}
								onlineUsers={onlineUsers}
								selectedUser={selectedUser}
							/>
						</Suspense>
					</Link>
				))}
			</VStack>
		</VStack>
	);
};

export default React.memo(FriendsList);
