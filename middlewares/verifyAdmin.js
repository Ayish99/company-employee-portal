const jwt = require("jsonwebtoken");
const { createCustomError } = require("./customError");

const verifyAdmin = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      throw createCustomError("access denied, token missing!", 400);
    }

    // `Authorozation: Bearer <token>`
    if (req.headers.authorization.split(" ")[0] !== "Bearer") {
      throw createCustomError("access denied, provide token with Bearer convention!", 400);
    }

    if (req.headers.authorization.split(" ")[1] === null) {
      throw createCustomError("access denied, token cannot be null!", 400);
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.email = decoded.email;
    req.role = decoded.role;

    if (req.role !== 'admin') {
      throw createCustomError("access denied, you must be an admin!", 400);
    }
    else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      message: error?.message ?? "something went wrong!",
    });
  }
};

module.exports = verifyAdmin;
