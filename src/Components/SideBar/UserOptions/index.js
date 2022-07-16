import React from "react";
// Components
import PopupMenu from "../../ProfilePopupMenu";
import { Flex, Image, VStack } from "@chakra-ui/react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../../Redux/Slices/SignIn";
// Helper
import { imageFormatter } from "../../../Helpers";

const UserOptions = ({ isOpen, setIsOpen, ...rest }) => {
	// Redux Methods
	const { isSignIn } = useSelector((state) => state.signInStates);
	const { imageLink: userImage, accountId: userId } = useSelector(
		(state) => state.authenticatedUserDataStates
	)?.authenticatedUserData;
	const dispatch = useDispatch();

	const handleSignOut = () => {
		dispatch(signOut());
		window.location.reload();
	};

	return (
		<VStack {...rest} className={"main-menu-user"} position={"relative"}>
			{/* Pop Up Additional Menus */}
			{isOpen && (
				<PopupMenu isSignIn={isSignIn} handleSignOut={handleSignOut} userId={userId} />
			)}
			<Flex cursor={"pointer"} mt={"0px !important"}>
				<Image
					_hover={{
						outline: "3px solid #E6E6E6",
						transitionDuration: ".5s",
					}}
					transitionDuration={".5s"}
					w={"45px"}
					h={"45px"}
					borderRadius={"50%"}
					objectFit={"cover"}
					onClick={() => setIsOpen((prev) => !prev)}
					fallbackSrc='https://via.placeholder.com/45'
					src={imageFormatter(userImage)}
				/>
			</Flex>
		</VStack>
	);
};

export default UserOptions;
