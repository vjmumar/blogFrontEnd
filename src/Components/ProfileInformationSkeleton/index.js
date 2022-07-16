import React from "react";
// Components
import { Skeleton, SkeletonCircle, SkeletonText, Stack, VStack } from "@chakra-ui/react";

const ProfileInformationSkeleton = () => {
	return (
		<Stack w={"100%"} h={"380px"} borderRadius={"10px"} border={"1px solid #E6E6E6"}>
			<VStack mb={"10px"}>
				<Skeleton borderTopLeftRadius={"10px"} borderTopRightRadius={"10px"} w={"348px"} h={"100px"} />
				<SkeletonCircle mt={"-50px !important"} size={"100px"} />
			</VStack>
			<SkeletonText  p={"10px"} mt={"3"} noOfLines={9} spacing={"3"} />
		</Stack>
	);
};

export default ProfileInformationSkeleton;
