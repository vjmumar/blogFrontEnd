/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
// Components
import { Flex, Button, Input, IconButton, Box, VStack, Text } from "@chakra-ui/react";
import Select from "react-select";

// Icons
import { BsSearch } from "react-icons/bs";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

// React Hook Form
import { useForm } from "react-hook-form";
import { useComponentDidMount } from "../../Hooks/useComponendDidMount";

const FilterForm = ({ handleFilterStories, customStyles, selectOptions }) => {
	const [isOpen, setOpen] = useState(false);
	const { register, handleSubmit, getValues, setValue } = useForm();

	const selectRef = useRef("");

	const onSubmit = (data) => {
		handleFilterStories(data);
	};

	const handleSelectChange = ({ value }) => {
		const searched = getValues("searched");
		setValue("sort", value);
		handleFilterStories({ sort: value, searched });
	};

	useComponentDidMount(() => {
		setValue("sort", selectRef.current.getValue()[0].value);
	});

	return (
		<VStack alignItems={"flex-end"} position={"relative"} w={"100%"}>
			<Button
				onClick={() => setOpen((prev) => !prev)}
				_hover={{ border: "none" }}
				_focus={{ border: "none" }}
				bg={"black"}
				color={"white"}
				leftIcon={<MdOutlineArrowDropDownCircle />}
			>
				Filter
			</Button>
			<Box
				display={isOpen ? "block" : "none"}
				padding={"15px 15px 0px"}
				background={"white"}
				border={"1px solid #E6E6E6"}
				zIndex={"999999"}
				minW={"320px"}
				maxW={"320px"}
				borerRadius={"5px"}
				transform={"translateY(110%)"}
				position={"absolute"}
				right={"0%"}
				bottom={"0"}
			>
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
					<VStack
						ml={"auto"}
						w={{ base: "100%", lg: "100%" }}
						mb={"20px"}
						flexWrap={"wrap"}
						alignItems={"flex-end"}
					>
						<VStack w={"100%"} justifyContent={"flex-end"}>
							<Text w={"100%"} textAlign={"right"}>
								Sort By:
							</Text>
							<Box w={"100%"} alignItems={"center"}>
								<Select
									ref={selectRef}
									options={selectOptions}
									styles={customStyles}
									onChange={(e) => handleSelectChange(e)}
									defaultValue={selectOptions[0]}
								/>
								
							</Box>
						</VStack>
						<VStack w={"100%"}>
							<Text w={"100%"} textAlign={"right"}>
								Search By:
							</Text>
							<Flex w={"100%"} ml={"10px"}>
								<Input
									{...register("searched")}
									borderColor={"black"}
									borderRadius={"0"}
									fontSize={{ base: "13px", lg: "15px" }}
									w={{ base: "100%", lg: "100%" }}
									placeholder={"Search Your Story Title"}
								/>
								<IconButton
									borderColor={"black"}
									borderRadius={"0"}
									background={"black"}
									onClick={handleSubmit(onSubmit)}
									icon={<BsSearch color={"white"} />}
								/>
							</Flex>
						</VStack>
					</VStack>
				</form>
			</Box>
		</VStack>
	);
};

export default FilterForm;
