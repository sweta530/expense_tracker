import { createUserTable } from "./userModel.js";
import { createCategoryTable } from "./categoryModel.js";
import { createExpenseTable } from "./expenseModel.js";

export * from "./userModel.js";
export * from "./expenseModel.js";
export * from "./categoryModel.js";

export const initializeTables = () => {
  createUserTable();
  createCategoryTable();
  createExpenseTable();
};
