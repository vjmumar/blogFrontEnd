/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// Component
import { Flex, Text, VStack, Divider, IconButton } from "@chakra-ui/react";
// Icons
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { MdCommentBank } from "react-icons/md";
// Redux
import { useSelector } from "react-redux";
// Helpers
import { numberFormatter } from "../../../Helpers";
// Hooks
import { useComponentDidMount } from "../../../Hooks/useComponendDidMount";
import useComponentDidUnMount from "../../../Hooks/useComponentDidUnMount";
import { useComponentShouldUpdate } from "../../../Hooks/useComponendShouldUpdate";

const FloatingActions = ({
	handleToggleComment,
	data,
	isCommentOpen,
	storyComments,
	handleLikeAndUnlike,
}) => {
	const [oldValue, setOldValue] = useState(0);
	const [isScrollTop, setIsScrolledTop] = useState(true);
	const { isLoading: storyActionLoading } = useSelector((state) => state.storyActionsStates);

	const handleDetectScroll = () => {
		const newValue = window.scrollY;
		setIsScrolledTop(newValue < oldValue);
		setOldValue(newValue);
	};

	useComponentDidMount(() => {
		window.addEventListener("scroll", handleDetectScroll);
	});

	useComponentShouldUpdate(() => {
		window.addEventListener("scroll", handleDetectScroll);
	},[window.scrollY])

	useComponentDidUnMount(() => {
		window.removeEventListener("scroll", handleDetectScroll);
	});

	return (
		<VStack
			position={"fixed"}
			bottom={{ base: "10%", lg: "15px" }}
			ml={"auto"}
			mr={"auto"}
			display={isScrollTop ? "block" : "none"}
			maxW={"fit-content"}
			p={"10px 20px"}
			borderRadius={"6px"}
			bg={"white"}
			border={"1px solid #E6E6E6"}
			style={{
				WebkitMarginStart: "",
			}}
		>
			<Flex>
				<Flex alignItems={"center"} m={"0px 10px"}>
					<IconButton
						icon={
							!data?.doesUserLikedThisStory ? (
								<AiOutlineLike size={"25px"} />
							) : (
								<AiFillLike size={"25px"} />
							)
						}
						onClick={() => handleLikeAndUnlike()}
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
					<Text fontSize={"10px"}>
						{numberFormatter(data?.story?.likes?.length || 0)}
					</Text>
				</Flex>
				<Divider h={"22px"} borderColor={"#E6E6E6"} orientation='vertical' />
				<Flex alignItems={"center"} m={"0px 10px"}>
					<IconButton
						icon={
							!isCommentOpen ? (
								<GoComment size={"25px"} />
							) : (
								<MdCommentBank size={"25px"} />
							)
						}
						onClick={() => handleToggleComment()}
						minWidth={"fit-content"}
						cursor={"pointer"}
						minH={"fit-content"}
						bg={"none"}
						h={"fit-content"}
						outline={"none"}
						_hover={{ backgroundColor: "none", outline: "none" }}
						_focus={{ backgroundColor: "none", outline: "none" }}
						_active={{ backgroundColor: "none", outline: "none" }}
					/>
					<Text fontSize={"10px"}>{numberFormatter(storyComments.length)}</Text>
				</Flex>
			</Flex>
		</VStack>
	);
};

export default FloatingActions;
