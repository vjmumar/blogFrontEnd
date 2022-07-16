import React from "react";
// Components
import { VStack, Text, Image, Flex } from "@chakra-ui/react";
// Helper
import { imageFormatter } from "../../../../Helpers";
// Redux
import { useSelector } from "react-redux";
// Constants
import { ALL_FRIENDS_TYPE } from "../../FriendsAndFollowedModal/constant";

const Friends = ({handleOpenModal}) => {
	const { friends } = useSelector((state) => state.userFriendsStates);
	return (
		<VStack w={"100%"} alignItems={"flex-start"}>
			<Text>Friends</Text>
			<Text onClick={() => handleOpenModal(ALL_FRIENDS_TYPE)} cursor={"pointer"} color={"blue.400"} fontSize={"sm"}>
				See All
			</Text>
			<Flex>
				{friends?.slice(0, 5).map((e, index) => (
					<Image
						key={index}
						w={"35px"}
						h={"35px"}
						borderRadius={"50%"}
						ml={index !== 0 ? "-20px" : "0"}
						src={imageFormatter(e.imageLink)}
					/>
				))}
			</Flex>
		</VStack>
	);
};

export default Friends;
