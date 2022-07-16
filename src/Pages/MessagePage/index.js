import React from "react";
// Component
import { Flex } from "@chakra-ui/react";
import SideBar from "../../Components/SideBar";
import MessageBody from "../../Components/Message";
// Context
import { ContextProvider } from "./context";

const MessagePage = () => {
	return (
		<Flex p={"0px !important"} m={"0px !important"} w={"100%"}>
			<SideBar />
			<ContextProvider>
				<MessageBody />
			</ContextProvider>
		</Flex>
	);
};

export default MessagePage;
