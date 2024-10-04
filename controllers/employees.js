const { prisma } = require("../prisma/prisma-client");

/**
@route GET /api/employees
@desc Get all employees
@access Protected
*/

const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Ne udalos poluchit" employees' });
  }
};

/**
 @route POST /api/employees/add
 @desc Adding employee
 @access Protected
 */

const addEmployee = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "The fields are required" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 @route DELETE /api/employees/remove/:id
 @desc Deleting employee
 @access Protected
 */

const removeEmployee = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.employee.delete({
      where: { id },
    });
    res.status(204).json("OK");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Employee didn't delete" });
  }
};

/**
 @route PUT /api/employees/edit/:id
 @desc Editing employee
 @access Protected
 */

const editEmployee = async (req, res) => {
  const data = req.body;
  const id = data.id;
  try {
    await prisma.employee.update({
      where: { id },
      data,
    });
    res.status(204).json({ message: "Employee edited" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Employee didn't edit" });
  }
};

/**
 @route GET /api/employees/:id
 @desc Getting employee
 @access Protected
 */

const getEmployeeById = async (req, res) => {
  //   const data = req.body;
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });
    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Employee didn't find" });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  removeEmployee,
  editEmployee,
  getEmployeeById,
};
