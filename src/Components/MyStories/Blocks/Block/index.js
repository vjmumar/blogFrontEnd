/* eslint-disable react/prop-types */
import React from "react";
// Components
import {VStack, Divider} from "@chakra-ui/react";
import UserInformation from "../UserInformation";
import StoryPreview from "../StoryPreview";

const Block = ({
    accountImage,
    firstName,
    lastName,
    dateCreated,
    storyId,
    type,
    storyTitle,
    storyText,
    storyImage,
	likes,
	authorAccountId,
	isUserLikedThisStory,
    handleRemove,
    handleEdit,
    removeStoryLoading,
    accountId,
    index
}) => {
	return (
		<VStack mb={"20px !important"} w={"100%"} className={"user-info-wrapper"}>
			<UserInformation
				image={accountImage}
				fName={firstName}
				likes={likes}
				isUserLikedThisStory={isUserLikedThisStory}
				lName={lastName}
				type={type}
				dCreated={dateCreated}
			/>
			<StoryPreview
				id={storyId}
				handleRemove={handleRemove}
				handleEdit={handleEdit}
				type={type}
				title={storyTitle}
				text={storyText}
				authorAccountId={authorAccountId}
				image={storyImage}
				removeStoryLoading={removeStoryLoading}
				accountId={accountId}
			/>
              {index ? <Divider zIndex={"-1"} mb={"10px !important"} /> : ""}
		</VStack>
	);
};

export default Block;
