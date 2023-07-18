const User = require("../models/user.model");
const Company = require("../models/company.model");
const Project = require("../models/projects.model");
const jwt = require("jsonwebtoken");
const { createCustomError } = require("../middlewares/customError");


exports.employeeSignIn = async (req, res) => {

    const { email, password, role } = req.body;

    if (email === undefined && password === undefined && role === undefined) {
        throw createCustomError("Email or passwrod is required!", 400);
    }

    if (email === null && password === null && role === null) {
        throw createCustomError("Email or passwrod is required!", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw createCustomError("Invalid email!", 400);
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
        throw createCustomError("Invalid password!", 400);
    }

    const accessToken = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return res.status(201).json({
        message: "Employee sign-in successful!",
        accessToken
    });
}

exports.viewProfile = async (req, res) => {

    const { id } = req.params;

    if (id === undefined || id === "") {
        throw createCustomError("Invalid ID", 400)
    }

    const employeeProfile = await User.findById(id, '-password').populate('company'.companyName);
    if (!employeeProfile) {
        throw createCustomError("User not found", 400);
    }

    res.status(201).send(employeeProfile);
}

exports.viewProjects = async (req, res) => {
    const { employeeEmail } = req.params

    if (employeeEmail === undefined || employeeEmail === "") {
        throw createCustomError("Invalid email", 400)
    }

    const employee = await Project.findOne({ employeeEmail });
    if (!employee) {
        throw createCustomError("Employee does not exist!", 400);
    }

    const projects = await Project.find({ employeeEmail }, 'projectName')

    return res.status(201).json({
        message: "Your projects",
        projects
    });
}

exports.projectTeammates = async (req, res) => {

    const { projectName } = req.params

    if (projectName === undefined || projectName === "") {
        throw createCustomError("Invalid email", 400)
    }

    const projects = await Project.findOne({ projectName });
    if (!projects) {
        throw createCustomError("Invalid project!", 400);
    }

    const teammates = await Project.find({ projectName }, 'employeeName')

    return res.status(201).json({
        message: "Project Team-mates",
        teammates
    });
}

exports.allEmployees = async (req, res) => {

    const allEmployees = await User.find({}, 'name company').populate('company');
    if (allEmployees) {
        res.status(201).send(allEmployees);
    } else {
        throw createCustomError("Employess not found", 400);
    }
}