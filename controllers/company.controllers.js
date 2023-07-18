const Company = require("../models/company.model");
const { createCustomError } = require("../middlewares/customError");

exports.addCompany = async (req, res) => {
  const { companyName } = req.body;

  if (companyName === undefined || companyName === null) {
    throw createCustomError("Invalid companyName!", 400);
  }

  const newCompany = new Company();

  newCompany.companyName = companyName;

  const company = await newCompany.save();

  return res.status(201).json({
    message: "Successfully added!",
    company
  });
}

exports.getCompanies = async (req, res) => {
  const companies = await Company.find()

  return res.status(201).json({
    message: "Successfully fetched!",
    companies
  });
}