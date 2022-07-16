import React from "react";
// Components
import { VStack } from "@chakra-ui/react";
import UserInformation from "../UserInformation";
import StoryPreview from "../StoryPreview";
// Router
import { Link } from "react-router-dom";
// Routes
import { READ_STORY_ROUTE } from "../../../../../Routes";

const Block = ({
	accountId,
	storyId,
	accountImage,
	firstName,
	lastName,
	isUserLikedThisStory,
	title,
	text,
	heroLink,
	likes,
	dateCreated,
}) => {
	return (
		<VStack mb={"20px !important"} w={"100%"} className={"user-info-wrapper"}>
			<Link
				style={{ width: "100%" }}
				to={`${READ_STORY_ROUTE}/${accountId}?story=${storyId}`}
			>
				<UserInformation
					image={accountImage}
					fName={firstName}
					lName={lastName}
					dCreated={dateCreated}
				/>
				<StoryPreview
					title={title}
					isUserLikedThisStory={isUserLikedThisStory}
					likes={likes}
					text={text}
					image={heroLink}
				/>
			</Link>
		</VStack>
	);
};

export default Block;
