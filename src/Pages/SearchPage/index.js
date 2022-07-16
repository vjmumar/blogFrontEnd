import React from "react";

// Router
import { useSearchParams } from "react-router-dom";

// Constant
import { STORIES_PARAMS, STORIES_TYPE, USERS_TYPE, USER_PARAMS } from "./constant";

// Components
import { Flex, VStack, Text } from "@chakra-ui/react";
import SideBar from "../../Components/SideBar";
import Stories from "../../Components/SearchStories";
import SearchSideBar from "../../Components/SearchSideBar";
import { ContextProvider, Context } from "./context";
import BreadCrumbs from "../../Components/BreadCrumbs/index";
import Users from "../../Components/Users";

const SearchPage = () => {
	const [searchParams] = useSearchParams();
	const type = searchParams.get("type");

	return (
		<Flex
			w={"100%"}
			m={"0px"}
			justifyContent={"space-between"}
			mb={"auto !important"}
			pb={{ base: "60px", lg: "unset" }}
		>
			<ContextProvider>
				<SideBar />
				<VStack
					p={"30px 15px"}
					maxW={{ base: "100%", lg: "1000px" }}
					minW={{ base: "100%", lg: "1000px" }}
				>
					
					<BreadCrumbs
						context={Context}
						menus={[
							{
								name: "People",
								params: USER_PARAMS,
								type: USERS_TYPE,
							},
							{
								name: "Stories",
								params: STORIES_PARAMS,
								type: STORIES_TYPE,
							},
						]}
					/>

					{type === STORIES_PARAMS ? (
						<Stories />
					) : type === USER_PARAMS ? (
						<Users />
					) : (
						<Text>Type Not Found</Text>
					)}
				</VStack>
				<SearchSideBar />
			</ContextProvider>
		</Flex>
	);
};

export default SearchPage;
