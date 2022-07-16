/* eslint-disable react/no-unescaped-entities */
import React from "react";
// Components
import { VStack, Flex, Image, Text, Divider } from "@chakra-ui/react";
// Helpers
import { imageFormatter, numberFormatter } from "../../../../Helpers";
// Router
import { Link } from "react-router-dom";
// Routes
import { PROFILE_ROUTE } from "../../../../Routes";

const Bio = ({ data }) => {
	return (
		<VStack w={"100%"}>
			<Link style={{width: "100%"}} to={`${PROFILE_ROUTE}/${data?.authorAccountId}`}>
				<Flex alignItems={"center"} w={"100%"}>
					<Image
						src={imageFormatter(data.authorImage)}
						w={"45px"}
						h={"45px"}
						borderRadius={"50%"}
						flexShrink={"0"}
						mr={"10px"}
					/>
					<VStack w={"100%"} alignItems={"flex-start"}>
						<Text mb={"0px"} textAlign={"center"} fontSize={"17px"}>
							{data.authorFirstName} {data.authorLastName}
						</Text>
						<Text fontSize={"15px"} mt={"0px !important"}>
							Followers: {numberFormatter(data?.authorFollowers?.length || 0)}
						</Text>
					</VStack>
				</Flex>
				<Text w={"100%"} textAlign={"left"}>
					{data.authorAboutMe}
				</Text>
				<Divider mt={"20px !important"} />
			</Link>
		</VStack>
	);
};

export default Bio;
