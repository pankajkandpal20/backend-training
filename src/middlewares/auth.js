const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const headerMiddle = async function (req, res, next) {
  let token = req.headers["x-Auth-token"] || req.headers["x-auth-token"];

  if (!token) res.send({ status: false, msg: "Token must be present" });

  let decodedToken = jwt.verify(token, "functionUp-plutonium");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });


  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.send("No such user exists");
  }

  next();
};

module.exports.headerMiddle = headerMiddle;