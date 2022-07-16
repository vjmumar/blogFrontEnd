import React from "react";

// Components
import { Flex, Text, Image } from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
// Helper
import { imageFormatter, dateFormatter, numberFormatter } from "../../../../Helpers";
// Icons
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
// Constants
import { DRAFT_STORIES_PARAMS } from "../../../../Pages/MyStories/constant";

const UserInformation = ({ image, fName, lName, dCreated, likes, isUserLikedThisStory, type }) => {
	return (
		<Flex w={"100%"} justifyContent={"flex-start"} alignItems={"center"}>
			<Image
				w={"25px"}
				h={"25px"}
				borderRadius={"50%"}
				objectFit={"cover"}
				marginRight={"10px"}
				src={imageFormatter(image)}
			/>
			<Text fontSize={"15px"}>
				{fName} {lName}
			</Text>
			<Text m={"0 5px"}>-</Text>
			<Flex alignItems={"center"}>
				<AiOutlineCalendar />
				<Text ml={"5px"} fontSize={"15px"}>
					{dateFormatter(dCreated)}
				</Text>
			</Flex>
			{type !== DRAFT_STORIES_PARAMS && (
				<Flex ml={"10px"} alignItems={"center"}>
					{isUserLikedThisStory ? <AiFillLike /> : <AiOutlineLike />}
					<Text mb={"0px"} lineHeight={"12px"} ml={"5px"} fontSize={"12px"}>
						{numberFormatter(likes.length)}
					</Text>
				</Flex>
			)}
		</Flex>
	);
};

export default UserInformation;
