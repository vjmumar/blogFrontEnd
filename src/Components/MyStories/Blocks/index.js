/* eslint-disable react/prop-types */
import React, { lazy, Suspense } from "react";

// Components
import StorySkeleton from "../../StorySkeleton";
const Block = lazy(() => import("../Blocks/Block/"));

const Blocks = ({ handleRemove, handleEdit, stories, accountId, type, removeStoryLoading }) => {
	return (
		<>
			{stories?.map((e, index) => (
				<Suspense key={index} fallback={<StorySkeleton />}>
					<Block
						accountImage={e.imageLink}
						firstName={e.firstName}
						lastName={e.lastName}
						dateCreated={e.story.dateCreated}
						storyId={e.story.id}
						authorAccountId={e.accountId}
						type={type}
						isUserLikedThisStory={e.isUserLikedThisStory}
						likes={e?.story?.likes || []}
						storyTitle={e.story.title}
						storyText={e.story.text}
						storyImage={e.story.heroLink}
						removeStoryLoading={removeStoryLoading}
						accountId={accountId}
						index={index}
						handleRemove={handleRemove}
						handleEdit={handleEdit}
					/>
				</Suspense>
			))}
		</>
	);
};

export default Blocks;
