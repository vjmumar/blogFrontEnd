import React from "react";
// Context
import { ContextProvider } from "./context";
// Components
import { Flex } from "@chakra-ui/react";
import NotificationBody from "../../Components/Notification";
import SideBar from "../../Components/SideBar";
import SearchSideBar from "../../Components/SearchSideBar";

const Notification = () => {
	return (
		<Flex
			h={"100%"}
			m={"0px !important"}
			pb={{ base: "60px", lg: "unset" }}
			w={"100%"}
			mb={"auto !important"}
			justifyContent={"space-between"}
		>
			<SideBar />
			<ContextProvider>
				<NotificationBody />
			</ContextProvider>
			<SearchSideBar />
		</Flex>
	);
};

export default Notification;
