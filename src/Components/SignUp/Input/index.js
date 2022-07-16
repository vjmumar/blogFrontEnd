import React,{forwardRef} from "react";
// Components
import { Input as ChakraInput, Stack, Text } from "@chakra-ui/react";

const Input = forwardRef((props,ref) => {
  const { label, name, error, ...rest } = props;
  return (
    <Stack w={"100%"} mb={"10px !important"}>
      <Text fontSize={"15px"}>{label}</Text>
      <ChakraInput
      borderRadius={"0px"}
      w={"100%"}
      borderColor={error[name] && "red"}
      _focus={{
        borderColor: error[name] && "red" 
      }}
      name={name} ref={ref} {...rest} />
      {error[name] && <Text color={"red"} fontSize={"14px"}>*{error[name].message}</Text>}
    </Stack>
  );
});

export default Input;
