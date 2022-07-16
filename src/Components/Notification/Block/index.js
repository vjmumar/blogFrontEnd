import React from "react";
// Components
import { Flex, Image, VStack, Text } from "@chakra-ui/react";
// Helpers
import { dateFormatter, imageFormatter } from "../../../Helpers";
// Router
import { Link } from "react-router-dom";
// Routes
import { PROFILE_ROUTE } from "../../../Routes";
// Icons
import { RiNotification2Line } from "react-icons/ri";
import { BiUser, BiTime } from "react-icons/bi";

const Block = ({ notification }) => {
	return (
		<Link to={`${PROFILE_ROUTE}/${notification?.senderAccountId}`} style={{ width: "100%" }}>
			<Flex w={"100%"} mt={"10px"} mb={"10px"}>
				<Image
					w={{ base: "40px", lg: "50px"}}
					h={{ base: "40px", lg: "50px"}}
					borderRadius={"50%"}
					mr={"10px"}
					src={imageFormatter(notification?.senderImage)}
				/>
				<VStack alignItems={"flex-start"}>
					<Flex alignItems={"center"}>
						<BiTime />
						<Text ml={"5px"} fontSize={{ base: "13px", lg: "unset"}}>
							{dateFormatter(notification?.dateCreated, "from-now")}
						</Text>
					</Flex>
					<Flex mt={{ base: "3px !important", lg: "unset" }} alignItems={"center"}>
						<BiUser />
						<Text ml={"5px"} fontSize={{ base: "13px", lg: "unset"}} lineHeight={"normal"}>
							{notification?.senderFirstName} {notification?.senderLastName}
						</Text>
					</Flex>
					<Flex mt={{ base: "3px !important", lg: "unset" }} alignItems={"center"}>
						<RiNotification2Line />
						<Text ml={"5px"} fontSize={{ base: "13px", lg: "unset"}} lineHeight={"normal"}>
							{notification?.message}
						</Text>
					</Flex>
				</VStack>
			</Flex>
		</Link>
	);
};

export default Block;
