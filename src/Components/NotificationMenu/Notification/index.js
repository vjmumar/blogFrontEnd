import React from "react";
// Router
import { Link } from "react-router-dom";
// Components
import { Flex, VStack, Text, Button } from "@chakra-ui/react";
// Route
import { PROFILE_ROUTE } from "../../../Routes";

const NotificationBlock = ({ notification }) => {
	return (
		<Flex mb={"5px"} justifyContent={"space-between"} w={"100%"}>
			<VStack justifyContent={"flex-start"}>
				<Text w={"100%"} textAlign={"left"} fontSize={"16px"}>
					{notification?.firstName} {notification?.lastName}
				</Text>
				<Text mt={"0px !important"} w={"100%"} fontSize={"10px"} textAlign={"left"}>
					{notification?.msg}
				</Text>
			</VStack>
			<Link to={`${PROFILE_ROUTE}/${notification?.accountId}`}>
				<Button fontSize={"13px"} p={"5px 20px"} bg={"black"} color={"white"}>
					Profile
				</Button>
			</Link>
		</Flex>
	);
};

export default NotificationBlock;
