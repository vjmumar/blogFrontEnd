import React, { lazy, Suspense } from "react";
// Components
import { VStack, Text, Button, Divider, Spinner } from "@chakra-ui/react";

// Lazy
const NotificationBlock = lazy(() => import("./Notification/index"));

const Notification = ({ notification, handleClearNotification }) => {
	return (
		<VStack
			border={"1px solid #E6E6E6"}
			position={"absolute"}
			left={"0"}
			top={"0"}
			background={"white"}
			p={"20px 15px"}
			transform={"translate(20%,-50%)"}
			w={"100%"}
			alignItems={"flex-start"}
			minW={"300px"}
			minHeight={"300px"}
			maxH={"50vh"}
			maxW={"300px"}
			overflowY={"scroll"}
			zIndex={"999999999999"}
			sx={{
				"&::-webkit-scrollbar": {
					width: "5px",
					borderRadius: "15px",
					backgroundColor: "black",
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "white",
				},
			}}
		>
			{notification?.length ? (
				<Button
					bg={"transparent"}
					ml={"auto"}
					fontSize={"13px"}
					color={"black"}
					borderRadius={"0px"}
					w={"fit-content"}
					h={"fit-content"}
					mt={"-10px"}
					onClick={handleClearNotification}
				>
					Clear
				</Button>
			) : (
				<Text m={"auto"}>Empty</Text>
			)}
			<Text position={"absolute"} left={"15px"} top={"0"} fontSize={"14px"}>
				Notifications
			</Text>
			{notification?.map((e, index) => (
				<Suspense fallback={<Spinner />} key={e.notiId}>
					{index !== 0 && <Divider />}
					<NotificationBlock notification={e} />
				</Suspense>
			))}
		</VStack>
	);
};

export default Notification;
