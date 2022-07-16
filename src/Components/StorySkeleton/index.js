/* eslint-disable no-unused-vars */
import React from "react";
// Components
import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const StorySkeleton = () => {
	return (
		<Box w={"100%"} padding={"6"} boxShadow={"lg"} bg={"white"}>
			<Flex w={"100%"}>
				<SkeletonCircle size='10' />
				<SkeletonText w={"230px"} ml={"20px"} noOfLines={"1"} spacing={"2"} />
			</Flex>
			<Flex w={"100%"} mt={"10px"} flexDirection={{ base: "column", lg: "row" }}>
				<SkeletonText flex={"1"} pr={"15px"} mt={"4"} noOfLines={"4"} spacing={"4"} />
				<Skeleton
					mt={{ base: "30px", lg: "unset" }}
					flexShrink={"0"}
					w={{ base: "100%", lg: "230px" }}
					h={"80px"}
				/>
			</Flex>
		</Box>
	);
};

export default StorySkeleton;
