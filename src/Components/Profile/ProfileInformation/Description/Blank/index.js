import React from "react";
// Components
import { Stack } from "@chakra-ui/react";
// Icons
import { AiOutlineEdit } from "react-icons/ai";

const Blank = ({ isCurrentUser, setIsEdit, children }) => {
	return (
		<Stack w={"100%"}>
			<Stack h={"100px"} bg={"blue.400"} padding={"10px"}>
				{isCurrentUser && (
					<AiOutlineEdit
						color={"white"}
						onClick={() => setIsEdit((prev) => !prev)}
						size={"25px"}
						cursor={"pointer"}
					/>
				)}
                {children}
			</Stack>
		</Stack>
	);
};

export default Blank;
