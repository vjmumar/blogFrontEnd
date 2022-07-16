/* eslint-disable no-unused-vars */
import React from "react";
// Components
import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const MessageFriendSkeleton = () => {
	return (
		<Box w={"100%"} padding={"6"} mt={"0px !important"} boxShadow={"lg"} bg={"white"}>
			<Flex w={"100%"} mt={"0px !important"}>
				<SkeletonCircle size={'10'} />
				<SkeletonText w={"230px"} ml={"20px"} noOfLines={"2"} spacing={"2"} />
			</Flex>
		</Box>
	);
};

export default MessageFriendSkeleton;
