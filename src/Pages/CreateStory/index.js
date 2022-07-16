import React from "react";

// Components
import { Flex, VStack } from "@chakra-ui/react";
import SideBar from "../../Components/SideBar";
import Form from "../../Components/CreateStory/Form/index";
import SearchSideBar from "../../Components/SearchSideBar";
import { ContextProvider } from "./context";

const CreateStory = () => {
	return (
		<Flex
			m={"0px !important"}
			w={"100%"}
			justifyContent={"space-between"}
			alignItems={"flex-start"}
			minH={"100vh"}
			pb={{ base: "60px", lg: "unset" }}
		>
			<SideBar />
			<VStack
				flexWrap={"wrap"}
				maxW={{ base: "100%", lg: "900px" }}
				minW={{ base: "100%", lg: "900px" }}
			>
				<VStack p={"30px 15px"} w={"100%"}>
					<ContextProvider>
						<Form />
					</ContextProvider>
				</VStack>
			</VStack>
			<SearchSideBar />
		</Flex>
	);
};

export default CreateStory;
