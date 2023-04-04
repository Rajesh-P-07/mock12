require("dotenv").config();
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.headers.auth;
  jwt.verify(token, process.env.key, function (err, decoded) {
    if (err) {
      console.log(err);
      res.send("error in token");
    } else {
      req.body.name = decoded.name;
      req.body.email = decoded.email;
      next();
    }
  });
};

module.exports = { authorization };
