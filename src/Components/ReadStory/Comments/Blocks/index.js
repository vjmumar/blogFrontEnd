import React from "react";
// Components
import { Flex, Text, VStack, Image } from "@chakra-ui/react";
// Helpers
import { imageFormatter, dateFormatter } from "../../../../Helpers";

const CommentsBlock = ({ comment }) => {
	console.log(comment)
	return (
		<>
			<VStack p={"10px"} w={"100%"}>
				<Flex w={"100%"} alignItems={"center"}>
					<Image
						border={"1px solid"}
						p={"3px"}
						mr={"5px"}
						w={"40px"}
						h={"40px"}
						borderRadius={"50%"}
						src={imageFormatter(comment?.senderImage)}
					/>
					<VStack alignItems={"flex-start"}>
						<Text fontSize={"15px"}>
							{comment?.senderFirstName} {comment?.senderLastName}
						</Text>
						<Text mt={"0px !important"} fontSize={"10px"}>
							{comment?.status && comment?.status === "Sending"
								? "Sending"
								: dateFormatter(comment?.data?.dateCreated)
							}
						</Text>
					</VStack>
				</Flex>
				<Text textAlign={"left"} w={"100%"}>
					{comment?.data?.text || comment?.text}
				</Text>
			</VStack>
		</>
	);
};

export default CommentsBlock;
