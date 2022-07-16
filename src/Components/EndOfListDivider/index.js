/* eslint-disable react/prop-types */
import React from "react";

// Components
import { Flex, Divider, Text } from "@chakra-ui/react";

const EndOfListDivider = ({text}) => {
  return (
    <Flex w={"100%"} alignItems={"center"}>
      <Divider zIndex={"-1"}/>
      <Text fontSize={{ base: "12px", lg: "20px" }} w={"100%"} textAlign={"center"} fontWeight={"600"}>{!text ? 'END OF THE LIST' : text}</Text>
      <Divider zIndex={"-1"} />
    </Flex>
  );
};

export default EndOfListDivider;
