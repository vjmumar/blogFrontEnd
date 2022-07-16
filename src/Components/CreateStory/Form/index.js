import React, { useState, useContext, useRef, lazy, Suspense } from "react";
// Components
import { Flex, Heading, Input, Stack, Button, VStack, Spinner } from "@chakra-ui/react";
// React Hook Form
import { useForm } from "react-hook-form";
// Context
import { Context } from "../../../Pages/CreateStory/context";
// Life Cycle Methods
import { useComponentShouldUpdate } from "../../../Hooks/useComponendShouldUpdate";
// Redux
import { useSelector } from "react-redux";
// Toast
import { toast } from "react-toastify";
// Helpers
import { bytesToMb } from "../../../Helpers";
// Lazy
const TinyMce = lazy(() => import("../../TinyMce"));

const Form = () => {
	const [heroImage, setHeroImage] = useState(
		"https://via.placeholder.com/250x100.png?text=Hero+Image"
	);
	const mceRef = useRef("");
	const { handleEdit, handleUpload } = useContext(Context);
	const { register, handleSubmit, setValue } = useForm();

	// Redux Methods
	const { isLoading: getStoryLoading, story } = useSelector(
		(state) => state.authenticatedUserStoryStates
	);
	const { isLoading: createStoryLoading } = useSelector((state) => state.createStoryStates);

	const onSubmit = (data, e) => {
		const obj = new FormData();
		const image = data.heroImage[0];
		obj.append("heroImage", data.heroImage[0]);
		obj.append("title", data.title);
		obj.append("text", mceRef?.current?.getContent());
		obj.append("type", e.target.getAttribute("type"));
		if (bytesToMb(data?.heroImage[0]?.size) > 2) {
			toast.error("Hero Image File Size Must Not Exceed 2mb");
		} else if (image && !image.type.includes("image/")) {
			toast.error("Please Choose An Image");
		} else {
			try {
				if (Object.keys(story || {}).length) {
					handleEdit(obj);
				} else {
					handleUpload(obj);
				}
			} catch (err) {
				toast.error(err);
			}
		}
	};

	const handleChangeHeroImage = (e) => {
		const image = URL.createObjectURL(e.target.files[0]);
		setHeroImage(image);
	};

	useComponentShouldUpdate(() => {
		if (Object.keys(story || {})?.length) {
			const image = story?.heroLink;
			const result = image?.replace(image.substring(image.indexOf("+-+")), "");
			setValue("title", story?.title);
			setHeroImage(result);
		}
	}, [story]);

	return (
		<VStack w={"100%"}>
			<Flex justifyContent={"flex-end"} w={"100%"} mb={"15px"}>
				<Button
					isLoading={createStoryLoading || getStoryLoading}
					onClick={handleSubmit(onSubmit)}
					type={"draft"}
					p={"0 50px"}
					m={"5px"}
					color={"white"}
					bg={"green.300"}
				>
					Draft
				</Button>
				<Button
					isLoading={createStoryLoading || getStoryLoading}
					onClick={handleSubmit(onSubmit)}
					type={"published"}
					p={"0 50px"}
					m={"5px"}
					color={"white"}
					bg={"blackAlpha.800"}
				>
					Publish
				</Button>
			</Flex>
			<form style={{ width: "100%" }}>
				<Stack mb={"22px"}>
					<Heading mb={"10px"} fontWeight={"300"} fontSize={"20px"} as={"h6"}>
						Upload Hero Image
					</Heading>
					<Stack
						border={"1px solid #E6E6E6"}
						minH={"40vh"}
						w={"100%"}
						backgroundImage={`url(${heroImage})`}
						backgroundSize={"cover"}
						backgroundPosition={"center"}
						position={"relative"}
						backgroundRepeat={"no-repeat"}
						_hover={{ bg: "#00000087" }}
					>
						<Input
							position={"absolute"}
							w={"100%"}
							h={"100%"}
							accept='image/png, image/jpeg, image/jpg'
							border={"none"}
							onInput={handleChangeHeroImage}
							p={"0"}
							type={"file"}
							name={"image"}
							cursor={"pointer"}
							opacity={"0"}
							{...register("heroImage")}
						/>
					</Stack>
				</Stack>
				<Stack mb={"22px"}>
					<Heading fontWeight={"300"} fontSize={"20px"} as={"h6"}>
						Title
					</Heading>
					<Input
						{...register("title")}
						defaultValue={"When I Was Reincarnated As A Slime"}
						type={"text"}
						name={"title"}
					/>
				</Stack>
				<Stack mb={"22px"}>
					<Heading fontWeight={"300"} fontSize={"20px"} as={"h6"}>
						Paragraph
					</Heading>
					<Suspense fallback={<Spinner />}>
						<TinyMce ref={mceRef} editValue={story?.text} />
					</Suspense>
				</Stack>
			</form>
		</VStack>
	);
};

export default Form;
