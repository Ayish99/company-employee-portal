const express = require("express");
const router = express.Router();
const verifyEmployee = require('../middlewares/verifyEmployee')
const { employeeSignIn, viewProfile, viewProjects,
        projectTeammates, allEmployees } = require('../controllers/employee.controllers')

router.get("/employee/signin", employeeSignIn);
router.get("/employee/profile/:id",verifyEmployee, viewProfile);
router.get("/employee/viewProjects/:employeeEmail",verifyEmployee, viewProjects);
router.get("/employee/projectTeammates/:projectName",verifyEmployee, projectTeammates);
router.get("/employee/all",verifyEmployee, allEmployees);

module.exports = router;
