// Naming convention > controllers/routers are plural
// Import express and create router object
const express = require("express");
const router = express.Router();
// Import mongoose model to be used
const Schedule = require("../models/schedule");
const Department = require("../models/department");
// Moved middleware function to extensions/authentication.js to make it reusable across different routers
const AuthenticationMiddleware = require("../extensions/authentication");
// Custom Middleware function to check for an authenticated user
// function AuthenticationMiddleware(req, res, next) {
//     if (req.isAuthenticated()) { // returns true if the session was started
//         return next(); // calls the next middleware in the stack
//     }
//     else {
//         // user not authenticated
//         res.redirect("/login");
//     }
// }
// Configure GET/POST handlers
// Path relative to the one configured in app.js > /projects
// GET /projects/
router.get("/", async (req, res, next) => {
  // retrieve ALL data, and sort by dueDate
  let schedules = await Schedule.find().sort([["scheduleDate", "descending"]]);
  // render view
  res.render("schedules/index", {
    title: "Schedule Tracker",
    dataset: schedules,
    user: req.user,
  });
});
// GET /projects/add
router.get("/add", AuthenticationMiddleware, async (req, res, next) => {
  let departmentList = await Department.find().sort([["department", "ascending"]]);
  res.render("schedules/add", {
    title: "Add a New Schedule",
    departments: departmentList,
    user: req.user,
  });
});

// POST /projects/add
router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  // use the project module to save data to DB
  // use the new Project() method of the model
  // and map the fields with data from the request
  // newProject object is returned if operation was successful
  // save changes and redirect
  let newSchedule = new Schedule({
    employeeName: req.body.employeeName,
    scheduleDate: req.body.scheduleDate,
    department: req.body.department,
    isScheduled: req.body.isScheduled
  });
  await newSchedule.save();
  res.redirect("/schedules");
});

// GET /projects/delete/_id
// access parameters via req.params object
router.get("/delete/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let scheduleId = req.params._id;
  await Schedule.findByIdAndRemove({ _id: scheduleId });
  res.redirect("/schedules");
});

// GET /projects/edit/_id
router.get("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let scheduleId = req.params._id;
  let scheduleData = await Schedule.findById(scheduleId);
  let departmentList = await Department.find().sort([["department", "ascending"]]);
  res.render("schedules/edit", {
    title: "Edit Schedule Info",
    schedule: scheduleData,
    departments: departmentList,
    user: req.user,
  });
});

// POST /projects/edit/_id
router.post("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let scheduleId = req.params._id;
  await Schedule.findByIdAndUpdate(
    { _id: scheduleId }, // filter to find the project to update
    {
      // updated data
      employeeName: req.body.employeeName,
      scheduleDate: req.body.scheduleDate,
      department: req.body.department,
      isScheduled: req.body.isScheduled,
    }
  );
  res.redirect("/schedules");
});

// Export router object
module.exports = router;
