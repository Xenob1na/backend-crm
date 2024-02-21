import { Task } from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const task = await Task.findAll();

    res.status(200).json({ message: "Success", data: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Success", data: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    await Task.create(req.body);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTaskAll = async (req, res) => {
  try {
    await Task.destroy({
      truncate: true,
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
