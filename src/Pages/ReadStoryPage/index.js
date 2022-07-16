import React from "react";
// Components
import { Flex, VStack } from "@chakra-ui/react";
import { ContextProvider } from "./context";
import SideBar from "../../Components/SideBar";
import StoryBody from "../../Components/ReadStory";

const ReadStoryPage = () => {
	return (
		<Flex w={"100%"} minWidth={"100%"} maxWidth={"0px !important"}>
			<Flex w={"100%"} justifyContent={"space-between"}>
				<ContextProvider>
					<SideBar />
					<VStack w={"100%"} m={"0 20px"}>
						<StoryBody />
					</VStack>
				</ContextProvider>
			</Flex>
		</Flex>
	);
};

export default ReadStoryPage;
