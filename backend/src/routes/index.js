import express from "express";
import userRoutes from "./userRoute.js";
import expenseRoutes from "./expenseRoute.js";
import categoryRoutes from "./categoryRoute.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/expenses", expenseRoutes);
router.use("/categories", categoryRoutes);

export default router;
