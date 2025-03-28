import {
  getAllExpenses,
  getExpense,
  addExpense,
  updateExpense,
  deleteExpense,
  getTopSpendingDays,
  getMonthlySpendingChange,
  predictNextMonthSpending,
  getByUserId,
} from "../models/index.js";

import {
  successResponse,
  errorResponse,
  catchResponse,
  validationErrorResponse,
} from "../utils/index.js";

import {
  validateExpense,
  validateExpenseUpdate,
} from "../validation/expenseValidation.js";

import { STATUS_CODES } from "../constants/statusCodes.js";

export const getExpenses = async (req, res) => {
  try {
    const filters = {
      user_id: req.query.user_id || null,
      category: req.query.category || null,
      start_date: req.query.start_date || null,
      end_date: req.query.end_date || null,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
    };

    const expenses = await getAllExpenses(filters);
    return successResponse(
      res,
      expenses,
      "Expenses fetched successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error fetching expenses",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const expense = await getExpense(req.params.id);
    if (!expense) {
      return errorResponse(
        res,
        {},
        "Expense not found",
        STATUS_CODES.NOT_FOUND
      );
    }
    return successResponse(
      res,
      expense,
      "Expense fetched successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error fetching expense",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const getExpenseByUserId = async (req, res) => {
  try {
    const expenses = await getByUserId(req.params.id);
    if (!expenses.length) {
      return errorResponse(
        res,
        {},
        "No expenses found",
        STATUS_CODES.NOT_FOUND
      );
    }
    return successResponse(
      res,
      expenses,
      "User expenses fetched successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error fetching user expenses",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const createExpense = async (req, res) => {
  try {
    const { error } = validateExpense(req.body);
    if (error) {
      return validationErrorResponse(
        res,
        error.details,
        "Invalid expense data",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const { user_id, category, amount, date, description } = req.body;
    await addExpense({ user_id, category, amount, date, description });

    return successResponse(
      res,
      {},
      "Expense added successfully",
      STATUS_CODES.CREATED
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error adding expense",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const editExpense = async (req, res) => {
  try {
    const { error } = validateExpenseUpdate(req.body);
    if (error) {
      return validationErrorResponse(
        res,
        error.details,
        "Invalid update data",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const { id } = req.params;
    const { user_id, category, amount, date, description } = req.body;

    const result = await updateExpense(id, {
      user_id,
      category,
      amount,
      date,
      description,
    });

    if (result.affectedRows === 0) {
      return errorResponse(
        res,
        {},
        "Expense not found",
        STATUS_CODES.NOT_FOUND
      );
    }

    return successResponse(
      res,
      {},
      "Expense updated successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error updating expense",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const removeExpense = async (req, res) => {
  try {
    const result = await deleteExpense(req.params.id);
    if (result.affectedRows === 0) {
      return errorResponse(
        res,
        {},
        "Expense not found",
        STATUS_CODES.NOT_FOUND
      );
    }

    return successResponse(
      res,
      {},
      "Expense deleted successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error deleting expense",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const getTopSpendingDaysController = async (req, res) => {
  try {
    const results = await getTopSpendingDays();
    return successResponse(
      res,
      results,
      "Top spending days fetched successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error fetching top spending days",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const getMonthlySpendingChangeController = async (req, res) => {
  try {
    const result = await getMonthlySpendingChange();
    return successResponse(
      res,
      result,
      "Monthly spending change calculated",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error calculating spending change",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const predictNextMonthSpendingController = async (req, res) => {
  try {
    const result = await predictNextMonthSpending();
    return successResponse(
      res,
      result,
      "Next month's spending predicted",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error predicting spending",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};
