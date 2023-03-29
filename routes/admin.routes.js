const express = require("express");
const verifyAdmin = require('../middlewares/verifyToken')
const router = express.Router();
const { adminSignUp, adminSignIn, addNewEmployee, addEmployeeToProject,
        removeEmployeeFromProject, editEmployee, deleteEmployee } = require('../controllers/admin.controllers')

router.post("/admin/signup", adminSignUp);
router.get("/admin/signin", adminSignIn);
router.post("/admin/newEmployee",verifyAdmin, addNewEmployee);
router.post("/admin/newProject", addEmployeeToProject);
router.delete("/admin/removeEmployee", removeEmployeeFromProject);
router.put("/admin/editEmployee", editEmployee);
router.delete("/admin/deleteEmployee", deleteEmployee);


module.exports = router;
