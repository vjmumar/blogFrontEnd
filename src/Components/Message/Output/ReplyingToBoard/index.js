import React from "react";
// Components
import { VStack, Text, Stack } from "@chakra-ui/react";
// Icons
import { IoIosClose } from "react-icons/io";

const ReplyingBoard = ({ replyingToText, setReplyingToText }) => {
	return (
		<>
			{replyingToText.length > 3 && (
				<VStack
					w={"100%"}
					p={"10px 15px"}
					position={{ base: 'relative', lg: "sticky"}}
					bottom={"0"}
					borderTop={"1px solid #E6E6E6"}
					bg={"white"}
					mt={"auto !important"}
				>
					<Stack onClick={() => setReplyingToText("")} cursor={"pointer"} position={"absolute"} right={"20px"} top={"20px"}>
						<IoIosClose size={"30px"} />
					</Stack>
					<Text textAlign={"left"} w={"100%"}>
						Replying To:
					</Text>
					<Text textAlign={"left"} w={"100%"}>
						{replyingToText}
					</Text>
				</VStack>
			)}
		</>
	);
};

export default ReplyingBoard;
