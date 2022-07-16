/* eslint-disable no-unused-vars */
import React, { lazy, Suspense, useContext } from "react";
// Context
import { Context } from "../../Pages/Notification/context";
// Components
import { Heading, VStack, Spinner, Button, Divider, Flex, Text } from "@chakra-ui/react";
import NotificationSkeleton from "../NotificationSkeleton";
// Redux
import { useSelector } from "react-redux";
// Icons
import { HiOutlineTrash } from "react-icons/hi";
// Lazy
const Block = lazy(() => import("./Block"));

const NotificationBody = () => {
	const { increment, handleIncrement, handleClearNotification } = useContext(Context);
	// Redux Methods
	const { totalNotifications, notifications, isLoading } = useSelector(
		(state) => state.notificationStates
	);

	const { isLoading: actionLoading } = useSelector((state) => state.userActionsStates);

	return (
		<VStack
			maxW={{ base: "100%", lg: "900px" }}
			minW={{ base: "100%", lg: "900px" }}
			p={"30px 15px"}
		>
			<Flex justifyContent={"space-between"} alignItems={"flex"} w={"100%"}>
				<Heading fontSize={{ base: "20px", lg: "28px" }} textAlign={"left"}>
					Notifications
				</Heading>
				<Flex
					onClick={() => handleClearNotification()}
					alignItems={"center"}
					cursor={"pointer"}
				>
					{!actionLoading ? <HiOutlineTrash /> : <Spinner />}
					<Text ml={"5px"}>Clear</Text>
				</Flex>
			</Flex>
			{notifications?.map((e, index) => (
				<Suspense key={index} fallback={<NotificationSkeleton />}>
					{index !== 0 && <Divider />}
					<Block notification={e} />
				</Suspense>
			))}
			{totalNotifications > increment && (
				<Button
					onClick={handleIncrement}
					isLoading={isLoading}
					color={"white"}
					bg={"black"}
					p={"25px 17%"}
					mt={"30px !important"}
				>
					More
				</Button>
			)}
		</VStack>
	);
};

export default NotificationBody;
