import * as Yup from "yup";

// RestAPI link
export const API_HOST = "http://127.0.0.1:8000/api/";

//Validation Constant
export const validationRequired = Yup.string()
  .required("This field is required")
  .trim();
export const validationName = Yup.string()
  .required("This field is required")
  .trim()
  .matches(/^[a-zA-Z\s]*$/, "Invalid input");
export const validationRequiredNum = Yup.number()
  .typeError("Must be a number")
  .required("This field is required");

export const validationEmail = Yup.string()
  .email("Enter a valid email")
  .required("This field is required");

export const validationDate = Yup.date().required("This field is required");

export const yesterday = new Date(Date.now() - 86400000);
