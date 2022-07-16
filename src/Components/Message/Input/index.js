/* eslint-disable no-unused-vars */
import React from "react";
// Components
import { Input, Flex, IconButton, Stack } from "@chakra-ui/react";
// Reach hook from
import { useForm } from "react-hook-form";
// Icons
import { IoMdSend } from "react-icons/io";
import { AiOutlinePaperClip } from "react-icons/ai";
// Router
import { useParams } from "react-router-dom";
// Socket
import { socket } from "../../../App";
// Redux
import { useSelector } from "react-redux";
// Helpers
import { bytesToMb } from "../../../Helpers";
// Toast
import { toast } from "react-toastify";

const MessageInput = ({ handleSendMessage, replyingToText, setReplyingToText, media, setMedia }) => {
	// Router Methods
	const params = useParams();
	// Hook Form
	const { handleSubmit, register, resetField } = useForm();
	// Redux Methods
	const { userId: accountId } = useSelector((state) => state.signInStates);
	// Timeout Id
	let id;

	const toggleUserIsTyping = (isTyping) => {
		socket.emit("message-typing", { to: params.id, from: accountId, isTyping: isTyping });
	};

	const handleMedia = (e) => {
		// Validate Size
		const isEachElementExceedOneMb = Array.from(e.target.files)
										 .some((e) => bytesToMb(e.size) >= 1);
		const mediaLength = Array.from(e.target.files)?.length;


		if (!isEachElementExceedOneMb && mediaLength <= 4) {
			setMedia(
				Array.from(e.target.files).map((e) => {
					return { blob: URL.createObjectURL(e), file: e };
				})
			);
		} else {
			toast.error("Each Media Should Not Size Exceed 1mb / 4 Media Is The Limit");
		}
	};

	const handleOnSubmit = (data) => {
		if (data.message.trim()) {
			resetField("message");
			toggleUserIsTyping(false);
			handleSendMessage({ message: data.message, replyingTo: replyingToText, media });
			setReplyingToText("");
			setMedia([]);
		}
	};

	const handleTyping = () => {
		id && clearTimeout(id);
		toggleUserIsTyping(true);
		id = setTimeout(() => toggleUserIsTyping(false), 3000);
	};

	return (
		<form style={{ width: "100%", marginTop: "0px" }} onSubmit={handleSubmit(handleOnSubmit)}>
			<Flex h={{ base: '6vh', lg: 'unset'}} position={"relative"}>
				<Flex
					alignItems={"center"}
					borderWidth={"1px"}
					borderColor={"#E6E6E6"}
					w={{ base: "85%", lg: "95%" }}
					position={"relative"}
				>
					<Input
						p={"10px 15px"}
						_focus={{ borderColor: "black" }}
						borderColor={"transparent"}
						placeholder={"Type Message Here"}
						fontSize={"15px"}
						h={"50px"}
						borderRadius={"0px"}
						onInput={handleTyping}
						mr={"10px"}
						{...register("message")}
					/>
					<Stack
						h={"100%"}
						display={"flex"}
						background={"white"}
						zIndex={"0"}
						mr={{ base: "15px", lg: "5px" }}
						position={"relative"}
						justifyContent={"center"}
					>
						<Input
							type={"file"}
							position={"absolute"}
							onInput={(e) => handleMedia(e)}
							multiple={true}
							top={"0"}
							w={"100%"}
							h={"100%"}
							cursor={"pointer"}
							opacity={"0"}
							{...register("media")}
						/>
						<AiOutlinePaperClip size={"30px"} />
					</Stack>
				</Flex>
				<IconButton
					position={"absolute"}
					borderRadius={"0px"}
					right={"0"}
					h={"100%"}
					zIndex={"9999"}
					bg={"black"}
					w={{ base: "15%", lg: "5%" }}
					color={"white"}
					type={"submit"}
					icon={<IoMdSend />}
				/>
			</Flex>
		</form>
	);
};

export default MessageInput;
