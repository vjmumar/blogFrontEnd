/* eslint-disable react/display-name */
import React, { lazy, Suspense, useRef, memo } from "react";
// Components
import { VStack, Text, Spinner, Divider, Flex, Stack } from "@chakra-ui/react";
import Form from "./Form";
// Hooks
import { useComponentShouldUpdate } from "../../../Hooks/useComponendShouldUpdate";
import { useSelector } from "react-redux";
import { numberFormatter } from "../../../Helpers";
// Icons
import { GrClose } from "react-icons/gr";
// Lazy
const CommentsBlock = lazy(() => import("../Comments/Blocks/index"));

const Comments = memo(
	({ handleSendComment, storyComments, handleIncrementComments, storyCommentsTotal, toggleComment }) => {
		// Ref
		const commentsWrapperRef = useRef("");
		// Redux
		const { isLoading } = useSelector((state) => state.storyCommentsStates);

		useComponentShouldUpdate(() => {
			const commentsWrapper = commentsWrapperRef.current;
			commentsWrapper.scrollTo(0, commentsWrapper.scrollHeight);
		}, [handleIncrementComments]);

		return (
			<VStack maxH={{ base: '100%', lg: '100%'}} w={"100%"} h={"100%"} top={"0"} position={"sticky"}>
				<VStack
					h={"100%"}
					p={"0px 5px 5px 5px"}
					minW={{ base: "100%", lg: "300px" }}
					maxW={{ base: "100%", lg: "300px" }}
					minH={"100%"}
					maxH={"100%"}
					mt={{ base: "0px !important", lg: "unset" }}
					overflowY={"scroll"}
					w={"100%"}
					css={{
						"&::-webkit-scrollbar": {
							display: "none",
						},
					}}
					ref={commentsWrapperRef}
					border={"1px solid #E6E6E6"}
				>
					<VStack
						position={"sticky"}
						top={"0"}
						bg={"white"}
						p={"15px 0px 0px !important"}
						w={"100%"}
					>
						<Text
							mb={"10px"}
							mt={"0px !important"}
							ml={"10px"}
							textAlign={"left"}
							w={"100%"}
						>
							Comments{`(${numberFormatter(storyCommentsTotal)})`}
						</Text>
						<Divider />
						<Stack onClick={() => toggleComment()} display={{ base: 'block', lg: 'none'}} position={"absolute"} top={"15px"} right={"20px"}>
							<GrClose size={"20px"} />	
						</Stack>
					</VStack>

					{storyComments?.length < storyCommentsTotal && (
						<Flex>
							<Spinner display={isLoading ? "block" : "none"} w={"15px"} h={"15px"} />
							<Text
								textAlign={"center"}
								fontSize={"13px"}
								cursor={"pointer"}
								pointerEvents={isLoading ? "none" : "all"}
								onClick={handleIncrementComments}
							>
								Load Previous Comments
							</Text>
						</Flex>
					)}

					{storyComments?.map((e, index) => (
						// eslint-disable-next-line react/jsx-key
						<Suspense fallback={<Spinner />}>
							{index !== 0 && <Divider />}
							<CommentsBlock comment={e} />
						</Suspense>
					))}
				</VStack>
				<Form handleSendComment={handleSendComment} />
			</VStack>
		);
	}
);

export default Comments;
