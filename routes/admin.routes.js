const express = require("express");
const verifyAdmin = require('../middlewares/verifyToken')
const router = express.Router();
const { adminSignUp, adminSignIn, addNewEmployee, addEmployeeToProject,
        removeEmployeeFromProject, editEmployee, deleteEmployee } = require('../controllers/admin.controllers')

router.post("/admin/signup", adminSignUp);
router.get("/admin/signin", adminSignIn);
router.post("/admin/newEmployee",verifyAdmin, addNewEmployee);
router.post("/admin/newProject",verifyAdmin, addEmployeeToProject);
router.delete("/admin/removeEmployee",verifyAdmin, removeEmployeeFromProject);
router.put("/admin/editEmployee",verifyAdmin, editEmployee);
router.delete("/admin/deleteEmployee",verifyAdmin, deleteEmployee);


module.exports = router;
