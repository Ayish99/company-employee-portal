const Project = require("../models/projects.model");
const Company = require("../models/company.model");
const { createCustomError } = require("../middlewares/customError");

exports.addProject = async (req, res) => {
    const { projectName, description, company } = req.body;
  
    if (projectName === undefined || projectName === null) {
      throw createCustomError("Invalid project name!", 400);
    }

    if (description === undefined || description === null) {
        throw createCustomError("Invalid description!", 400);
      }

    if (company === undefined || company === null) {
        throw createCustomError("Invalid company!", 400);
      }
      const companyExist = await Company.findOne({company});

      console.log(companyExist);
    
      if(!companyExist){
        throw createCustomError("Company doesn't exist", 400);
      }

    const newProject = new Project();

    newProject.projectName = projectName;
    newProject.description = description;
  
   const project =  await newProject.save();
  
    return res.status(201).json({
      message: "Successfully added!",
      project
    });
  }

  exports.getProjects = async (req, res) => {
    const projects = await Project.find().populate('employees', '-password')
  
    return res.status(201).json({
      message: "Successfully added!",
      projects
    });
  }