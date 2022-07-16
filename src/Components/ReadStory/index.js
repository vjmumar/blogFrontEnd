import React, { lazy, Suspense, useContext, useState } from "react";
// Component
import { Flex, Spinner, VStack, Text } from "@chakra-ui/react";
import MoreStories from "./AuthorSideBar/MoreStories";
import ReadStorySidebarSkeleton from "../ReadStorySidebarSkeleton";
import ReadStorySkeleton from "../ReadStorySkeleton/Story";
// Context
import ReadStoryAuthorSkeleton from "../ReadStorySkeleton/Author";
import { Context } from "../../Pages/ReadStoryPage/context";
// Redux
import { useSelector } from "react-redux";
// Hooks
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";
import useComponentDidUnMount from "../../Hooks/useComponentDidUnMount";
// Lazy
const FloatingActions = lazy(() => import("./FloatingActions"));
const Author = lazy(() => import("./Author"));
const AuthorSideBar = lazy(() => import("./AuthorSideBar"));
const Story = lazy(() => import("./Story"));
const Comments = lazy(() => import("./Comments"));
// TinyMce Style
import("./Story/tinyMceStyle.css");

const StoryBody = () => {
	// Redux Methods
	const {
		users,
		storyComments,
		handleSendComment,
		storyCommentsTotal,
		handleLikeAndUnlike,
		handleIncrementComments,
		handleBookmarkAndUnBookmark,
	} = useContext(Context);
	const { data, isLoading } = useSelector((state) => state.storyWithAuthorStates);
	// States
	const [isMobile, setIsMobile] = useState(false);
	const [isCommentOpen, setIsCommentOpen] = useState(false);

	const handleResize = () => {
		setIsMobile(window.innerWidth < 991);
	}

	useComponentDidMount(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	});

	useComponentDidUnMount(() => {
		window.removeEventListener('resize', handleResize)
	});

	return (
		<VStack p={{ base: "20px 0px 150px !important", lg: "30px 0px" }} w={"100%"}>
			<Flex w={"100%"}>
				<VStack
					maxWidth={{ base: "100%", lg: "80%" }}
					flex={"1"}
					mr={{ base: "unset", lg: "20px" }}
				>
					<Suspense fallback={<ReadStoryAuthorSkeleton />}>
						<Author
							data={data}
							handleBookmarkAndUnBookmark={handleBookmarkAndUnBookmark}
						/>
					</Suspense>
					<Suspense fallback={<ReadStorySkeleton />}>
						<Story data={data?.story} />
					</Suspense>
					<Suspense fallback={<Spinner />}>
						<FloatingActions
							data={data}
							storyComments={storyComments}
							isCommentOpen={isCommentOpen}
							handleToggleComment={() => setIsCommentOpen((prev) => !prev)}
							handleLikeAndUnlike={handleLikeAndUnlike}
						/>
					</Suspense>
					{isMobile && (
						<VStack w={"100%"}>
							<Text fontSize={"20px"} fontWeight={"600"}>More Stories From Us!</Text>
							<MoreStories />
						</VStack>
					)}
				</VStack>
				{!isMobile ? (
					<VStack h={"85vh"}>
						{isCommentOpen ? (
							<Suspense fallback={<ReadStorySidebarSkeleton />}>
								<Comments
									storyComments={storyComments}
									users={users}
									isLoading={isLoading}
									handleIncrementComments={handleIncrementComments}
									handleSendComment={handleSendComment}
									storyCommentsTotal={storyCommentsTotal}
								/>
							</Suspense>
						) : (
							<Suspense fallback={<ReadStorySidebarSkeleton />}>
								<AuthorSideBar data={data} />
							</Suspense>
						)}
					</VStack>
				) : (
					<VStack
						bg={"white"}
						position={"fixed"}
						top={"0"}
						left={"0"}
						w={"100%"}
						h={"91.5%"}
						zIndex={"100%"}
						display={isCommentOpen ? "block" : "none"}
					>
						<Suspense fallback={<ReadStorySidebarSkeleton />}>
							<Comments
								storyComments={storyComments}
								users={users}
								toggleComment={(prev) => setIsCommentOpen((prev) => !prev)}
								isLoading={isLoading}
								handleIncrementComments={handleIncrementComments}
								handleSendComment={handleSendComment}
								storyCommentsTotal={storyCommentsTotal}
							/>
						</Suspense>
					</VStack>
				)}
			</Flex>
		</VStack>
	);
};

export default StoryBody;
