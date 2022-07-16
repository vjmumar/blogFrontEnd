/* eslint-disable no-unused-vars */
import React from "react";
// Components
import Input from "./Input";
import { Button, FormControl, VStack } from "@chakra-ui/react";
// React Hook Form
import { useForm } from "react-hook-form";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleChangePassword } from "../../Redux/Slices/ForgotPassword/handleChangePassword";
// Form
import { yupResolver } from "@hookform/resolvers/yup";
// Router
import { useSearchParams } from "react-router-dom";
// Yup Schema
import { YUP_SCHEMA } from "./yupSchema";
// Icons
import { RiLockPasswordFill } from "react-icons/ri";
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
	const [searchParams] = useSearchParams();

	// Redux Methods
	const dispatch = useDispatch();
	const {isLoading} = useSelector(state => state.forgotPasswordStates);

	const handleOnSubmit = async (data) => {
		try {
			const result = await dispatch(
				handleChangePassword({
					id: searchParams.get("id"),
					token: searchParams.get("token"),
					newPassword: data.newPassword,
				})
			).unwrap();
			toast.success(result);
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
			boxShadow={"1px 1px 1px #E6E6E6"}
		>
			<RiLockPasswordFill size={"55px"} />
			<FormControl
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
				flexDirection={"column"}
				mt={"5px !important"}
				onSubmit={handleSubmit(handleOnSubmit)}
			>
				<Input
					name={"newPassword"}
					type={"password"}
					label={"Enter New Password"}
					placeholder={"*******"}
					{...register("newPassword")}
					error={errors}
				/>
				<Input
					name={"confirmNewPassword"}
					type={"password"}
					label={"Confirm New Password"}
					placeholder={"*******"}
					{...register("confirmNewPassword")}
					error={errors}
				/>
				<Button
					type={"submit"}
					onClick={handleSubmit(handleOnSubmit)}
					color={"white"}
					bg={"black"}
					w={"50%"}
					mt={"10px"}
					h={"50px"}
					isLoading={isLoading}
				>
					Submit
				</Button>
			</FormControl>
		</VStack>
	);
};

export default Form;
