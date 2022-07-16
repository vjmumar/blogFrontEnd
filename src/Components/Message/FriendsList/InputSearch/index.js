import React from "react";
// Components
import { Input, Flex, IconButton } from "@chakra-ui/react";
// Reach hook from
import { useForm } from "react-hook-form";
// Icons
import { FiSearch } from "react-icons/fi";

const InputSearch = ({ getFriends }) => {
	const { handleSubmit, register } = useForm();

	const handleOnSubmit = (data) => {
		getFriends(data.search);
	};

	return (
		<form style={{ width: "100%" }} onSubmit={handleSubmit(handleOnSubmit)}>
			<Flex position={"relative"}>
				<Input
					p={"3px 15px"}
					h={"59px"}
					borderColor={"transparent"}
					borderBottomColor={"#E6E6E6"}
					_focus={{ borderColor: "#E6E6E6" }}
					placeholder={"Search People Here"}
					fontSize={"13px"}
					borderRadius={"0px"}
					{...register("search")}
				/>
				<IconButton
					borderRadius={"0px"}
					h={"100%"}
					position={"absolute"}
					borderTopLeftRadius={"0"}
					borderBottomLeftRadius={"0"}
					right={"0"}
					zIndex={"9999"}
					_hover={{
						background: "transparent",
					}}
					background={"transparent"}
					color={"black"}
					icon={<FiSearch />}
				/>
			</Flex>
		</form>
	);
};

export default React.memo(InputSearch);
