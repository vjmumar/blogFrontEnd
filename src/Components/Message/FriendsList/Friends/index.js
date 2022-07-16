/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// Components
import { Flex, Stack, Image, Text, VStack } from "@chakra-ui/react";
import TypingIndicator from "../../../TypingIndicator";
// Helper
import { imageFormatter, truncateString } from "../../../../Helpers";
// Socket
import { socket } from "../../../../App";

const Friends = ({ friend, onlineUsers, currentUserAccountId }) => {
	const [friendsWhoAreTyping, setFriendsWhoAreTyping] = useState([]);

	socket.on("message-userIsTyping", (data) => {
		if (!friendsWhoAreTyping.includes(data.from) && data.isTyping) {
			setFriendsWhoAreTyping((prev) => [...prev, data.from]);
		} else if (friendsWhoAreTyping.includes(data.from) && !data.isTyping) {
			const arryClone = [...friendsWhoAreTyping].filter((e) => e !== data.from);
			setFriendsWhoAreTyping(arryClone);
		}
	});

	return (
		<Flex
			className={friend?.accountId}
			overflow={"hidden"}
			alignItems={"flex-start"}
			justifyContent={"flex-start"}
			w={"100%"}
			p={"10px 8px 11px"}
			position={"relative"}
			borderBottom={"1px solid #E6E6E6"}
		>
			<Stack mr={"10px !important"} flexShrink={"0"} flexGrow={"0"} position={"relative"}>
				<Stack
					w={"15px"}
					h={"15px"}
					borderRadius={"50%"}
					margin={"0px !important"}
					border={"2px solid white"}
					position={"absolute"}
					right={"-4px"}
					top={"-2px"}
					bg={onlineUsers.includes(friend?.accountId) ? "#30C730" : "#F70000"}
				></Stack>
				<Image
					w={"35px"}
					h={"35px"}
					objectFit={"cover"}
					mt={"0px !important"}
					borderRadius={"50%"}
					src={imageFormatter(friend?.imageLink)}
				/>
			</Stack>
			<VStack alignSelf={"center"} h={"100%"}>
				<Text mb={"0px"} textAlign={"left"} w={"100%"} fontSize='15px'>
					{friend?.name || friend?.firstName} {friend?.lastName}
				</Text>
				{friend?.latestMessage && (
					<Text
						mt={"0px !important"}
						color={"#6a6a6a"}
						textAlign={"left"}
						w={"100%"}
						fontSize={"10px"}
					>
						{friend?.latestMessage?.from === currentUserAccountId
							? "you: "
							: `${friend?.firstName}: `}
						{truncateString(friend?.latestMessage?.text, 16)}
					</Text>
				)}
			</VStack>
			{!friend?.haveNoUnreadMessagesFromUser && (
				<Stack
					ml={"auto"}
					w={"10px"}
					borderRadius={"50%"}
					h={"10px"}
					right={"10px"}
					bg={"black"}
					position={"absolute"}
					top={"0"}
					bottom={"0"}
					margin={"auto"}
				></Stack>
			)}
			{friendsWhoAreTyping.includes(friend?.accountId) && (
				<Stack top={"5px"} right={"0px"} position={"absolute"}>
					<TypingIndicator />
				</Stack>
			)}
		</Flex>
	);
};

export default Friends;
