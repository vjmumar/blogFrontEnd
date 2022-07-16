import React, { useState } from "react";
// Components
import { Flex, Text, Image, VStack, Stack, Grid, GridItem } from "@chakra-ui/react";
// Helper
import { imageFormatter, dateFormatter } from "../../../../Helpers";
// Redux
import { useSelector } from "react-redux";
// Icons
import { HiOutlineReply } from "react-icons/hi";

const Messages = ({ msg, accountId, selectedUser, setReplyingToText }) => {
	const [isHovered, setIsHovered] = useState(false);
	const { authenticatedUserData: currentUser } = useSelector(
		(state) => state.authenticatedUserDataStates
	);

	return (
		<Flex
			ml={msg?.sender === accountId ? "auto !important" : "5px !important"}
			mr={msg?.sender !== accountId ? "auto !important" : "5px !important"}
			alignItems={msg?.sender === accountId ? "flex-end" : "flex-start"}
			flexDirection={"column"}
			onMouseEnter={() => setIsHovered((prev) => !prev)}
			onMouseLeave={() => setIsHovered((prev) => !prev)}
		>
			<Flex
				alignItems={"flex-end"}
				flexDirection={msg?.sender === accountId && "row-reverse"}
			>
				<Image
					m={"5px"}
					src={imageFormatter(
						msg?.sender !== accountId ? selectedUser.image : currentUser?.imageLink
					)}
					borderRadius={"50%"}
					w={"20px"}
					h={"20px"}
				/>
				<VStack>
					<VStack alignItems={msg?.sender !== accountId ? "flex-start" : "flex-end"}>
						{msg.isReplyingTo && (
							<Text
								bg={"#cdcdcd"}
								fontSize={"13px"}
								p={"7px 20px 13px"}
								mb={"-30px"}
								maxW={"400px"}
								borderRadius={
									msg?.sender === accountId
										? "20px 20px 0px 20px"
										: "20px 20px 20px 0px"
								}
							>
								{msg.isReplyingTo}
							</Text>
						)}
						<Flex
							alignItems={"flex-end"}
							flexDirection={msg?.sender !== accountId ? "row" : "row-reverse"}
						>
							<VStack
								p={"5px 20px 6px"}
								borderRadius={
									msg?.sender === accountId
										? "20px 20px 0px 20px"
										: "20px 20px 20px 0px"
								}
								w={"fit-content"}
								position={"relative"}
								mt={"10px"}
								maxW={"400px"}
								flexShrink={"0"}
								fontSize={"13px"}
								alignItems={msg?.sender === accountId ? "flex-end" : "flex-start"}
								color={msg?.sender === accountId ? "white" : "black"}
								border={`1px solid ${
									msg?.sender === accountId ? "black" : "#efefef"
								}`}
								backgroundColor={msg?.sender === accountId ? "black" : "white"}
							>
								<>
									{msg.media.length ? (
										<Grid
										maxW={"300px"}
										gridGap={"10px"}
										gridTemplateColumns={`repeat(${msg.media.length > 1 ? 2 : 1},1fr)`}
										>
											{msg.media.map((e, index) => (
												<GridItem key={index} w={"100%"} h={"100%"}>
													<Image src={imageFormatter(e)} w={"100%"} h={"150px"} />
												</GridItem>
											))}
										</Grid>
									) : (
										""
									)}
								</>
								<Text>{msg?.text}</Text>
							</VStack>
							{isHovered && (
								<Stack
									onClick={() => setReplyingToText(msg?.text)}
									transform={msg?.sender === accountId && `rotateY(180deg)`}
								>
									<HiOutlineReply cursor={"pointer"} />
								</Stack>
							)}
						</Flex>
					</VStack>
					<Text
						fontSize={"8px"}
						w={"100%"}
						flexShrink={"0"}
						flexGrow={"1"}
						textAlign={msg?.sender === accountId ? "right" : "left"}
					>
						{msg?.status !== "sending"
							? dateFormatter(msg.dateCreated, "from-now")
							: "Sending"}
					</Text>
				</VStack>
			</Flex>
			{/* <Flex
				mt={"5px"}
				alignItems={"center"}
				w={"100%"}
				flexDirection={msg?.sender === accountId ? "row-reverse" : "row"}
			>
				<Text fontSize={"10px"}>
					{msg.status !== "sending" ? dateFormatter(msg.dateCreated) : "Sending"}
				</Text>
			</Flex> */}
		</Flex>
	);
};

export default Messages;
