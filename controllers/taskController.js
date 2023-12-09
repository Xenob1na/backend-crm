import {
  getTasks,
  getTaskById,
  insertTask,
  deleteTaskById,
  deleteAll,
} from "../models/taskModel.js";

export const showTasks = async (req, res) => {
  try {
    getTasks((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
};

export const showTaskById = async (req, res) => {
  try {
    getTaskById(req.params.id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const data = req.body;
    insertTask(data, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    deleteTaskById(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
};

export const deleteTaskAll = async (req, res) => {
  try {
    deleteAll((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
};
