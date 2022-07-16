import React from "react";

// Components
import { Flex, VStack } from "@chakra-ui/react";
import BreadCrumbs from "../../Components/BreadCrumbs/index";
import SideBar from "../../Components/SideBar";

// Context
import { ContextProvider, Context } from "./context";
import Stories from "../../Components/MyStories";
import SearchSideBar from "../../Components/SearchSideBar";

// Constant
import {
	BOOKMARKED_STORIES_PARAMS,
	BOOKMARKED_STORIES_TYPE,
	DRAFT_STORIES_PARAMS,
	DRAFT_STORIES_TYPE,
	PUBLISHED_STORIES_PARAMS,
	PUBLISHED_STORIES_TYPE,
} from "./constant";

const MyStories = () => {
	return (
		<Flex
			m={"0px !important"}
			pb={{ base: "60px", lg: "unset" }}
			w={"100%"}
			justifyContent={"space-between"}
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
								name: "Draft",
								params: DRAFT_STORIES_PARAMS,
								type: DRAFT_STORIES_TYPE,
							},
							{
								name: "Published",
								params: PUBLISHED_STORIES_PARAMS,
								type: PUBLISHED_STORIES_TYPE,
							},
							{
								name: "Bookmarks",
								params: BOOKMARKED_STORIES_PARAMS,
								type: BOOKMARKED_STORIES_TYPE,
							},
						]}
					/>
					<Stories />
				</VStack>
				<SearchSideBar />
			</ContextProvider>
		</Flex>
	);
};

export default MyStories;
