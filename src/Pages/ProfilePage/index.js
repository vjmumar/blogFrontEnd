import React, { lazy, Suspense } from "react";
// Components
import { Flex, VStack } from "@chakra-ui/react";
import { ContextProvider } from "./context";
import SideBar from "../../Components/SideBar";
import ProfileInformationSkeleton from "../../Components/ProfileInformationSkeleton";
import Stories from "../../Components/Profile/ProfileStories";

// Lazy
const Information = lazy(() => import("../../Components/Profile/ProfileInformation"));

const ProfilePage = () => {
	return (
		<Flex pb={{ base: "60px", lg: "unset" }} m={"0px !important"} w={"100%"}>
			<Flex
				flexDirection={{ base: "column-reverse", lg: "row" }}
				w={"100%"}
				justifyContent={"space-between"}
			>
				<SideBar />
				<ContextProvider>
					<VStack
            p={{ base: "0px 15px 30px", lg: "unset" }}
						maxW={{ base: "100%", lg: "900px" }}
						minW={{ base: "100%", lg: "900px" }}
						mb={"20px"}
						mt={"10px"}
					>
						<Stories />
					</VStack>
					<VStack
						position={{ base: "relative", lg: "sticky" }}
						top={"0"}
            flexShrink={"0"}
						ml={{ base: "unset", lg: "20px" }}
						mr={{ base: "unset", lg: "30px" }}
						mt={{ base: "0", lg: "30px"}}
						w={{ base: "100%", lg: "350px" }}
					>
						<Suspense fallback={<ProfileInformationSkeleton />}>
							<Information />
						</Suspense>
					</VStack>
				</ContextProvider>
			</Flex>
		</Flex>
	);
};

export default ProfilePage;
