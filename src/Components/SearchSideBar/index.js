/* eslint-disable react/display-name */
import React, { memo, useState } from "react";

// Component
import { Flex } from "@chakra-ui/react";
import Form from "./Form";
// Icons
import { BiChevronLeft } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

const SearchSideBar = memo(() => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Flex
			position={{ base: "fixed", lg: "sticky" }}
			display={{ base: "flex", lg: "block" }}
			bg={"white"}
			p={"20px 15px"}
			right={{ base: "0", lg: "unset"}}
			transform={{ base: `translateX(${isOpen ? "0%" : "100%"})`, lg: "translateX(0)"}}
			transition={"all .5s ease"}
			borderLeft={"1px solid #E6E6E6"}
			top={"0"}
			w={"300px"}
			flexShrink={"0"}
			h={"100vh"}
			justifyContent={"center"}
		>
			<Flex
				onClick={() => setIsOpen((prev) => !prev)}
				display={{ base: "flex", lg: "none" }}
				position={"absolute"}
				right={"20px"}
				top={"20px"}
			>
				<GrClose size={"25px"} />
			</Flex>
			<Flex
				w={"30px"}
				h={"30px"}
				position={"absolute"}
				left={"-10%"}
				onClick={() => setIsOpen((prev) => !prev)}
				display={{ base: !isOpen ? "flex" : "none", lg: "none" }}
				bg={"black"}
				alignItems={"center"}
				right={"0"}
				bottom={"0"}
				top={"0"}
				mt={"auto"}
				mb={"auto"}
				justifyContent={"center"}
			>
				<BiChevronLeft size={"20px"} color={"white"} />
			</Flex>
			<Form toggleSideBar={() => setIsOpen((prev) => !prev)} />
		</Flex>
	);
});

export default SearchSideBar;
