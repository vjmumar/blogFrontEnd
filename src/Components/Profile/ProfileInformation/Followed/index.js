import React from "react";
// Components
import { VStack, Text, Image, Flex } from "@chakra-ui/react";
// Helper
import { imageFormatter } from "../../../../Helpers";
// Redux
import { useSelector } from "react-redux";
// Constants
import { FOLLOWED_PEOPLE_TYPE } from "../../FriendsAndFollowedModal/constant";

const FollowedPeople = ({ handleOpenModal }) => {
	const { followedPeople } = useSelector((state) => state.userFollowedPeopleStates);
	return (
		<VStack w={"100%"} alignItems={"flex-start"}>
			<Text>Followed People</Text>
			<Text onClick={() => handleOpenModal(FOLLOWED_PEOPLE_TYPE)} cursor={"pointer"} color={"blue.400"} fontSize={"sm"}>
				See All
			</Text>
			<Flex>
				{followedPeople?.slice(0, 5).map((e, index) => (
					<Image
						key={index}
						w={"35px"}
						h={"35px"}
						ml={index !== 0 ? "-20px" : "0"}
						borderRadius={"50%"}
						src={imageFormatter(e.imageLink)}
					/>
				))}
			</Flex>
		</VStack>
	);
};

export default FollowedPeople;
