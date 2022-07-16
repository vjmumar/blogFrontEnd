import React, { lazy, Suspense, useContext } from "react";

// Components
import { VStack, Button, Spinner } from "@chakra-ui/react";
import EndOfListDivider from "../EndOfListDivider";

// Context
import { Context } from "../../Pages/SearchPage/context";

// Redux
import { useSelector } from "react-redux";

// Lazy
const Blocks = lazy(() => import("./Blocks/index"));

const Stories = () => {
	const { search, isLoading } = useSelector((state) => state.searchStoriesStates);

	const { handleIncrementStory, storyIncrement } = useContext(Context);

	return (
		<VStack mt={"25px !important"} w={"100%"}>
			<Suspense fallback={<Spinner />}>
				<Blocks searchedStory={search?.stories} />
			</Suspense>
			{search?.totalStories > storyIncrement || isLoading ? (
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
