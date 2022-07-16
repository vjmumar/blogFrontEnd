import React from "react";

// Components
import { Button, Flex, Image, Stack, Text, Divider, VStack } from "@chakra-ui/react";

// Router
import { Link } from "react-router-dom";
// Routes
import { PROFILE_ROUTE } from "../../../Routes";

// Helper
import { imageFormatter, truncateString } from "../../../Helpers/index";

const Blocks = ({ searchedUser }) => {
	return (
		<>
			{searchedUser?.map((e, index) => (
				<VStack mb={"20px !important"} mt={"20px"} w={"100%"} key={index}>
					{index ? <Divider mb={"20px !important"} /> : ""}
					<Flex align={"center"} w={"100%"}>
						<Image
							src={imageFormatter(e.imageLink)}
							w={{ base: "40px", lg: "60px" }}
							h={{ base: "40px", lg: "60px" }}
							borderRadius={"50%"}
							objectFit={"cover"}
							mr={"15px"}
						/>
						<Stack>
							<Text fontWeight={"bold"}>
								{e.firstName} {e.lastName}
							</Text>
							<Text mt={{ base: "0px !important", lg: "unset" }}>
								{e.aboutMe ? truncateString(e.aboutMe, 35) : "-- NO DESCRIPTION --"}
							</Text>
						</Stack>

						<Stack ml={"auto"}>
							<Link to={`${PROFILE_ROUTE}/${e.accountId}`}>
								<Button
									color={"white"}
									bg={"black"}
									fontSize={{ base: "13px", lg: "unset" }}
									padding={{ base: "10px 25px", lg: "10px 40px" }}
									borderRadius={"30px"}
								>
									Profile
								</Button>
							</Link>
						</Stack>
					</Flex>
				</VStack>
			))}
		</>
	);
};

export default Blocks;
