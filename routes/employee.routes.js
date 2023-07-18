const express = require("express");
const router = express.Router();
const verifyEmployee = require('../middlewares/verifyEmployee')
const { employeeSignIn, viewProfile, viewProjects,
        projectTeammates, allEmployees } = require('../controllers/employee.controllers')

router.post("/signin", employeeSignIn);
router.get("/profile/:id",verifyEmployee, viewProfile);
router.get("/viewProjects/:employeeEmail",verifyEmployee, viewProjects);
router.get("/projectTeammates/:projectName",verifyEmployee, projectTeammates);
router.get("/all",verifyEmployee, allEmployees);

module.exports = router;
