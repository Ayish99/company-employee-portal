const express = require("express");
const { addCompany, getCompanies } = require("../controllers/company.controllers");
const router = express.Router();

router.post("/add", addCompany);
router.get("/getCompanies", getCompanies)

module.exports = router;
