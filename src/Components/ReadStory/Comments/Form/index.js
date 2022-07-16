import React, { useState } from "react";
// Components
import { Flex, IconButton, Input, VStack, Text } from "@chakra-ui/react";
// Icons
import { IoMdSend } from "react-icons/io";
// React Hook Form
import { useForm } from "react-hook-form";
// Toast
import { toast } from "react-toastify";

const Form = ({ handleSendComment }) => {
	const [commentLength, setCommentLength] = useState(0);
	const { register, handleSubmit, setValue } = useForm();

	const handleOnSubmit = (data) => {
		if (data.text.length >= 101) {
			toast.error("Comment Length Must Not Exceed 100 Characters");
		} else {
			setValue("text", "");
			handleSendComment(data.text);
		}
	};

	const handleCheckLength = ({ target: { value } }) => {
		setCommentLength(value.length);
	};

	return (
		<VStack
			zIndex={"999"}
			w={"100%"}
			background={"white"}
			mt={"0px !important"}
			position={"relative"}
		>
			<form onSubmit={handleSubmit(handleOnSubmit)} style={{ width: "100%" }}>
				<Flex w={"100%"}>
					<Input
						onInput={handleCheckLength}
						borderRadius={"0px"}
						placeholder={"Ex: Great Story!"}
						{...register("text")}
					/>
					<Text
						color={commentLength >= 101 && "red"}
						position={"absolute"}
						left={"5px"}
						top={"0px"}
						fontSize={"8px"}
					>
						{commentLength} / 100
					</Text>
					<IconButton
						type={"submit"}
						borderRadius={"0px"}
						bg={"black"}
						color={"white"}
						icon={<IoMdSend />}
					/>
				</Flex>
			</form>
		</VStack>
	);
};

export default Form;
