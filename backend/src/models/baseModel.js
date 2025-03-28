import db from "../config/dbConnection.js";

// General query function
export const query = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

// Get all records from a table
export const getAll = (table) => query(`SELECT * FROM ${table}`);

// Get a single record by ID
export const getById = async (table, id) => {
  const [result] = await query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
  return result || null;
};

// Insert a new record
export const add = async (table, data) => {
  const keys = Object.keys(data).join(", ");
  const values = Object.values(data);
  const placeholders = new Array(values.length).fill("?").join(", ");

  const sql = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
  const { insertId } = await query(sql, values);
  return insertId;
};

// Update a record by ID
export const update = async (table, id, data) => {
  const setClause = Object.entries(data)
    .map(([key]) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(data), id];

  const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
  const result = await query(sql, values);
  if (result.affectedRows === 0) throw new Error("ID not found");
  return result;
};

// Delete a record by ID
export const remove = async (table, id) => {
  const sql = `DELETE FROM ${table} WHERE id = ?`;
  const result = await query(sql, [id]);
  if (result.affectedRows === 0) throw new Error("ID not found");
  return result;
};
