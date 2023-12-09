import db from "../config/database.js";

export const getStaffs = (result) => {
  db.query("SELECT * FROM staffs", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getStaffsById = (id, result) => {
  db.query("SELECT * FROM staffs WHERE staff_id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

export const insertStaff = (data, result) => {
  db.query("INSERT INTO staffs SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const deleteStaffById = (id, result) => {
  db.query("DELETE FROM staffs WHERE staff_id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateStaff = (data, id, result) => {
  db.query(
    "UPDATE staffs SET full_name = ?, email = ?, phone = ?, address = ?, post = ?, age = ? WHERE staff_id = ?",
    [
      data.full_name,
      data.email,
      data.phone,
      data.address,
      data.post,
      data.age,
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


