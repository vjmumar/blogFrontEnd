import React from "react";
// Components
import { Stack, VStack } from "@chakra-ui/react";
import AuthedMenus from "./AuthedMenus";
import UnAuthedMenus from "./UnAuthedMenus";

const PopupMenu = ({ handleSignOut, userId, isSignIn }) => {
	return (
		<VStack
			border={"1px solid #E6E6E6"}
			position={"absolute"}
			left={"0"}
			top={"0"}
			background={"white"}
			p={"20px 20px"}
			transform={{ base: "translate(-35%,-112%)", lg: "translate(0%,-112%)" }}
			w={"50%"}
			alignItems={"flex-start"}
			minW={"150px"}
			maxW={"400px"}
			zIndex={"999999999999"}
		>
			{isSignIn ? (
				<AuthedMenus handleSignOut={() => handleSignOut()} userId={userId} />
			) : (
				<UnAuthedMenus />
			)}

			<Stack
				w={"25px"}
				h={"20px"}
				position={"absolute"}
				left={"0"}
				bottom={"-15px"}
				display={{ base: "none", lg: "unset" }}
				_after={{
					content: "''",
					width: "100%",
					height: "100%",
					position: "absolute",
					zIndex: "999999999999",
					bottom: "0",
					left: "0",
					transform: "rotate(45deg) translate(-6px, -6px)",
					boxShadow: "rgb(117 117 117) 1px 1px 1px -1px",
				}}
				clipPath={"polygon(50% 100%, 0 0, 100% 0)"}
			></Stack>
		</VStack>
	);
};

export default PopupMenu;
