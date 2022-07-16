/* eslint-disable no-unused-vars */
import React from "react";
// Components
import { Flex, Text, Image, VStack } from "@chakra-ui/react";
import ActionButton from "./ActionButtons";
// Helper
import { imageFormatter, truncateString } from "../../../../Helpers";
// Markup
import { Markup } from "interweave";

const StoryPreview = ({
	title,
	text,
	image,
	handleRemove,
	id,
	handleEdit,
	accountId,
	type,
	removeStoryLoading,
	authorAccountId,
}) => {
	return (
		<Flex
			alignItems={"center"}
			w={"100%"}
			justifyContent={"space-between"}
			flexDirection={{ base: "column", lg: "row" }}
			className={"story-preview"}
			mt={{ base: "10px", lg: "unset" }}
		>
			<VStack w={"100%"} pr={"15px"} alignItems={"flex-start"}>
				<Text fontSize={{ base: "18px", lg: "25px" }} fontWeight={"bold"}>
					{title}
				</Text>
				<Markup content={truncateString(text, 200)} />
				<ActionButton
					handleRemove={handleRemove}
					id={id}
					handleEdit={handleEdit}
					accountId={accountId}
					authorAccountId={authorAccountId}
					type={type}
					removeStoryLoading={removeStoryLoading}
				/>
			</VStack>
			<Flex
				mt={{ base: "20px", lg: "0" }}
				w={{ base: "100%", lg: "25%" }}
				h={"100%"}
				flexGrow={"1"}
				flexShrink={"0"}
				justifyContent={"flex-end"}
			>
				<Image
					objectPosition={"top"}
					zIndex={"-1"}
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
