/* eslint-disable no-unused-vars */
import React from "react";
// Components
import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ReadStorySidebarSkeleton = () => {
	return (
		<Box w={"100%"} minWidth={"300px"} padding={"6"} boxShadow={"lg"} bg={"white"}>
			<Flex w={"100%"} mt={"10px"} flexDirection={"row"}>
				<SkeletonText flex={"1"} pr={"15px"} mt={"4"} noOfLines={25} spacing={"4"} />
			</Flex>
		</Box>
	);
};

export default ReadStorySidebarSkeleton;
