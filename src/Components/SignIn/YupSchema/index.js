import * as yup from "yup";

export const YUP_SCHEMA = yup.object().shape({
  email: yup.string().email('Please Enter A Valid Email!').required("Email Is Required!"),
  password: yup.string().min(7,'Password Must be at least 7 characters').required("Password Is Required!")
});
