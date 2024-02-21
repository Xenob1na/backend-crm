import express from "express";
import db from "../config/database.js";
import { signupValidation, loginValidation } from "../helpers/validation.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  deleteTaskAll
} from "../controllers/task.controller.js"

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

const router = express.Router();

router.post("/register", signupValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This user is already in use!",
        });
      } else {
        
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            
            db.query(
              `INSERT INTO users (name, email, password) VALUES ('${
                req.body.name
              }', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  throw err;
                }
                return res.status(201).send({
                  msg: "The user has been registerd with us!",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", loginValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      
      if (err) {
        throw err;
      }
      if (!result.length) {
        return res.status(401).send({
          message: "Email or password is incorrect!",
        });
      }
      
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          
          if (bErr) {
            throw bErr;
          }
          if (bResult) {
            const token = jwt.sign(
              { id: result[0].id },
              "the-super-strong-secrect",
              { expiresIn: "1h" },
              { algorithm: 'HS256' }
            );
            res.co
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            message: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

router.get("/get-user", signupValidation, (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(422).json({
      message: "Please provide the token",
    });
  }

  const theToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(theToken, "the-super-strong-secrect");

  db.query(
    "SELECT * FROM users where id=?",
    decoded.id,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "Fetch Successfully.",
      });
    }
  );
});

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
