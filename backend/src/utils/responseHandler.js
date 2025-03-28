import { STATUS_CODES } from "../constants/statusCodes.js";

const API_SUCCESS = 1;
const API_ERROR = 0;

/**
 *  Success response
 */
export const successResponse = (
  res,
  data,
  message = "",
  status = STATUS_CODES.OK
) => {
  res.status(status).json({
    success: API_SUCCESS,
    status,
    message,
    data,
  });
};

/**
 *  General error response
 */
export const errorResponse = (
  res,
  error,
  message = "",
  status = STATUS_CODES.BAD_REQUEST
) => {
  res.status(status).json({
    success: API_ERROR,
    status,
    message,
    error: error?.message || error,
  });
};

/**
 *  Catch server errors
 */
export const catchResponse = (
  res,
  responseError,
  message,
  status = STATUS_CODES.INTERNAL_SERVER_ERROR
) => {
  res.status(status).json({
    success: API_ERROR,
    status,
    message,
    error: responseError?.message || "An unexpected error occurred",
  });
};

/**
 *  Validation error response
 */
export const validationErrorResponse = (
  res,
  error,
  message,
  status = STATUS_CODES.BAD_REQUEST
) => {
  res.status(status).json({
    success: API_ERROR,
    status,
    message,
    error: error.details || error,
  });
};

/**
 *  Unauthorized error response
 */
export const unauthorizedErrorResponse = (
  res,
  error,
  message,
  status = STATUS_CODES.UNAUTHORIZED
) => {
  res.status(status).json({
    success: API_ERROR,
    status,
    message,
    error: error?.message || error,
  });
};

/**
 *  Check if a value is empty
 */
export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);
