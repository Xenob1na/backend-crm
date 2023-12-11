import db from "../config/database.js";

export const getSchedules = (result) => {
  db.query("SELECT schedules.schedule_id, schedules.created_date, customers.full_name_customer, staffs.full_name_staff, customers.address FROM schedules, customers, staffs WHERE schedules.customer_id = customers.customer_id AND schedules.staff_id=staffs.staff_id", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getSchedulesById = (id, result) => {
  db.query(
    "SELECT schedules.schedule_id, schedules.created_date, customers.full_name_customer, staffs.full_name_staff, customers.address FROM schedules, customers, staffs WHERE schedules.customer_id = customers.customer_id AND schedules.staff_id=staffs.staff_id AND schedules.schedule_id = ?",
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

export const insertSchedule = (data, result) => {
  db.query("INSERT INTO schedules SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateSchedule = (data, id, result) => {
  db.query(
    "UPDATE schedules SET customer_id = ?, staff_id = ?, address_customer = ? WHERE customer_id = ?",
    [data.customer_id, data.staff_id, data.address_customer, id],
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

export const deleteScheduleById = (id, result) => {
  db.query(
    "DELETE FROM schedules WHERE schedule_id = ?",
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
