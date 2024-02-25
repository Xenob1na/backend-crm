import { Customer } from "../models/customer.model.js";

export const getCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  let customers;
  try {
    if (page && limit) {
      customers = await Customer.findAndCountAll({
        offset: (page - 1) * limit,
        limit: limit,
      });
    } else {
      customers = await Customer.findAll();
    }
    res.status(200).json({ message: "Success", data: customers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Success", data: customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    await Customer.create(req.body);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    await Customer.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    await Customer.update(req.body, {
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
