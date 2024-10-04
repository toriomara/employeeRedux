const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getEmployees,
  addEmployee,
  getEmployeeById,
  removeEmployee,
  editEmployee,
} = require("../controllers/employees");

// /api/employees
router.get("/", auth, getEmployees);
// /api/employees/:id
router.get("/:id", auth, getEmployeeById);
// /api/employees/add
router.post("/add", auth, addEmployee);
// /api/employees/remove/:id
router.post("/remove/:id", auth, removeEmployee);
// /api/employees/edit/:id
router.put("/edit/:id", auth, editEmployee);

module.exports = router;
