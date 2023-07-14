import * as yup from "yup";

export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required("Cannot be empty")
        .min(3, "Name must be at least 3 characters long"),
    surname: yup
        .string()
        .required("Cannot be empty"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Cannot be empty"),
    password: yup
        .string()
        .required("Cannot be empty")
        .min(5, "Password must be at least 5 characters long"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Cannot be empty"),
});