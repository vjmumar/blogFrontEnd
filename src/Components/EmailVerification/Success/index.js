/* eslint-disable react/prop-types */
import React from "react";
// Components
import { Heading, Button, VStack, Spinner, Text } from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
// Router
import { Link, useNavigate } from "react-router-dom";
import { EMAIL_VERIFICATION_ROUTE, SIGN_IN } from "../../../Routes";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { handleVerify } from "../../../Redux/Slices/EmailVerification/handleVerify";
// Hooks
import { useComponentDidMount } from "../../../Hooks/useComponendDidMount";
// Routes
import { VERIFIED_EXPIRED } from "../../../Pages/EmailVerificationPage/constant";
// Toast
import { toast } from "react-toastify";

const Success = ({ id, token }) => {
	// Redux Methods
	const dispatch = useDispatch();
	const { isVerify } = useSelector((state) => state.emailVerificationStates);

	// Router Methods
	const navigation = useNavigate();

	const verifyEmail = async () => {
		try {
			await dispatch(handleVerify({ token, id })).unwrap();
		} catch (err) {
			if ("Token Expired") {
				navigation(EMAIL_VERIFICATION_ROUTE, { state: { type: VERIFIED_EXPIRED, id: id } });
			} else {
				toast.error(err);
			}
		}
	};

	useComponentDidMount(() => {
		verifyEmail();
	});

	return isVerify ? (
		<VStack
			minH={"320px"}
			maxW={"320px"}
			minW={"320px"}
			justifyContent={"center"}
			p={"30px 25px"}
			border={"1px solid #E6E6E6"}
			boxShadow={"1px 1px 1px #E6E6E6"}
			w={"100%"}
		>
			<AiFillCheckCircle size={"100px"} />
			<Heading fontSize={"26px"} textAlign={"center"}>
				Email Verified!
			</Heading>
			<Text>~You Can Now Log In!~</Text>
			<Link style={{ margin: "0" }} to={SIGN_IN}>
				<Button
					p={"23px 50px !important"}
					mt={"15px !important"}
					color={"white"}
					background={"black"}
				>
					Sign In
				</Button>
			</Link>
		</VStack>
	) : (
		<Spinner />
	);
};

export default Success;
