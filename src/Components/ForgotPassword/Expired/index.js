/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// Components
import { Heading, Button, VStack, Text } from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
// Router
import { useLocation } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../../Redux/Slices/EmailVerification";
import { handleRequest } from "../../../Redux/Slices/EmailVerification/handleRequest";
// Hooks
import { useComponentShouldUpdate } from "../../../Hooks/useComponendShouldUpdate";
// Toast
import { toast } from "react-toastify";

const Expired = () => {

	return (
		<VStack
			minH={"350px"}
			maxW={"350px"}
			justifyContent={"center"}
			p={"30px 35px"}
			border={"1px solid #E6E6E6"}
			boxShadow={"1px 1px 1px #E6E6E6"}
			w={"100%"}
			transform={"translate(0%, 50%)"}
		>
			<AiFillCloseCircle size={"50px"} />
			<Heading fontSize={"20px"} textAlign={"center"}>
				Token Expired!
			</Heading>
			<Text textAlign={"center"}>~Click The Button To Request Again~</Text>
			<Button
				opacity={requestTimeOut !== 30 || requestDisabled ? "0.7" : 1}
				onClick={requestToken}
				pointerEvents={requestTimeOut !== 30 || requestDisabled ? "none" : "all"}
				p={"23px 50px !important"}
				mt={"15px !important"}
				color={"white"}
				fontSize={requestTimeOut === 30 ? "15px" : "12px"}
				background={"black"}
			>
				{requestTimeOut !== 30 ? "Please Wait To Request Again!" : "Request"}
				{requestTimeOut !== 30 && `(${requestTimeOut}s)`}
			</Button>
		</VStack>
	);
};

export default Expired;
