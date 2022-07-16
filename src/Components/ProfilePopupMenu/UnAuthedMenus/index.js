import React from 'react';
// Components
import { Flex, Text } from "@chakra-ui/react";
import {VscSignIn} from 'react-icons/vsc';
// Router
import { Link } from "react-router-dom";
// Routes
import { SIGN_IN } from "../../../Routes/index";

const UnAuthedMenus = () => {
  return (
    <>
      <Link to={SIGN_IN}>
        <Flex cursor={"pointer"} mb={"0px !important"} alignItems={"center"}>
          <VscSignIn />
          <Text ml={"10px"}>Sign In</Text>
        </Flex>
      </Link>
    </>
  )
}

export default UnAuthedMenus