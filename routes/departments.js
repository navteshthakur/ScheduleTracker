const express = require("express");
const router = express.Router();
const Department = require("../models/department");
const AuthenticationMiddleware = require("../extensions/authentication");

// GET /departments/
router.get("/", AuthenticationMiddleware,async (req, res, next) => {
  let departments = await Department.find().sort([["department", "ascending"]]);
  res.render("departments/index", { title: "Department List", dataset: departments, user: req.user });
});

// GET /departments/Add
router.get("/add", AuthenticationMiddleware, (req, res, next) => {
  res.render("departments/add", { title: "Add a new Department", user: req.user });
});

// POST /departments/Add
router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  let newDepartment = new Department({
    department: req.body.department,
    taskCode: req.body.taskCode,
  });
  await newDepartment.save();
  res.redirect("/departments");
});

module.exports = router;