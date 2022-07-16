/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { lazy, Suspense } from "react";

// Components
import { Divider, VStack } from "@chakra-ui/react";
import StorySkeleton from "../../StorySkeleton";
// Lazy
const Block = lazy(() => import("./Block"));

const Blocks = ({ selectedStory }) => {
	return (
		<>
			{selectedStory?.map((e, index) => (
				<VStack w={"100%"} key={index}>
					{index ? <Divider zIndex={"-1"} mb={"10px !important"} /> : ""}
					<Suspense key={index} fallback={<StorySkeleton />}>
						<Block e={e} />
					</Suspense>
				</VStack>
			))}
		</>
	);
};

export default Blocks;
