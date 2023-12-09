import {
  getCustomers,
  getCustomersById,
  insertCustomer,
  updateCustomer,
  deleteCustomerById,
} from "../models/customerModel.js";

export const showCustomers = async (req, res) => {
  try {
    getCustomers((err, results) => {
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

export const showCustomersById = async (req, res) => {
  try {
    getCustomersById(req.params.id, (err, results) => {
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

export const createCustomer = async (req, res) => {
  try {
    const data = req.body;
    insertCustomer(data, (err, results) => {
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

export const updateCustomerById = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    updateCustomer(data, id, (err, results) => {
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

export const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    deleteCustomerById(id, (err, results) => {
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
