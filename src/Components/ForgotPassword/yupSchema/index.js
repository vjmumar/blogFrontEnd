import * as yup from "yup";

export const YUP_SCHEMA = yup.object().shape({
    email: yup.string().email("Please Enter A Valid Email").required("Please Input Email")
});
