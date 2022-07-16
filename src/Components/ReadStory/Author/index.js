/* eslint-disable react/no-unescaped-entities */
import React from "react";
// Component
import { Flex, Text, Image, VStack, IconButton } from "@chakra-ui/react";
// Icons
import { BiUser } from "react-icons/bi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
// Helper
import { imageFormatter } from "../../../Helpers";
// Redux
import { useSelector } from "react-redux";
// Router
import { Link } from "react-router-dom";
// Routes
import { PROFILE_ROUTE } from "../../../Routes";

const Author = ({ data, handleBookmarkAndUnBookmark }) => {
	// eslint-disable-next-line no-unused-vars
	const {userId: accountId} = useSelector(state => state.signInStates);
	const { isLoading: storyActionLoading } = useSelector((state) => state.storyActionsStates);
	return (
		<Flex position={"sticky"} alignItems={"center"} w={"100%"} justifyContent={"flex-start"}>
			<Flex alignItems={"center"} w={"100%"}>
				<Link to={`${PROFILE_ROUTE}/${data?.authorAccountId}`}>
					<Image
						src={imageFormatter(data?.authorImage)}
						w={"50px"}
						h={"50px"}
						borderRadius={"50%"}
					/>
				</Link>
				<VStack ml={"10px"}>
					<Text w={"100%"} textAlign={"left"} mb={"0px !important"}>
						{data?.authorFirstName} {data?.authorLastName}
					</Text>
					<Flex
						mt={"0px !important"}
						alignItems={"center"}
						justifyContent={"flex-start"}
						w={"100%"}
					>
						<BiUser size={"20px"} />
						<Text ml={"5px"} w={"100%"} textAlign={"left"} mt={"0px !important"}>
							Author
						</Text>
					</Flex>
				</VStack>
				{data?.authorAccountId !== accountId && (
					<Flex alignItems={"center"} w={"fit-content"} ml={"auto"}>
						<IconButton
							icon={
								!data?.doesUserBookmarkedThisStory ? (
									<FaRegBookmark size={"25px"} />
								) : (
									<FaBookmark size={"25px"} />
								)
							}
							onClick={() => handleBookmarkAndUnBookmark()}
							minWidth={"fit-content"}
							cursor={"pointer"}
							minH={"fit-content"}
							bg={"none"}
							isLoading={storyActionLoading}
							h={"fit-content"}
							outline={"none"}
							_hover={{ backgroundColor: "none", outline: "none" }}
							_focus={{ backgroundColor: "none", outline: "none" }}
							_active={{ backgroundColor: "none", outline: "none" }}
						/>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default Author;
