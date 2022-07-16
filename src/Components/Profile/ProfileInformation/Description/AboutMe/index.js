import React from 'react';
// Components
import {Text, Textarea, Button, Spinner} from "@chakra-ui/react";

const AboutMe = ({isEdit, aboutMe, handleSubmit, register, profileLoading, handleEdit }) => {
  return (
    <>
    {!isEdit ? (
        !profileLoading ? (
            <Text>{aboutMe}</Text>
        ) : (
            <Spinner m={"auto"} />
        )
    ) : (
        <>
            <Textarea {...register("profileDescription")}>
                {aboutMe}
            </Textarea>
            <Button
                onClick={handleSubmit(handleEdit)}
                w={"100%"}
                bg={"blue.400"}
                color={"white"}
            >
                Submit
            </Button>
        </>
    )}
    </>
  )
}

export default AboutMe