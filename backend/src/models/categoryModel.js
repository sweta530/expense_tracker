import { getAll, getById, add, update, remove, query } from "./baseModel.js";

const tableName = "categories";

export const createCategoryTable = () =>
  query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL
    )
  `);

export const getCategories = () => getAll(tableName);
export const getCategoryById = (id) => getById(tableName, id);
export const addCategory = (name) => add(tableName, { name });
export const updateCategory = (id, name) => update(tableName, id, { name });
export const deleteCategory = (id) => remove(tableName, id);
