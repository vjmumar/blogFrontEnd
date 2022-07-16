import React, { lazy, Suspense, useContext } from "react";

// Components
import { Button,  Text, VStack } from "@chakra-ui/react";
import EndOfListDivider from "../EndOfListDivider";

// Context
import { Context } from "../../Pages/SearchPage/context";

// Redux
import { useSelector } from "react-redux";

// Lazy
const Blocks = lazy(() => import("./Blocks/index"));

const Users = () => {

  const {search, isLoading} = useSelector(state => state.searchPeopleStates);

  const {
    handleIncrementUser,
    userIncrement,
  } = useContext(Context);
  
  return (
    <VStack w={"100%"}>
          <Suspense fallback={<Text>Loading</Text>}>
            <Blocks
              searchedUser={search.result}
            />
          </Suspense>
          {search?.totalResult > userIncrement || isLoading ? (
            <Button
              onClick={handleIncrementUser}
              isLoading={isLoading}
              color={"white"}
              bg={"black"}
              p={"25px 17%"}
              mt={"15px !important"}
            >
              More
            </Button>
          ) : (
            <EndOfListDivider />
      )}
    </VStack>
  );
};

export default Users;
