/* eslint-disable react/display-name */
/* eslint-disable react/no-unescaped-entities */
import React, { memo, lazy, Suspense } from "react";
// Components
import { VStack, Heading, Spinner } from "@chakra-ui/react";
import MoreStories from "./MoreStories";
// Helpers
// Lazy
const Bio = lazy(() => import("../AuthorSideBar/Bio"));

const AuthorSideBar = memo(({ data }) => {
	return (
		<VStack
			h={"100%"}
			p={"20px 15px !important"}
			minW={{ base: '100%', lg: "300px" }}
			maxW={{ base: '100%', lg: "300px" }}
			minH={"100%"}
			maxH={"100%"}
			mt={{ base: '0px !important', lg: 'unset'}}
			position={"sticky"}
			top={"0"}
			overflowY={"scroll"}
			w={"100%"}
			css={{
				"&::-webkit-scrollbar": {
					display: "none",
				},
			}}
			border={"1px solid #E6E6E6"}
		>
			<Suspense fallback={<Spinner />}>
				<Bio data={data} />
			</Suspense>
			<VStack w={"100%"} mt={"20px !important"}>
				<Heading w={"100%"} fontSize={"17px"} textAlign={"left"}>
					More From Blog App
				</Heading>
				<MoreStories />
			</VStack>
		</VStack>
	);
});

export default AuthorSideBar;
