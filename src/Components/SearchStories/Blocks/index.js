import React from "react";

// Components
import UserInformation from "./UserInformation";
import StoryPreview from "./StoryPreview";
import { Divider, VStack } from "@chakra-ui/react";
// Router
import { Link } from "react-router-dom";
// Routes
import { READ_STORY_ROUTE } from "../../../Routes";

const Blocks = ({ searchedStory }) => {
	return (
		<>
			{searchedStory?.map((e, index) => (
				<VStack w={"100%"} key={index}>
					{index ? <Divider zIndex={"-1"} mb={"10px !important"} /> : ""}
					<VStack mb={"20px !important"} w={"100%"} className={"user-info-wrapper"}>
						<Link style={{width: '100%'}} to={`${READ_STORY_ROUTE}/${e.accountId}?story=${e.story.id}`}>
							<UserInformation
								image={e.imageLink}
								fName={e.firstName}
								lName={e.lastName}
								dCreated={e.story?.dateCreated}
							/>
							<StoryPreview
								title={e.story?.title}
								text={e.story?.text}
								image={e.story?.heroLink}
								likes={e.story?.likes}
								isUserLikedThisStory={e?.isUserLikedThisStory}
							/>
						</Link>
					</VStack>
				</VStack>
			))}
		</>
	);
};

export default Blocks;
