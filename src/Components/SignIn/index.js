import React from "react";
// Components
import { Button, Stack, VStack, Text } from "@chakra-ui/react";
import Input from "./Input";
import { FaBlog } from "react-icons/fa";
// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import { YUP_SCHEMA } from "./YupSchema";
// React Hook Form
import { useForm } from "react-hook-form";
// Life Cycle Methods
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";
import { useComponentShouldUpdate } from "../../Hooks/useComponendShouldUpdate";
// Constants
import { VERIFIED_PENDING } from "../../Pages/EmailVerificationPage/constant";
// Router
import { Link, useNavigate } from "react-router-dom";
// Routes
import { HOME_ROUTE, SIGN_UP, EMAIL_VERIFICATION_ROUTE, FORGOT_PASSWORD_ROUTE } from "../../Routes";
// Redux Methods
import { useDispatch, useSelector } from "react-redux";
import { handleSignIn } from "../../Redux/Slices/SignIn/handleSignIn/index";
// Toast
import { toast } from "react-toastify";

const Form = ({ signUpEmail, signUpPassword }) => {
	// Redux Methods
	const dispatch = useDispatch();
	// ReduxStates
	const { isLoading, isSignIn } = useSelector((state) => state.signInStates);
	// Router Methods
	const navigation = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(YUP_SCHEMA),
	});

	const onSubmit = async (data) => {
		try {
			await dispatch(handleSignIn(data)).unwrap();
		} catch (err) {
			if (err === "User Is Not Verified") {
				navigation(EMAIL_VERIFICATION_ROUTE, { state: { type: VERIFIED_PENDING } });
			} else {
				toast.error(err);
			}
		}
	};

	useComponentDidMount(() => {
		if (signUpEmail && signUpPassword) {
			setValue("email", signUpEmail);
			setValue("password", signUpPassword);
		}
	});

	useComponentShouldUpdate(() => {
		if (isSignIn) {
			toast.success("Sign In Success!");
			navigation(HOME_ROUTE);
		}
	}, [isSignIn, dispatch]);

	return (
		<VStack
			minW={"315px"}
			border={"1px solid #E6E6E6"}
			p={"30px 20px 35px"}
			m={"auto"}
			h={"100%"}
			bg={"white"}
			boxShadow={"1px 1px 1px #E6E6E6"}
		>
			<Stack className={"logo-wrapper"} mb={"15px !important"}>
				<FaBlog size={"40px"} />
			</Stack>
			<form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
				<Input
					name={"email"}
					label={"Email"}
					placeholder={"example@gmail.com"}
					{...register("email")}
					error={errors}
				/>
				<Input
					name={"password"}
					label={"Password"}
					placeholder={"*******"}
					type={"password"}
					{...register("password")}
					error={errors}
				/>
				<Button
					isLoading={isLoading}
					mt={"10px"}
					type={"submit"}
					w={"100%"}
					bg={"black"}
					color={"white"}
				>
					Sign In
				</Button>
			</form>
			<Link to={SIGN_UP}>
				<Text mt={"15px !important"}>No Account Yet? Create Now!</Text>
			</Link>
			<Link to={FORGOT_PASSWORD_ROUTE}>
				<Text fontSize={"15px"} mt={"0px !important"}>Forgot Password?</Text>
			</Link>
		</VStack>
	);
};

export default Form;
