import React from "react";
// Components
import { Heading, Button, VStack, Text } from "@chakra-ui/react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsArrowLeftCircleFill } from "react-icons/bs";
// Router
import { Link } from "react-router-dom";
import { SIGN_IN } from "../../../Routes";

const Pending = () => {
	return (
		<VStack
			minH={"320px"}
			maxW={"320px"}
			justifyContent={"center"}
			p={"30px 25px"}
			border={"1px solid #E6E6E6"}
			boxShadow={"1px 1px 1px #E6E6E6"}
			w={"100%"}
		>
			<AiFillQuestionCircle size={"50px"} />
			<Heading fontSize={"25px"} textAlign={"center"}>
				Email Is Still Not Verified! 
			</Heading>
			<Text w={"100%"} textAlign={"center"}>~Please Check Your Email, Or Spams!~</Text>
			<Link style={{ margin: "0" }} to={SIGN_IN}>
				<Button
					p={"23px 35px !important"}
					mt={"15px !important"}
					color={"white"}
					background={"black"}
					leftIcon={<BsArrowLeftCircleFill />}
				>
					Back To Sign In
				</Button>
			</Link>
		</VStack>
	);
};

export default Pending;
