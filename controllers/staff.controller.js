import { Staff } from "../models/staff.model.js";

export const getStaffs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  let staffs;
  try {
    if (page && limit) {
      staffs = await Staff.findAndCountAll({
        offset: (page - 1) * limit,
        limit: limit,
      });
    } else {
      staffs = await Staff.findAll();
    }

    res.status(200).json({ message: "Success", data: staffs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Success", data: staff });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    await Staff.create(req.body);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    await Staff.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    await Staff.update(req.body, {
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
