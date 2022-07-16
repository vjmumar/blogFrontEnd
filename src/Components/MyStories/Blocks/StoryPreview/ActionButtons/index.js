/* eslint-disable no-unused-vars */
import React from "react";

// Router
import { Link } from "react-router-dom";

// Components
import { Flex, Text, Button } from "@chakra-ui/react";
// Icons
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { CREATE_STORY_ROUTE, READ_STORY_ROUTE } from "../../../../../Routes";
// Constant
import {
	BOOKMARKED_STORIES_PARAMS,
	DRAFT_STORIES_PARAMS,
} from "../../../../../Pages/MyStories/constant";

const ActionButton = ({
	handleRemove,
	id,
	handleEdit,
	accountId,
	type,
	removeStoryLoading,
	authorAccountId,
}) => {
	return (
		<Flex flexWrap={{ base: "wrap", lg: "unset" }}>
			{type !== BOOKMARKED_STORIES_PARAMS && (
				<>
					<Link to={`${CREATE_STORY_ROUTE}?edit=${id}`}>
						<Button
							onClick={() => handleEdit(id)}
							mr={"10px"}
							p={"0px"}
							bg={"0"}
							_hover={{
								background: "transparent",
							}}
							color={"black"}
							zIndex={"-1"}
							isLoading={removeStoryLoading}
						>
							<AiFillEdit />
							<Text ml={"5px"}>Edit</Text>
						</Button>
					</Link>
					<Button
						onClick={() => handleRemove(id)}
						p={"0px"}
						bg={"0"}
						_hover={{
							background: "transparent",
						}}
						color={"black"}
						mr={"10px"}
						isLoading={removeStoryLoading}
					>
						<AiFillDelete />
						<Text ml={"5px"}>Remove</Text>
					</Button>
				</>
			)}
			{type !== DRAFT_STORIES_PARAMS && (
				<Link
					to={`${READ_STORY_ROUTE}/${
						type !== BOOKMARKED_STORIES_PARAMS ? accountId : authorAccountId
					}?story=${id}`}
				>
					<Button
						mr={type !== BOOKMARKED_STORIES_PARAMS ? "10px" : "0"}
						p={"0px"}
						bg={"0"}
						_hover={{
							background: "transparent",
						}}
						color={"black"}
					>
						<BsEyeFill />
						<Text ml={"5px"}>Preview</Text>
					</Button>
				</Link>
			)}
		</Flex>
	);
};

export default ActionButton;
