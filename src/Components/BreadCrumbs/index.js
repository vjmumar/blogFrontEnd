/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";

// Router
import { useSearchParams } from "react-router-dom";

// Components
import { Flex, Text } from "@chakra-ui/react";

const BreadCrumbs = React.memo(({ context, menus }) => {
	const [searchParams] = useSearchParams();
	const { handleTogglePage } = useContext(context);
	const type = searchParams.get("type");

	return (
		<Flex pb={"10px"} w={"100%"} borderBottom={"1px solid #E6E6E6"} className='naviagtion'>
			{menus.map((e, index) => (
				<Flex key={index}>
					<Text
						color={type !== e.params ? "gray.300" : "black"}
						cursor={"pointer"}
						name={e.type}
						fontSize={{ base: "14px", lg: "14px" }}
						onClick={handleTogglePage}
					>
						{e.name}
					</Text>
					{menus.slice(-1)[0].name !== e.name && (
						<Text mr={"15px"} ml={"15px"}>
							|
						</Text>
					)}
				</Flex>
			))}
		</Flex>
	);
});

export default BreadCrumbs;
