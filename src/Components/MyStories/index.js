import React, { lazy, Suspense, useContext } from "react";

// Components
import { VStack, Button } from "@chakra-ui/react";
import EndOfListDivider from "../EndOfListDivider";
import FilterForm from "../FilterForm";
import StorySkeleton from "../StorySkeleton";

// Context
import { Context } from "../../Pages/MyStories/context";
import { useSelector } from "react-redux";

// Constants
import { customStyles, selectOptions } from "../../Pages/MyStories/constant";

// Lazy
const Blocks = lazy(() => import("./Blocks/index"));

const Stories = () => {
	// Redux
	const { userId: accountId } = useSelector((state) => state.signInStates);
	const { isLoading: removeStoryLoading } = useSelector((state) => state.createStoryStates);
	const { stories, isLoading: storiesLoading } = useSelector(
		(state) => state.pubAndDraftAndBookmarkedStoriesStates
	);

	const {
		handleIncrementStory,
		storyIncrement,
		handleEdit,
		handleRemove,
		type,
		handleFilterStories,
	} = useContext(Context);

	return (
		<VStack mt={"25px !important"} w={"100%"}>
			<FilterForm
				handleFilterStories={handleFilterStories}
				customStyles={customStyles}
				selectOptions={selectOptions}
			/>
			<Suspense fallback={<StorySkeleton />}>
				<Blocks
					handleRemove={handleRemove}
					handleEdit={handleEdit}
					accountId={accountId}
					removeStoryLoading={removeStoryLoading}
					type={type}
					stories={stories?.stories}
				/>
			</Suspense>
			{stories?.totalStories > storyIncrement || removeStoryLoading || storiesLoading ? (
				<Button
					isLoading={removeStoryLoading || storiesLoading}
					onClick={handleIncrementStory}
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
