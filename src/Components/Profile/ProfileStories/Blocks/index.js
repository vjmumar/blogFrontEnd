import React, { lazy, Suspense } from "react";

// Components
import { Divider, VStack } from "@chakra-ui/react";
import StorySkeleton from "../../../StorySkeleton";

// Lazy
const Block = lazy(() => import("./Block"));

const Blocks = ({ stories }) => {
	return (
		<>
			{stories?.map((e, index) => (
				<VStack w={"100%"} key={index}>
					{index ? <Divider zIndex={"-1"} mb={"10px !important"} /> : ""}
					<Suspense key={index} fallback={<StorySkeleton />}>
						<Block
							accountId={e?.accountId}
							storyId={e?.story?.id}
							accountImage={e?.imageLink}
							firstName={e?.firstName}
							isUserLikedThisStory={e?.isUserLikedThisStory}
							lastName={e?.lastName}
							title={e?.story?.title}
							likes={e?.story?.likes || []}
							text={e?.story?.text}
							heroLink={e?.story?.heroLink}
							dateCreated={e?.story?.dateCreated}
						/>
					</Suspense>
				</VStack>
			))}
		</>
	);
};

export default Blocks;
