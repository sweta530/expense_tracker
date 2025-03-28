import { getAll, getById, add, update, remove, query } from "./baseModel.js";

const tableName = "expenses";

export const createExpenseTable = () =>
  query(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      category VARCHAR(100),
      amount DECIMAL(10,2) NOT NULL,
      date DATE NOT NULL,
      description TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

export const getAllExpenses = async (filters) => {
  const {
    user_id,
    category,
    start_date,
    end_date,
    limit = 10,
    page = 1,
  } = filters;

  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const offset = (parsedPage - 1) * parsedLimit;

  let params = [];
  let conditions = " WHERE 1=1";

  if (user_id) {
    conditions += " AND user_id = ?";
    params.push(user_id);
  }
  if (category) {
    conditions += " AND category = ?";
    params.push(category);
  }
  if (start_date) {
    conditions += " AND date >= ?";
    params.push(start_date);
  }
  if (end_date) {
    conditions += " AND date <= ?";
    params.push(end_date);
  }

  const countQuery = `SELECT COUNT(*) AS total FROM ${tableName} ${conditions}`;
  const dataQuery = `SELECT * FROM ${tableName} ${conditions} ORDER BY date DESC LIMIT ? OFFSET ?`;

  params.push(parsedLimit, offset);

  const [{ total }] = await query(
    countQuery,
    params.slice(0, params.length - 2)
  );
  const totalPages = Math.ceil(total / parsedLimit);

  const items = total > 0 ? await query(dataQuery, params) : [];

  return {
    items,
    page_info: {
      current_page: parsedPage,
      limit: parsedLimit,
      total_pages: totalPages,
      total_records: total,
    },
  };
};

export const getExpense = (id) => getById(tableName, id);

export const addExpense = async (expense) => {
  const { user_id, category, amount, date, description } = expense;
  const roundedAmount = parseFloat(amount).toFixed(2);

  await query(
    "INSERT INTO categories (name) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = ?)",
    [category, category]
  );

  return add(tableName, {
    user_id,
    category,
    amount: roundedAmount,
    date,
    description,
  });
};

export const updateExpense = async (id, expense) => {
  const { user_id, category, amount, date, description } = expense;
  const roundedAmount = parseFloat(amount).toFixed(2);

  await query(
    "INSERT INTO categories (name) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = ?)",
    [category, category]
  );

  return update(tableName, id, {
    category,
    amount: roundedAmount,
    date,
    description,
  });
};

export const deleteExpense = (id) => remove(tableName, id);

export const getTopSpendingDays = async () => {
  const sql = `
    SELECT date, ROUND(SUM(amount), 2) AS total_spent
    FROM ${tableName}
    GROUP BY date
    ORDER BY total_spent DESC
    LIMIT 3;
  `;

  const results = await query(sql);
  return results.map(({ date, total_spent }) => ({
    date,
    total_spent: parseFloat(total_spent).toFixed(2),
  }));
};

export const getMonthlySpendingChange = async () => {
  const sql = `
    SELECT 
      SUM(CASE WHEN MONTH(date) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) THEN amount ELSE 0 END) AS last_month,
      SUM(CASE WHEN MONTH(date) = MONTH(CURRENT_DATE) THEN amount ELSE 0 END) AS current_month
    FROM ${tableName};
  `;

  const [result] = await query(sql);
  const lastMonth = parseFloat(result.last_month || 0).toFixed(2);
  const currentMonth = parseFloat(result.current_month || 0).toFixed(2);
  const percentageChange =
    lastMonth === "0.00" ? 0 : ((currentMonth - lastMonth) / lastMonth) * 100;

  return {
    lastMonth,
    currentMonth,
    percentageChange: percentageChange.toFixed(2),
  };
};

export const predictNextMonthSpending = async () => {
  const sql = `
    SELECT ROUND(AVG(monthly_total), 2) AS avg_spending
    FROM (
      SELECT SUM(amount) AS monthly_total
      FROM ${tableName}
      GROUP BY YEAR(date), MONTH(date)
      ORDER BY YEAR(date) DESC, MONTH(date) DESC
      LIMIT 3
    ) AS last_three_months;
  `;

  const [result] = await query(sql);
  return {
    predicted_spending: parseFloat(result?.avg_spending || 0).toFixed(2),
  };
};

export const getByUserId = (userId) =>
  query(`SELECT * FROM ${tableName} WHERE user_id = ?`, [userId]);
