/* eslint-disable no-unused-vars */
import React from "react";
// Components
import Input from "./Input";
import { Button, FormControl, Text, VStack } from "@chakra-ui/react";
// React Hook Form
import { useForm } from "react-hook-form";
// Form
import { yupResolver } from "@hookform/resolvers/yup";
// Yup Schema
import { YUP_SCHEMA } from "./yupSchema";
// Icons
import { MdPassword } from "react-icons/md";
// Router
import { Link, useNavigate } from "react-router-dom";
// Routes
import { SIGN_IN } from "../../Routes";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleRequest } from "../../Redux/Slices/ForgotPassword/handleRequest";
// Toast
import { toast } from "react-toastify";

const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(YUP_SCHEMA),
	});

	// Router Methods
	const navigation = useNavigate();

	// Redux Method
	const { isLoading } = useSelector((state) => state.forgotPasswordStates);
	const dispatch = useDispatch();

	const handleOnSubmit = async (data) => {
		try {
			await dispatch(
				handleRequest({
					email: data.email,
				})
			).unwrap();
			toast.success("Request Success Please Check Your Email");
			navigation(SIGN_IN);
		} catch (err) {
			toast.error(err);
		}
	};

	return (
		<VStack
			minW={"315px"}
			border={"1px solid #E6E6E6"}
			p={"30px 20px 35px"}
			m={"auto"}
			h={"100%"}
			bg={"white"}
			mb={"0px !important"}
			boxShadow={"1px 1px 1px #E6E6E6"}
		>
			<MdPassword size={"55px"} />
			<FormControl
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
				flexDirection={"column"}
				mt={"5px !important"}
				onSubmit={handleSubmit(handleOnSubmit)}
			>
				<Input
					name={"email"}
					type={"email"}
					label={"Input Email"}
					placeholder={"example@email.com"}
					{...register("email")}
					error={errors}
				/>
				<Button
					onClick={handleSubmit(handleOnSubmit)}
					color={"white"}
					bg={"black"}
					mb={"0px !important"}
					w={"50%"}
					isLoading={isLoading}
				>
					Submit
				</Button>
			</FormControl>
			<Link to={SIGN_IN} mt={"0px"}>
				<Text mt={"0px !important"}>Back To Sign In</Text>
			</Link>
		</VStack>
	);
};

export default Form;
