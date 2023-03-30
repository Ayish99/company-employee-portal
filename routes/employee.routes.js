const express = require("express");
const router = express.Router();
const verifyEmployee = require('../middlewares/verifyToken')
const { employeeSignIn, viewProfile, viewProjects,
        projectTeammates, viewOtherEmployees } = require('../controllers/employee.controllers')

router.get("/employee/signin", employeeSignIn);
router.get("/employee/profile/:id",verifyEmployee, viewProfile);
router.get("/employee/signin",verifyEmployee, viewProjects);
router.get("/employee/signin",verifyEmployee, projectTeammates);
router.get("/employee/all",verifyEmployee, viewOtherEmployees);

module.exports = router;
