import React from "react";

// Use Form
import { useForm } from "react-hook-form";

// Router
import { useNavigate, useSearchParams } from "react-router-dom";

// Route
import { SEARCH_ROUTE } from "../../../Routes";

// Component
import { Flex, Input, Text, Stack } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

// Constant

const Form = ({toggleSideBar}) => {
  // ROuter Methods
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // UseForm
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const type = searchParams.get('type');
    if (data.search.trim()) {
      navigate(`${SEARCH_ROUTE}/${data.search.trim()}/?type=${type}`);
      toggleSideBar();
    }
  };

  return (
    <Flex w={"100%"}>
      <form
        style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text w={"100%"} textAlign={"left"} fontSize={"16px"} mb={"10px"}>
          Search User Or Story
        </Text>
        <Flex border={"1px solid black"} w={"100%"} position={"relative"}>
          <Input
            {...register("search")}
            name={"search"}
            border={"none"}
            _focus={{ border: "none" }}
            placeholder={"Ex: Hades"}
            type={"text"}
          />
          <Stack
            position={"absolute"}
            right={"0"}
            top={"0"}
            bottom={"0"}
            m={"auto 0"}
            h={"101%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            bg={"black"}
            p={"0 15px"}
            zIndex={"99"}
            cursor={"pointer"}
            onClick={handleSubmit(onSubmit)}
          >
            <BsSearch fill='white' height={"fit-content"} />
          </Stack>
        </Flex>
      </form>
    </Flex>
  );
};

export default Form;
