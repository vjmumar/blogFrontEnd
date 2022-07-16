import React, { useState } from "react";
// Components
import { Flex } from "@chakra-ui/react";
// Css
import "./style.css";

const SideBarIcon = ({ Icon, name, size, ...rest }) => {
	// State
	const [isActive, setActive] = useState(!Boolean);

	const handleMouseEnter = () => {
		setActive((prev) => !prev);
	};

	const handleMouseLeave = () => {
		setActive((prev) => !prev);
	};

	return (
		<Flex
			m={"0px !important"}
			position={"relative"}
			className={"sidebar-icon-wrapper"}
			name={name}
			{...rest}
      w={{ base: "20px", lg: "unset"}}
      h={{ base: "20px", lg: "unset"}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{Icon}
			{isActive && <Flex className='icon-alt'>{name}</Flex>}
		</Flex>
	);
};

export default SideBarIcon;
