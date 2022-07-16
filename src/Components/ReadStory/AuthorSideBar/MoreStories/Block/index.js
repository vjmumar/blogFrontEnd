import React from "react";
// Components
import { Flex, VStack, Image, Text } from "@chakra-ui/react";
// Router
import { Link } from "react-router-dom";
// Helper
import { imageFormatter } from "../../../../../Helpers";
// Routes
import { READ_STORY_ROUTE } from "../../../../../Routes";

const Block = ({ data }) => {
	return (
		<Link to={`${READ_STORY_ROUTE}/${data.accountId}/?story=${data.story.id}`} style={{width: "100%"}}>
			<VStack w={"100%"} mt={"10px"} mb={"10px !important"}>
				<Flex alignItems={"center"} w={"100%"} justifyContent={"space-between !important"}>
					<VStack alignItems={"flex-start"} mr={"10px"}>
						<Flex justifyContent={"flex-start"}>
							<Image
								src={imageFormatter(data.imageLink)}
								w={"30px"}
								h={"30px"}
								borderRadius={"50%"}
							/>
							<VStack ml={"5px"}>
								<Text fontSize={"13px"}>
									{data.firstName} {data.lastName}
								</Text>
							</VStack>
						</Flex>
						<Text lineHeight={"1.4rem"} fontSize={"13px"} fontWeight={"700"}>
							{data.story.title}
						</Text>
					</VStack>
					<VStack
						backgroundImage={`url(${
							data.story.heroLink
								? imageFormatter(data.story.heroLink)
								: "https://via.placeholder.com/100x65.png?text=Place+Holder"
						})`}
						backgroundPosition={"center"}
						w={"100px"}
						h={"50px !important"}
						flexShrink={"0"}
						backgroundSize={"cover"}
						borderRadius={"5px"}
					></VStack>
				</Flex>
			</VStack>
		</Link>
	);
};

export default Block;
