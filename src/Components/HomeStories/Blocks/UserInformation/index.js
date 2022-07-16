/* eslint-disable new-cap */
import React from "react";

// Components
import { Flex, Text, Image } from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
// Helper
import { imageFormatter, dateFormatter } from "../../../../Helpers";

const UserInformation = ({ image, fName, lName, dCreated }) => {
  return (
    <Flex w={"100%"} justifyContent={"flex-start"} alignItems={"center"}>
      <Image
        w={"25px"}
        h={"25px"}
        borderRadius={"50%"}
        objectFit={"cover"}
        marginRight={"10px"}
        src={imageFormatter(image)}
      />
      <Text fontSize={"15px"}>
        {fName} {lName}
      </Text>
      <Text m={"0 5px"}>-</Text>
      <Flex alignItems={"center"}>
        <AiOutlineCalendar />
        <Text ml={"5px"} fontSize={"15px"}>{dateFormatter(dCreated)}</Text>
      </Flex>
    </Flex>
  );
};

export default UserInformation;
