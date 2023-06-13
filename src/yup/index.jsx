import * as Yup from "yup";

export const signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(20).required("Please enter your name"),
    lastName: Yup.string().min(2).max(20).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    mobile: Yup.string()
      .required("Please enter your mobile number")
      .matches(/^\d{10}$/, "Mobile number must have 10 digits"),
    password: Yup.string().min(4).required("Please enter password"),
    confirmPassword: Yup.string()
      .required("Please confirm password")
      .oneOf([Yup.ref('password'), null], "Password doesn't match"),
  });
  

  export const loginSchema=Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(4).required("Please enter password"),

  })


  export const emailConfirm=Yup.object({
    email: Yup.string().email().required("Please enter your email"),
  })


  export const changePassword=Yup.object({
    password: Yup.string().min(4).required("Please enter password"),
    confirmPassword: Yup.string()
      .required("Please confirm password")
      .oneOf([Yup.ref('password'), null], "Password doesn't match"),
  })



  export const profileUpdate=Yup.object({
    firstName:Yup.string().required("please enter first name"),
    lastName:Yup.string().required("please enter first name"),
    email: Yup.string().email().required("Please enter your email"),
    mobile: Yup.string()
    .required("Please enter your mobile number")
    .matches(/^\d{10}$/, "Mobile number must have 10 digits"),

  })