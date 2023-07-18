const express = require("express");
const verifyAdmin = require('../middlewares/verifyAdmin')
const router = express.Router();
const { adminSignUp, adminSignIn, addNewEmployee, addEmployeeToProject,
        removeEmployeeFromProject, editEmployee, deleteEmployee } = require('../controllers/admin.controllers')

router.post("/signup", adminSignUp);
router.get("/signin", adminSignIn);
router.post("/newEmployee",verifyAdmin, addNewEmployee);
router.post("/newProject",verifyAdmin, addEmployeeToProject);
router.delete("/removeEmployee/",verifyAdmin, removeEmployeeFromProject);
router.put("/editEmployee/:id",verifyAdmin, editEmployee);
router.delete("/deleteEmployee/:id",verifyAdmin, deleteEmployee);


module.exports = router;
