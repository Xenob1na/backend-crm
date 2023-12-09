import {
  getStaffs,
  getStaffsById,
  insertStaff,
  deleteStaffById,
  updateStaff,
} from "../models/staffModel.js";

export const showStaffs = async (req, res) => {
  try {
    getStaffs((err, results) => {
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

export const showStaffsById = async (req, res) => {
  try {
    getStaffsById(req.params.id, (err, results) => {
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

export const createStaffs = async (req, res) => {
  try {
    const data = req.body;
    insertStaff(data, (err, results) => {
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

export const updateStaffById = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    updateStaff(data, id, (err, results) => {
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

export const deleteStaff = async (req, res) => {
  try {
    const id = req.params.id;
    deleteStaffById(id, (err, results) => {
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
