import React from 'react';
// Components
import { Flex, Text } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { BsDoorOpen } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
// Router
import { Link } from "react-router-dom";
// Routes
import { PROFILE_ROUTE } from "../../../Routes/index";

const AuthedMenus = ({handleSignOut, userId}) => {
  return (
    <>
    <Flex
        onClick={handleSignOut}
        cursor={"pointer"}
        mb={"10px !important"}
        alignItems={"center"}
      >
        <BsDoorOpen />
        <Text ml={"10px"}>Sign Out</Text>
      </Flex>
      <Flex cursor={"pointer"} mb={"10px !important"} alignItems={"center"}>
        <FiSettings />
        <Text ml={"10px"}>Settings</Text>
      </Flex>
      <Link to={`${PROFILE_ROUTE}/${userId}`}>
        <Flex cursor={"pointer"} mb={"0px !important"} alignItems={"center"}>
          <CgProfile />
          <Text ml={"10px"}>Profile</Text>
        </Flex>
      </Link>
    </>
  )
}

export default AuthedMenus