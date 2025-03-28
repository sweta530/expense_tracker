import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategory,
  editCategory,
  removeCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.put("/:id", editCategory);
router.delete("/:id", removeCategory);

export default router;
