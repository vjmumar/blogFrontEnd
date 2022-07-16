import React from "react";
// Component
import { Flex, Text, VStack, Heading, Stack } from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
// Helpers
import { imageFormatter, dateFormatter } from "../../../Helpers";
import EndOfListDivider from "../../EndOfListDivider";
// Markup
import { Markup } from "interweave";

const Story = ({ data }) => {
	return (
		<Flex mt={"20px !important"} w={"100%"}>
			<VStack alignItems={"center"} w={"100%"}>
				<Flex justifyContent={"flex-start"} w={"100%"} alignItems={"center"}>
					<AiOutlineCalendar />
					<Text ml={"8px !important"}>
						Date Created: {dateFormatter(data?.dateCreated)}
					</Text>
				</Flex>
				<VStack
					w={"100%"}
					h={"400px"}
					backgroundImage={`url(${
						!data?.heroLink
							? "https://via.placeholder.com/728x400.png?text=No+Story+Image"
							: imageFormatter(data?.heroLink)
					})`}
					mb={"30px !important"}
					backgroundPosition={"center"}
					backgroundSize={"cover"}
				></VStack>
				<Heading
					pl={{ base: 'unset', lg: "20px" }}
					pr={{ base: 'unset', lg: "20px" }}
					fontSize={{ base: '25px', lg: '30px'}}
					w={"100%"}
					mb={"15px !important"}
					textAlign={"left"}
				>
					{data?.title}
				</Heading>
				<Markup content={data?.text} className={"story-paragraph"} />
				<Stack mt={"20px !important"} w={"100%"}>
					<EndOfListDivider text={"End Of Story"} />
				</Stack>
			</VStack>
		</Flex>
	);
};

export default Story;
