import * as yup from "yup"

export const LoginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password must greater than 6")
    .required("Password is required"),
})
