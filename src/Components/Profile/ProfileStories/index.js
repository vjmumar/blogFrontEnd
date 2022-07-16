import React, { lazy, Suspense, useContext } from "react";

// Components
import { VStack, Button, Flex, Heading, Divider } from "@chakra-ui/react";
import EndOfListDivider from "../../EndOfListDivider";
import StorySkeleton from "../../StorySkeleton";
import FilterForm from "../../FilterForm";

// Context
import { Context } from "../../../Pages/ProfilePage/context";

// Redux
import { useSelector } from "react-redux";

// Constants
import { customStyles, selectOptions } from "../../../Pages/ProfilePage/constant";

// Lazy
const Blocks = lazy(() => import("./Blocks/index"));

const Stories = () => {
	const { handleIncrementStory, storyIncrement, userId, handleFilterStories } =
		useContext(Context);

	// Redux Methods
	const { stories, isLoading } = useSelector(
		(state) => state.pubAndDraftAndBookmarkedStoriesStates
	);

	return (
		<VStack mt={{ base: "unset", lg: "25px !important" }} w={"100%"}>
			<Flex
				justifyContent={"space-between"}
				alignItems={"flex-start"}
				w={"100%"}
			>
				<Heading
					fontSize={{ base:"20px", lg: "30px"}}
					w={"100%"}
					mb={{ base: "10px", lg: "unset" }}
					textAlign={"left"}
				>
					User Stories
				</Heading>
				<FilterForm
					handleFilterStories={handleFilterStories}
					customStyles={customStyles}
					selectOptions={selectOptions}
				/>
			</Flex>
			<Divider
				display={{ base: "none", lg: "block" }}
				pb={"10px !important"}
				mb={"10px !important"}
			/>
			<Suspense fallback={<StorySkeleton />}>
				<Blocks accountId={userId} stories={stories?.stories} />
			</Suspense>
			{stories?.totalStories > storyIncrement || isLoading ? (
				<Button
					onClick={handleIncrementStory}
					color={"white"}
					bg={"black"}
					p={"25px 17%"}
					isLoading={isLoading}
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
