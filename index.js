const express = require('express');
require("express-async-errors");
const connectTODB = require('./utils/db');
const customErrorHandler = require("./middlewares/customErrorHandler");
const adminRoutes = require("./routes/admin.routes");
const employeeRoutes = require("./routes/employee.routes");
const companyRoutes = require("./routes/company.routes");
const projectRoutes = require("./routes/project.routes");


const app = express();

app.use(express.json());

//APIs
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/project", projectRoutes);


//Catch errors
app.use(customErrorHandler);

const startServer = async() => {
    try {
        await connectTODB();
        app.listen(4000, () => console.log("Server started"));
    } catch (error) {
        if(error === 8000){
            console.log('Database auth faild, failed to connect DB');
        }
        else{
            console.log(error);
        }
    }

}

startServer();

