import React, { lazy, Suspense, useRef, useState } from "react";
// Components
import { VStack, Flex, Button } from "@chakra-ui/react";
import UserInformation from "./UserInformation";
import ReplyingBoard from "./ReplyingToBoard";
import MediaDisplay from "./MediaDisplayer";
import MessagesSkeleton from "../../MessagesSkeleton";
// Redux
import { useSelector } from "react-redux";
// Helpers
import { truncateString } from "../../../Helpers";
// Hooks
import { useComponentShouldUpdate } from "../../../Hooks/useComponendShouldUpdate";

// Lazy
const Messages = lazy(() => import("../Output/Messages"));

const Output = ({
	messages,
	accountId,
	handleClearMessage,
	totalShowedMessages,
	totalMessages,
	selectedUser,
	setReplyingToText,
	replyingToText,
	getMessage,
	isMobile,
	setShowFriendsList,
	showFriendsList,
	media,
	setMedia,
}) => {
	const outputRef = useRef(null);
	// States
	const [isScrolled, setScrolled] = useState(false);

	// Redux Methods
	const { isLoading: messageLoading } = useSelector((state) => state.selectedUserStates);
	const { isLoading: actionLoading } = useSelector((state) => state.userActionsStates);

	const scrollBottom = () => {
		outputRef.current.scrollTop = outputRef.current.scrollHeight;
	};

	const handleGetMessage = async () => {
		await getMessage();
	};

	useComponentShouldUpdate(() => {
		if (!isScrolled) {
			scrollBottom();
		} else {
			setScrolled(false);
		}
	}, [messages]);

	return (
		<VStack h={{ base: '85.5vh', lg: "100%"}} w={"100%"}>
			<Flex w={"100%"} bg={"black"}>
				<UserInformation
					selectedUser={selectedUser}
					handleClearMessage={handleClearMessage}
					actionLoading={actionLoading}
					isMobile={isMobile}
					setShowFriendsList={setShowFriendsList}
					showFriendsList={showFriendsList}
				/>
			</Flex>
			<VStack
				mt={"0px !important"}
				h={"100%"}
				w={"100%"}
				pb={!(replyingToText?.length > 3) && "10px"}
				overflowY={"scroll"}
				position={"relative"}
				border={"1px solid #E6E6E6"}
				ref={outputRef}
			>
				{totalMessages > totalShowedMessages ? (
					<Button
						color={"white"}
						bg={"black"}
						borderTopRightRadius={"0px"}
						borderTopLeftRadius={"0px"}
						p={"9px 25px"}
						fontWeight={"500"}
						fontSize={"15px"}
						isLoading={messageLoading}
						cursor={"pointer"}
						onClick={() => handleGetMessage()}
					>
						Load More Previous Messages
					</Button>
				) : (
					""
				)}
				{messages?.map((e, index) => (
					<Flex key={index} w={"100%"}>
						<Suspense fallback={<MessagesSkeleton />}>
							<Messages
								selectedUser={selectedUser}
								setReplyingToText={setReplyingToText}
								msg={e}
								accountId={accountId}
							/>
						</Suspense>
					</Flex>
				))}
				<VStack
				w={"100%"}
				>
					<MediaDisplay setMedia={setMedia} media={media} />
					<ReplyingBoard
						replyingToText={truncateString(replyingToText, 50)}
						setReplyingToText={setReplyingToText}
					/>
				</VStack>
			</VStack>
		</VStack>
	);
};

export default Output;
