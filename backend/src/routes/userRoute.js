import express from "express";
import {
  register,
  getUsers,
  getUser,
  update,
  remove,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", register);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
