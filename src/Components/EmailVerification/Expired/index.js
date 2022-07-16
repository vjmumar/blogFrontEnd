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
	// useAxiosMethods
	const [requestDisabled, setRequestDisabled] = useState(false);
	const [requestTimeOut, setRequestTimeout] = useState(30);

	// Redux Methods
	const dispatch = useDispatch();
	const { isRequested } = useSelector((state) => state.emailVerificationStates);

	// Interval
	let interval;

	// Router Methods
	const { state } = useLocation();

	const startInterval = () => {
		let counter = 30;
		setRequestDisabled((prev) => !prev);
		interval && clearInterval(interval);

		interval = setInterval(() => {
			counter -= 1;
			setRequestTimeout((prev) => --prev);

			if (counter === 0) {
				setRequestTimeout(30);
				setRequestDisabled((prev) => !prev);
				dispatch(reset());
				clearInterval(interval);
			}
		}, 1000);
	};

	const requestToken = async () => {
		try {
			startInterval();
			await dispatch(handleRequest({ id: state.id })).unwrap();
		} catch (err) {
			toast.error(err);
		}
	};

	useComponentShouldUpdate(() => {
		if (isRequested) {
			toast.success("Request Success, Check Your Email!");
		}
	}, [dispatch, isRequested]);

	return (
		<VStack
			minH={"320px"}
			maxW={"320px"}
			justifyContent={"center"}
			p={"30px 35px"}
			border={"1px solid #E6E6E6"}
			boxShadow={"1px 1px 1px #E6E6E6"}
			w={"100%"}
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
