const jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      throw Error("access denied, token missing!");
    }

    // `Authorozation: Bearer <token>`
    if (req.headers.authorization.split(" ")[0] !== "Bearer") {
      throw Error("access denied, provide token with Bearer convention!");
    }

    if (req.headers.authorization.split(" ")[1] === null) {
      throw Error("access denied, provide token cannot be null!");
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.email = decoded.email;
    req.role = decoded.role;

    if (req.role !== 'admin') {
      throw Error("access denied, you must be an admin!");
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