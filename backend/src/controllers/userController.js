import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../models/index.js";

import {
  successResponse,
  errorResponse,
  catchResponse,
  validationErrorResponse,
} from "../utils/index.js";

import {
  validateRegister,
  validateUserUpdate,
} from "../validation/userValidation.js";

import { STATUS_CODES } from "../constants/statusCodes.js";

import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      return validationErrorResponse(
        res,
        error.details,
        "Invalid input",
        STATUS_CODES.BAD_REQUEST
      );
    }

    await registerUser(req.body);
    return successResponse(
      res,
      {},
      "User registered successfully",
      STATUS_CODES.CREATED
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error registering user",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return successResponse(
      res,
      users,
      "Users fetched successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error fetching users",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return errorResponse(res, {}, "User not found", STATUS_CODES.NOT_FOUND);
    }

    return successResponse(
      res,
      user,
      "User fetched successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error fetching user",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const update = async (req, res) => {
  try {
    const { error } = validateUserUpdate(req.body);
    if (error) {
      return validationErrorResponse(
        res,
        error.details,
        "Invalid input",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const result = await updateUser(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return errorResponse(res, {}, "User not found", STATUS_CODES.NOT_FOUND);
    }

    return successResponse(
      res,
      {},
      "User updated successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error updating user",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const remove = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    if (result.affectedRows === 0) {
      return errorResponse(res, {}, "User not found", STATUS_CODES.NOT_FOUND);
    }

    return successResponse(
      res,
      {},
      "User deleted successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return catchResponse(
      res,
      error,
      "Error deleting user",
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};
