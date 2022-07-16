/* eslint-disable react/display-name */
import React from "react";
// Components
import { Input as ChakraInput, Stack, Text } from "@chakra-ui/react";

const Input = React.forwardRef(({ name, label, type, error, ...rest }, ref) => {
	return (
		<Stack w={"100%"} mb={"10px !important"}>
			<Text fontSize={"15px"}>{label}</Text>
			<ChakraInput
				type={type}
				borderRadius={"0px"}
				w={"100%"}
				borderColor={error[name] && "red"}
				_focus={{
					borderColor: error[name] && "red",
				}}
				name={name}
				ref={ref}
				{...rest}
			/>
			{error[name] && (
				<Text color={"red"} fontSize={"14px"}>
					*{error[name].message}
				</Text>
			)}
		</Stack>
	);
});

export default Input;
