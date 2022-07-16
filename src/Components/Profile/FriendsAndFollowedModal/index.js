/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from "react";
// Components
import {
	Modal as ChakraModal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Spinner,
} from "@chakra-ui/react";

// Redux
import { useSelector } from "react-redux";

// Constants
import { FOLLOWED_PEOPLE_TYPE } from "./constant";
import Form from "./Form";
// Lazy
const Block = lazy(() => import("./Block"));

export const Modal = ({ isOpen, handleClose, type, getFollowedUsers, getFriends }) => {
	const { followedPeople } = useSelector((state) => state.userFollowedPeopleStates);
	const { friends } = useSelector((state) => state.userFriendsStates);
	return (
		<ChakraModal isOpen={isOpen} onClose={() => {}}>
			<ModalOverlay />
			<ModalContent minW={"40%"} minH={"90vh"}>
				<ModalHeader>
					{type !== FOLLOWED_PEOPLE_TYPE ? "Friends" : "Followed People"}
				</ModalHeader>
				<ModalCloseButton onClick={handleClose} />
				<ModalBody>
					<Form
						handleSearch={type === FOLLOWED_PEOPLE_TYPE ? getFollowedUsers : getFriends}
					/>
					{(type === FOLLOWED_PEOPLE_TYPE ? followedPeople : friends)?.map((e, i) => (
						<Suspense key={i} fallback={<Spinner />}>
							<Block e={e} index={i} />
						</Suspense>
					))}
				</ModalBody>
			</ModalContent>
		</ChakraModal>
	);
};
