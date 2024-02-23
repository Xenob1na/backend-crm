import express from "express";

import {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  deleteTaskAll,
} from "../controllers/task.controller.js";

import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomer,
} from "../controllers/customer.contorller.js";

import {
  getStaffs,
  getStaffById,
  createStaff,
  updateStaffById,
  deleteStaff,
} from "../controllers/staff.controller.js";

import {
  showSchedule,
  showSchedulesById,
  createSchedule,
  updateScheduleById,
  deleteSchedule,
} from "../controllers/scheduleController.js";

import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/getUser",  getUser);

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.delete("/tasks/:id", deleteTask);
router.delete("/tasks", deleteTaskAll);

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", createCustomer);
router.put("/customers/:id", updateCustomerById);
router.delete("/customers/:id", deleteCustomer);

router.get("/staffs", getStaffs);
router.get("/staffs/:id", getStaffById);
router.post("/staffs", createStaff);
router.put("/staffs/:id", updateStaffById);
router.delete("/staffs/:id", deleteStaff);

router.get("/schedules", showSchedule);
router.get("/schedules/:id", showSchedulesById);
router.post("/schedules", createSchedule);
router.put("/schedules/:id", updateScheduleById);
router.delete("/schedules/:id", deleteSchedule);

export default router;
