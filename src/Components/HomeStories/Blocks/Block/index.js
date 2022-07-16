/* eslint-disable react/prop-types */
import React from "react";

// Components
import UserInformation from "../UserInformation";
import StoryPreview from "../StoryPreview";
import { VStack } from "@chakra-ui/react";

// Router
import { Link } from "react-router-dom";
// Route
import { READ_STORY_ROUTE } from "../../../../Routes";

const Block = ({ e }) => {
	return (
		<>
			<VStack w={"100%"}>
				<VStack mb={"20px !important"} w={"100%"} className={"user-info-wrapper"}>
					<Link
						style={{ width: "100%" }}
						to={`${READ_STORY_ROUTE}/${e?.accountId}?story=${e?.story.id}`}
					>
						<UserInformation
							image={e.imageLink}
							fName={e.firstName}
							lName={e.lastName}
							dCreated={e.story.dateCreated}
						/>
						<StoryPreview
							title={e.story.title}
							text={e.story.text}
							likes={e.story.likes || []}
							image={e.story.heroLink}
							isUserLikedThisStory={e.isUserLikedThisStory}
							commentsTotal={e.story.comments.length}
						/>
					</Link>
				</VStack>
			</VStack>
		</>
	);
};

export default Block;
