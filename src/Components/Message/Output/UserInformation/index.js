import React from "react";
// Components
import { Flex, Image, VStack, Text, Spinner } from "@chakra-ui/react";
// Helper
import { imageFormatter } from "../../../../Helpers";
// Icons
import { FaTrash } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";

const UserInformation = ({
	selectedUser,
	handleClearMessage,
	actionLoading,
	isMobile,
	setShowFriendsList,
	showFriendsList,
}) => {
	return (
		<Flex h={"60px"} p={"0px 15px"} w={"100%"} alignItems={"center"}>
			<Flex mr={"10px"} display={isMobile && !showFriendsList ? "block" : "none"}>
				<IoArrowBackSharp
					color={"white"}
					size={"25px"}
					onClick={() => setShowFriendsList(true)}
				/>
			</Flex>
			<Image
				opacity={selectedUser?.image ? "1" : "0"}
				src={imageFormatter(selectedUser?.image)}
				width={"40px"}
				h={"40px"}
				borderRadius={"50%"}
			/>
			<VStack ml={"10px"}>
				<Text color='white'>
					{selectedUser?.firstName || selectedUser?.name} {selectedUser?.lastName}
				</Text>
			</VStack>
			<Flex ml={"auto"} alignItems={"center"}>
				{!actionLoading ? (
					<FaTrash
						onClick={() => handleClearMessage()}
						cursor={"pointer"}
						fontSize={"23px"}
						height={"100%"}
						color={"white"}
					/>
				) : (
					<Spinner color={"white"} />
				)}
			</Flex>
		</Flex>
	);
};

export default React.memo(UserInformation);
