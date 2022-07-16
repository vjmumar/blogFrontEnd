/* eslint-disable no-unused-vars */
import React from "react";
// Components
import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const RandomStoriesSekeleton = () => {
	return (
		<Box w={"100%"} padding={"6"} boxShadow={"lg"} bg={"white"}>
			<Flex w={"100%"}>
				<SkeletonCircle size='10' />
				<SkeletonText w={"230px"} ml={"20px"} noOfLines={2} spacing={"2"} />
			</Flex>
			<Flex w={"100%"} mt={"10px"} flexDirection={"row"}>
				<SkeletonText flex={"1"} pr={"15px"} mt={"4"} noOfLines={3} spacing={"4"} />
				<Skeleton
					flexShrink={"0"}
					w={"40%"}
					h={"50px"}
				/>
			</Flex>
		</Box>
	);
};

export default RandomStoriesSekeleton;
