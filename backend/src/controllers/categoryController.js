import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../models/index.js";

import {
  successResponse,
  errorResponse,
  catchResponse,
  validationErrorResponse,
} from "../utils/index.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { validateCategory } from "../validation/categoryValidation.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    return successResponse(
      res,
      categories,
      "Categories fetched successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error fetching categories",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    if (!category) {
      return errorResponse(
        res,
        {},
        "Category not found",
        STATUS_CODES.NOT_FOUND
      );
    }

    return successResponse(
      res,
      category,
      "Category fetched successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error fetching category",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const createCategory = async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) {
      return validationErrorResponse(
        res,
        error.details,
        "Invalid category data",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const { name } = req.body;
    await addCategory(name);

    return successResponse(
      res,
      {},
      "Category added successfully",
      STATUS_CODES.CREATED
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error adding category",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await updateCategory(id, name);
    if (result.affectedRows === 0) {
      return errorResponse(
        res,
        {},
        "Category not found",
        STATUS_CODES.NOT_FOUND
      );
    }

    return successResponse(
      res,
      {},
      "Category updated successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error updating category",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const removeCategory = async (req, res) => {
  try {
    const result = await deleteCategory(req.params.id);
    if (result.affectedRows === 0) {
      return errorResponse(
        res,
        {},
        "Category not found",
        STATUS_CODES.NOT_FOUND
      );
    }

    return successResponse(
      res,
      {},
      "Category deleted successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error deleting category",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};
