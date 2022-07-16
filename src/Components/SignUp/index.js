import React, { useState } from "react";
// Components
import { Button, Stack, VStack, Text } from "@chakra-ui/react";
import Input from "./Input";
import { FaBlog } from "react-icons/fa";
// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import { YUP_SCHEMA } from "./YupSchema";
// React Hook Form
import { useForm } from "react-hook-form";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleSignUp } from "../../Redux/Slices/SignUp/handleSignUp";
import { reset } from "../../Redux/Slices/SignUp";
// Router
import { Link, useNavigate } from "react-router-dom";
// Routes
import { SIGN_IN } from "../../Routes";
// Toast
import { toast } from "react-toastify";
// Hooks
import { useComponentShouldUpdate } from "../../Hooks/useComponendShouldUpdate";
import useComponentDidUnMount from "../../Hooks/useComponentDidUnMount";

const Form = () => {
	// Redux Methods
	const dispatch = useDispatch();
	// Redux States
	const { isLoading, isSignUp } = useSelector((state) => state.signUpStates);
	// Router Methods
	const navigation = useNavigate();

	const [info, setInfo] = useState({});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(YUP_SCHEMA),
	});

	const onSubmit = async (data) => {
		try {
			const cred = {
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				password: data.password,
			};

			setInfo(cred);
			await dispatch(handleSignUp(cred)).unwrap();
		} catch (err) {
			toast.error(err);
		}
	};

	useComponentShouldUpdate(() => {
		if (isSignUp && Object.keys(info).length) {
			navigation(SIGN_IN, { state: { email: info.email, password: info.password } });
			toast.success("Sign Up Success! Please Check Your Email!");
		}
	}, [isSignUp, dispatch]);

	useComponentDidUnMount(() => {
		dispatch(reset());
	});

	return (
		<VStack
			minW={"315px"}
			border={"1px solid #E6E6E6"}
			p={"30px 20px 35px"}
			m={"40px auto"}
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
					name={"firstName"}
					label={"First Name"}
					placeholder={"John"}
					{...register("firstName")}
					error={errors}
				/>
				<Input
					name={"lastName"}
					label={"Last Name"}
					placeholder={"Doe"}
					{...register("lastName")}
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
				<Input
					name={"confirmPassword"}
					label={"Confirm Password"}
					placeholder={"*******"}
					type={"password"}
					{...register("confirmPassword")}
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
					Sign Up
				</Button>
			</form>
			<Link to={SIGN_IN}>
				<Text mt={"15px !important"}>Already Have An Account? Sign In Now!</Text>
			</Link>
		</VStack>
	);
};

export default Form;
