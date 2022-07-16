import * as yup from "yup";

export const YUP_SCHEMA = yup.object().shape({
	email: yup.string().email("Please Enter A Valid Email!").required("Email Is Required!"),
  firstName: yup.string().required("First Name Is Required"),
  lastName: yup.string().required("Last Name Is Required"),
	password: yup
		.string()
		.min(7, "Password Must be at least 7 characters")
		.required("Password Is Required!"),
	confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
});
