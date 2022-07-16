/* eslint-disable no-unused-vars */
import React from "react";
// Components
import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const MessagesSkeleton = () => {
	return (
		<Box w={"100px"} h={"50px"} padding={"3"} mt={"0px !important"} boxShadow={"lg"} bg={"white"}>
			<SkeletonText w={"100%"} ml={"0px"} h={"fit-content"} noOfLines={3} spacing={"1"} />
		</Box>
	);
};

export default MessagesSkeleton;
