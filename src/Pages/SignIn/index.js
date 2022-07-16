import React from "react";
// Components
import { VStack } from "@chakra-ui/react";
import Form from "../../Components/SignIn/index";

// Router
import { useLocation } from "react-router-dom";

const SignIn = () => {
  const {state} = useLocation();
  return (
    <VStack h={"100%"} w={"100%"} position={"relative"} justifyContent={"center"}>
        <Form signUpEmail={state?.email} signUpPassword={state?.password} />
    </VStack>
  );
};

export default SignIn;
