import React from "react";

// Components
import { Flex, Text, Image, VStack } from "@chakra-ui/react";
// Helper
import { imageFormatter, truncateString, numberFormatter } from "../../../../Helpers";
// Markup
import { Markup } from "interweave";
// Icons
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const StoryPreview = ({ title, text, image, likes,isUserLikedThisStory }) => {
	console.log(likes)
	return (
		<Flex
			alignItems={"center"}
			w={"100%"}
			flexDirection={{ base: "column", lg: "row" }}
			justifyContent={"space-between"}
			className={"story-preview"}
			mt={{ base: "10px", lg: "unset"}}
		>
			<VStack w={"100%"} pr={"15px"} alignItems={"flex-start"}>
				<Text fontSize={{ base: "18px", lg: "25px" }} fontWeight={"bold"}>
					{title}
				</Text>
				<Markup content={truncateString(text, 30)} />
				<Flex alignItems={"center"}>
					{isUserLikedThisStory ? (
						<AiFillLike size={"20px"} />
					) : (
						<AiOutlineLike size={"20px"} />
					)}
					<Text mb={"0px"} lineHeight={"12px"} ml={"5px"} fontSize={"12px"}>
						{numberFormatter(likes?.length  || 0)}
					</Text>
				</Flex>
			</VStack>
			<Flex
				w={{ base: "100%", lg: "25%" }}
				h={"100%"}
				flexGrow={"1"}
				flexShrink={"0"}
				justifyContent={"flex-end"}
				mt={{ base: "20px", lg: "0" }}
			>
				<Image
					objectFit={"cover"}
					w={{ base: "100%", lg: "230px" }}
					h={{ base: "150px", lg: "80px" }}
					borderRadius={"5px"}
					src={
						image
							? imageFormatter(image)
							: "https://via.placeholder.com/728x90.png?text=Place+Holder"
					}
				/>
			</Flex>
		</Flex>
	);
};

export default StoryPreview;
