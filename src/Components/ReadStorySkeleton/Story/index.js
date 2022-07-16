/* eslint-disable no-unused-vars */
import React from "react";
// Components
import { Box, SkeletonText, Skeleton, VStack } from "@chakra-ui/react";

const ReadStorySkeleton = () => {
	return (
		<Box w={"100%"} padding={"6"} mt={"10px !important"} boxShadow={"lg"} bg={"white"}>
			<VStack w={"100%"} mt={"0px !important"}>
				<Skeleton w={"100%"} mb={"30px"} minH={"400px"} />
				<SkeletonText w={"100%"} ml={"20px"} noOfLines={30} spacing={"2"} />
			</VStack>
		</Box>
	);
};

export default ReadStorySkeleton;
