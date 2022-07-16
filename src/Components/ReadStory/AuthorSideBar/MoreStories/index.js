import React, { lazy, Suspense } from "react";
// Components
import { Divider } from "@chakra-ui/react";
import RandomStoriesSekeleton from "../../../RandomStoriesSkeleton";
// Redux
import { useSelector } from "react-redux";
// Lazy
const Block = lazy(() => import("./Block"));

const MoreStories = () => {
	// Redux Methods
	const { isLoading, stories } = useSelector((state) => state.getRandomStoriesStates);
	return (
		<>
			{!isLoading ? (
				stories.map((e, index) => (
					<Suspense key={index} fallback={<RandomStoriesSekeleton />}>
						{index !== 0 && <Divider />}
						<Block data={e} />
					</Suspense>
				))
			) : (
				<RandomStoriesSekeleton />
			)}
		</>
	);
};

export default MoreStories;
