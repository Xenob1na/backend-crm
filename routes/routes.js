import express from "express";

import {
  showTasks,
  showTaskById,
  createTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", showTasks);
router.get("/tasks/:id", showTaskById);
router.post("/tasks", createTask);
router.delete("/tasks/:id", deleteTask);

export default router;