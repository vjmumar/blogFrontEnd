import React from "react";
// Components
import { Flex, Image, Spinner, Text, Input } from "@chakra-ui/react";
// Helper
import { imageFormatter } from "../../../../../Helpers";

const UserImage = ({
	isEdit,
	editPhoto,
	actionLoading,
	profileLoading,
	imageLink,
	register,
	handleEditPhoto,
}) => {
	return (
		<>
			<Flex
				ml={"auto !important"}
				mr={"auto !important"}
				mt={"-50px !important"}
				borderRadius={"50%"}
				w={"100px"}
				h={"100px"}
				backgroundColor={"white"}
				position={"relative"}
			>
				<Image
					w={"100%"}
					h={"100%"}
					display={!profileLoading && !actionLoading ? "block" : "none"}
					borderRadius={"50%"}
					border={"5px solid white"}
					src={isEdit && editPhoto ? editPhoto : imageFormatter(imageLink)}
				/>
				<Spinner
					color={"black"}
					left={"0"}
					right={"0"}
					top={"0"}
					display={profileLoading || actionLoading ? "block" : "none"}
					bottom={"0"}
					m={"auto"}
					position={"absolute"}
				/>
			</Flex>
			{isEdit && (
				<>
					<Text
						color={"blue.400"}
						w={"100%"}
						textAlign={"center"}
						cursor={"pointer"}
						position={"relative"}
					>
						Change
						<Input
							type={"file"}
							{...register("profilePicture")}
							position={"absolute"}
							z-index={"99999999"}
							w={"100%"}
							onChange={handleEditPhoto}
							h={"100%"}
							opacity={"0"}
							left={"0"}
							cursor={"pointer"}
						/>
					</Text>
				</>
			)}
		</>
	);
};

export default UserImage;
