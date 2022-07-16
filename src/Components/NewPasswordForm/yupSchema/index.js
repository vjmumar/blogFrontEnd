import * as yup from "yup";

export const YUP_SCHEMA = yup.object().shape({
    newPassword: yup.string().min(7,"Password Must Be Atleast 7 characters").required("Please Enter New Password"),
    confirmNewPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Password must Match")
});
