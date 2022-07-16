import React from "react";
// Components
import { Flex, Stack } from "@chakra-ui/react";
// Styles
import "../TypingIndicator/style.css";

const TypingIndicator = () => {
	return (
		<Flex w={"40px"}>
			<Stack className={"typing__dot"}></Stack>
			<Stack className={"typing__dot"}></Stack>
			<Stack className={"typing__dot"}></Stack>
		</Flex>
	);
};

export default TypingIndicator;
