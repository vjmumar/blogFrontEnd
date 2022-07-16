import React, { useContext, useState } from "react";
// Component
import { Flex, VStack } from "@chakra-ui/react";
import Output from "./Output";
import MessageInput from "./Input";
import FriendsList from "./FriendsList";
// Context
import { Context } from "../../Pages/MessagePage/context";
// Redux
import { useSelector } from "react-redux";
// Router
import { useParams } from "react-router-dom";
// Hooks
import { useComponentShouldUpdate } from "../../Hooks/useComponendShouldUpdate";
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";
import useComponentDidUnMount from "../../Hooks/useComponentDidUnMount";

const MessageBody = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [showFriendsList, setShowFriendsList] = useState(true);
	const [media, setMedia] = useState([]);
	const [replyingToText, setReplyingToText] = useState("");
	const {
		getFriends,
		handleSendMessage,
		messages,
		accountId,
		roomId,
		handleClearMessage,
		getMessage,
	} = useContext(Context);
	const selectedUser = useSelector((state) => state.selectedUserStates);
	// Router Methods
	const params = useParams();

	
	const handleResize = () => {
		setIsMobile(window.innerWidth < 991);
	}

	useComponentShouldUpdate(() => {
		setReplyingToText("");
	}, [params.id]);

	useComponentDidMount(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	});

	useComponentDidUnMount(() => {
		window.removeEventListener('resize', handleResize)
	});

	return (
		<Flex
			flexDirection={{ base: "column", lg: "row" }}
			w={"100%"}
			top={"0"}
			position={{ base: 'absolute', lg: 'relative'}}
			minH={{ base: "91.5vh", lg: "90vh" }}
			maxH={{ base: "91.5vh", lg: "90vh" }}
			padding={{ base: "0px", lg: "15px" }}
			alignItems={"flex-start"}
		>
			<Flex
				display={{
					base: isMobile && showFriendsList ? "block" : "none",
					lg: "block",
				}}
				h={"100%"}
				w={{ base: "100%", lg: "unset" }}
			>
				<FriendsList
					selectedUser={selectedUser}
					accountId={accountId}
					getFriends={getFriends}
					setShowFriendsList={setShowFriendsList}
				/>
			</Flex>
			<VStack
				display={{
					base: isMobile && !showFriendsList ? "block" : "none",
					lg: "block",
				}}
				w={"100%"}
				h={"100%"}
			>
				<Output
					selectedUser={selectedUser}
					handleClearMessage={handleClearMessage}
					messages={messages}
					totalMessages={selectedUser?.totalMessages}
					totalShowedMessages={selectedUser?.totalShowedMessages}
					accountId={accountId}
					replyingToText={replyingToText}
					isMobile={isMobile}
					setShowFriendsList={setShowFriendsList}
					showFriendsList={showFriendsList}
					setReplyingToText={setReplyingToText}
					getMessage={getMessage}
					media={media}
					setMedia={setMedia}
				/>
				<MessageInput
					roomId={roomId}
					handleSendMessage={handleSendMessage}
					replyingToText={replyingToText}
					setReplyingToText={setReplyingToText}
					accountId={accountId}
					media={media}
					setMedia={setMedia}
				/>
			</VStack>
		</Flex>
	);
};

export default MessageBody;
