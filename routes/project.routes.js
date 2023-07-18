const express = require("express");
const { addProject, getProjects } = require("../controllers/project.controllers");
const router = express.Router();

router.post("/add", addProject);
router.get("/all", getProjects);

module.exports = router;