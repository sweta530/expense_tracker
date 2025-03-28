import { getAll, getById, add, update, remove, query } from "./baseModel.js";
import dotenv from "dotenv";

dotenv.config();

const tableName = "users";

export const createUserTable = () =>
  query(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      status ENUM('active', 'inactive') DEFAULT 'active'
    )
  `);

export const registerUser = (user) => {
  const { name, email, status = "active" } = user;
  return add(tableName, { name, email, status });
};

export const getAllUsers = () => getAll(tableName);

export const getUserById = (id) => getById(tableName, id);

export const updateUser = (id, user) => {
  const { name, email, status } = user;
  return update(tableName, id, { name, email, status });
};

export const deleteUser = (id) => remove(tableName, id);
