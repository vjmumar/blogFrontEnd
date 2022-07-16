import React, { lazy, Suspense, useContext } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import StorySkeleton from "../StorySkeleton";
import { VStack, Button } from "@chakra-ui/react";
import EndOfListDivider from "../EndOfListDivider";

// Context
import { Context } from "../../Pages/HomePage/context";

// Lazy
const Blocks = lazy(() => import("./Blocks/index"));

const Stories = () => {
	const { isLoading, data } = useSelector((state) => state.homeStoriesStates);
	const { handleIncrementStory, storyIncrement } = useContext(Context);

	return (
		<VStack mt={"25px !important"} w={"100%"}>
			<Suspense fallback={<StorySkeleton />}>
				<Blocks selectedStory={data?.stories} />
			</Suspense>
			{data?.totalStories > storyIncrement || isLoading ? (
				<Button
					onClick={handleIncrementStory}
					isLoading={isLoading}
					color={"white"}
					bg={"black"}
					p={"25px 17%"}
					mt={"15px !important"}
				>
					More
				</Button>
			) : (
				<EndOfListDivider />
			)}
		</VStack>
	);
};

export default Stories;
