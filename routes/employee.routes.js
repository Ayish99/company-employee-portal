const express = require("express");
const router = express.Router();
const { employeeSignUp, employeeSignIn, viewProfile, viewProjects,
        projectTeammates, viewOtherEmployees } = require('../controllers/employee.controllers')

//router.post("/employee/signup", employeeSignUp);
router.get("/employee/signin", employeeSignIn);
router.get("/employee/profile/:id", viewProfile);
router.get("/employee/signin", viewProjects);
router.get("/employee/signin", projectTeammates);
router.get("/employee/all", viewOtherEmployees);

module.exports = router;
