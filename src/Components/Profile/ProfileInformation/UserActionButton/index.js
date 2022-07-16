import React from "react";
// Components
import { Flex, Button } from "@chakra-ui/react";
// Redux
import { useSelector } from "react-redux";
// Actions Constant
import {
	ACCEPT_USER_FRIEND_REQUEST,
	CANCEL_REQUEST_TO_BE_FRIEND,
	FOLLOW_USER,
	REJECT_USER_FRIEND_REQUEST,
	REQUEST_TO_BE_FRIEND,
	UNFRIEND_USER,
	UN_FOLLOW_USER,
} from "../../../../Pages/ProfilePage/constant";

const UserActionButtons = ({ profile, handleAction }) => {
	// Redux Methods
	const { isLoading } = useSelector((state) => state.userActionsStates);
	return (
		<>
			{!profile.isCurrentUser && (
				<Flex
					w={"100%"}
					mb={"10px"}
					justifyContent={"center"}
					flexWrap={{
						base: profile.isRequestedToBeFriendByUser ? "wrap" : "unset",
						lg: "unset",
					}}
				>
					{!profile.isRequestedToBeFriendByCurrentUser &&
					!profile.isRequestedToBeFriendByUser &&
					!profile.isAfriendOfCurrentUser ? (
						<Button
							onClick={() => handleAction(REQUEST_TO_BE_FRIEND)}
							isLoading={isLoading}
							mr={"10px"}
							w={"50%"}
							bg={"blue.400"}
							color={"white"}
						>
							Add Friend
						</Button>
					) : profile.isRequestedToBeFriendByCurrentUser ? (
						<Button
							onClick={() => handleAction(CANCEL_REQUEST_TO_BE_FRIEND)}
							isLoading={isLoading}
							mr={"10px"}
							w={"50%"}
							bg={"blue.400"}
							color={"white"}
						>
							Cancel Request
						</Button>
					) : profile.isAfriendOfCurrentUser ? (
						<Button
							onClick={() => handleAction(UNFRIEND_USER)}
							isLoading={isLoading}
							mr={"10px"}
							w={"50%"}
							bg={"blue.400"}
							color={"white"}
						>
							UnFriend
						</Button>
					) : (
						<Flex w={{ base: "100%", lg: "unset" }} mt={{ base: "10px", lg: "unset" }}>
							<Button
								onClick={() => handleAction(ACCEPT_USER_FRIEND_REQUEST)}
								isLoading={isLoading}
								mr={"10px"}
								w={"50%"}
								bg={"blue.400"}
								color={"white"}
							>
								Accept
							</Button>
							<Button
								onClick={() => handleAction(REJECT_USER_FRIEND_REQUEST)}
								isLoading={isLoading}
								mr={"10px"}
								w={"50%"}
								bg={"blue.400"}
								color={"white"}
							>
								Reject
							</Button>
						</Flex>
					)}
					{!profile.isFollowedByCurrentUser ? (
						<Button
							w={{
								base: profile.isRequestedToBeFriendByUser ? "100%" : "50%",
								lg: "50%",
							}}
							onClick={() => handleAction(FOLLOW_USER)}
							mt={{
								base: profile.isRequestedToBeFriendByUser ? "10px" : "unset",
								lg: "unset",
							}}
							bg={"black"}
							color={"white"}
							isLoading={isLoading}
						>
							Follow
						</Button>
					) : (
						<Button
							onClick={() => handleAction(UN_FOLLOW_USER)}
							mt={{
								base: profile.isRequestedToBeFriendByUser ? "10px" : "unset",
								lg: "unset",
							}}
							w={{
								base: profile.isRequestedToBeFriendByUser ? "100%" : "50%",
								lg: "50%",
							}}
							bg={"black"}
							isLoading={isLoading}
							color={"white"}
						>
							UnFollow
						</Button>
					)}
				</Flex>
			)}
		</>
	);
};

export default UserActionButtons;
