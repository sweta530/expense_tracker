import express from "express";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  editExpense,
  removeExpense,
  getTopSpendingDaysController,
  getMonthlySpendingChangeController,
  predictNextMonthSpendingController,
  getExpenseByUserId,
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", createExpense);
router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.put("/:id", editExpense);
router.delete("/:id", removeExpense);
router.get("/userid/:id", getExpenseByUserId);

router.get("/stats/top-days", getTopSpendingDaysController);
router.get("/stats/monthly-change", getMonthlySpendingChangeController);
router.get("/stats/predict", predictNextMonthSpendingController);

export default router;
