import {
  getSchedules,
  getSchedulesById,
  insertSchedule,
  updateSchedule,
  deleteScheduleById,
} from "../models/scheduleModel.js";

export const showSchedule = async (req, res) => {
  try {
    getSchedules((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const showSchedulesById = async (req, res) => {
  try {
    getSchedulesById(req.params.id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const createSchedule = async (req, res) => {
  try {
    const data = req.body;
    insertSchedule(data, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateScheduleById = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    updateSchedule(data, id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const id = req.params.id;
    deleteScheduleById(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
