import React from "react";
// Components
import { VStack, Image, Flex } from "@chakra-ui/react";
// Icons
import { AiOutlineClose } from "react-icons/ai";

const MediaDisplay = ({ media, setMedia }) => {
	const handleRemoveMedia = (index) => {
		const clone = [...media];
		clone.splice(index, 1);
		setMedia(clone);
	};

	return (
		<>
			{media.length ? (
				<Flex
					justifyContent={"center"}
					p={"10px"}
					alignItems={"center"}
					background={"#cdcdcd5e"}
					w={"100%"}
					position={{ base: 'relative', lg: "sticky"}}
					top={"0"}
				>
					{media.map((e, index) => (
						<VStack m={"0 5px"} w={"75px"} h={"75px"} position={"relative"} key={index}>
							<AiOutlineClose
								style={{
									position: "absolute",
									right: "-10px",
									top: "-10px",
									cursor: "pointer",
								}}
								onClick={() => handleRemoveMedia(index)}
							/>
							<Image
								h={"100%"}
								w={"100%"}
								objectFit={"cover"}
								mt={"0px !important"}
								src={e.blob}
							/>
						</VStack>
					))}
				</Flex>
			) : (
				""
			)}
		</>
	);
};

export default MediaDisplay;
