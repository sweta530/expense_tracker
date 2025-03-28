import * as yup from "yup";

export const expenseSchema = yup.object().shape({
  user_id: yup.string().required("User is required"),
  category: yup.string().required("Category is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  date: yup.date().required("Date is required"),
  description: yup
    .string()
    .optional()
    .max(255, "Description should be less than 255 characters"),
});

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const categorySchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});
