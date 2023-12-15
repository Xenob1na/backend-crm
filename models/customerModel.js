import db from "../config/database.js";

export const getCustomers = (result) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getCustomersById = (id, result) => {
  db.query(
    "SELECT * FROM customers WHERE customer_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const insertCustomer = (data, result) => {
  db.query("INSERT INTO customers SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateCustomer = (data, id, result) => {
  db.query(
    "UPDATE customers SET full_name_customer = ?, email = ?, phone = ?, address = ?, description = ? WHERE customer_id = ?",
    [
      data.full_name_customer,
      data.email,
      data.phone,
      data.address,
      data.description,
      id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const deleteCustomerById = (id, result) => {
  db.query(
    "DELETE FROM customers WHERE customer_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
