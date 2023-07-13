import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().required("Cannot be empty"),
    password: yup.string().required("Cannot be empty"),
});