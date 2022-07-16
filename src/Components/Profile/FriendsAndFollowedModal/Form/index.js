import React from "react";
// Components
import { Flex, IconButton, Input } from "@chakra-ui/react";
// Icon
import { AiOutlineSearch } from "react-icons/ai";
// Hook Form
import { useForm } from "react-hook-form";

const Form = ({ handleSearch }) => {
	const { register, handleSubmit } = useForm();
	const onSubmit = ({ search }) => {
		handleSearch(search);
	};
	return (
		<Flex>
			<form style={{ width: "100%", display: "flex" }} onSubmit={handleSubmit(onSubmit)}>
				<Input borderRadius={"0"} placeholder={"Search User.."} {...register("search")} />
				<IconButton borderRadius={"0"} type={"submit"} icon={<AiOutlineSearch />} />
			</form>
		</Flex>
	);
};

export default Form;
