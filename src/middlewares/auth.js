const jwt = require("jsonwebtoken");
//Authentication JWT
//Identify of the users are checked for providing access to the system (Login)
const validateToken = function(req, res, next) {

      let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    //If no token is present in the request header return error
    if (!token) return res.status(500).send({ status: false, msg: "token must be present" });
    let decodedToken = jwt.verify(token, "functionUp-plutonium-very-very-secret-key");
    if (!decodedToken) {
      return res.status(400).send({ status: false, msg: "token is invalid" });
    }
    req.loggedInUser = decodedToken.userId //used in authorization
    next()
}


//Authorization 
//Users authorities are checked for accessing the resource
const checkAuthorized = function (req, res, next) {
  let requestedUserId = req.params.userId
  if(requestedUserId !== req.loggedInUser){
     return res.status(400).send({status: false, msg: "Permission denied"})
  }
  next();
}

module.exports.validateToken = validateToken
module.exports.checkAuthorized = checkAuthorized