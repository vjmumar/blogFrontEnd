/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from "react";

// Components
import { Flex, VStack } from "@chakra-ui/react";
import SideBar from "../../Components/SideBar";
import SearchSideBar from "../../Components/SearchSideBar";
import BreadCrumbs from "../../Components/BreadCrumbs/index";

// Context
import { ContextProvider, Context } from "./context";

// Constants
import { FOLLOWED_STORIES_PARAMS, LATEST_STORIES_PARAMS } from "./constant";

// Lazy
const Stories = lazy(() => import("../../Components/HomeStories"));

const HomePage = () => {
	return (
		<Flex
			m={"0px"}
			mb={"auto !important"}
			w={"100%"}
			justifyContent={"space-between"}
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
								name: "Followed Users Stories",
								params: FOLLOWED_STORIES_PARAMS,
								type: FOLLOWED_STORIES_PARAMS,
							},
							{
								name: "Latest Stories",
								params: LATEST_STORIES_PARAMS,
								type: LATEST_STORIES_PARAMS,
							},
						]}
					/>
					<Suspense fallback={""}>
						<Stories />
					</Suspense>
				</VStack>
				<SearchSideBar />
			</ContextProvider>
		</Flex>
	);
};

export default HomePage;
