const jwt = require("jsonwebtoken");
//Authentication JWT
//Identify of the users are checked for providing access to the system (Login)
const validateToken = function(req, res, next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
    console.log(token);
    
    // If a token is present then decode the token with verify function
    // verify takes two inputs:
    // Input 1 is the token to be decoded
    // Input 2 is the same secret with which the token was generated
    // Check the value of the decoded token yourself
    let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
    if (!decodedToken) {
      return res.send({ status: false, msg: "token is invalid" });
    }
    req.loggedInUser = decodedToken.userId
    next()
}
//Authorization 
//Users authorities are checked for accessing the resource
const checkAuthorized = function (req, res, next) {
  let requestedUserId = req.params.requestedUserId
  if(requestedUserId != req.loggedInUser){
     return res.send({status: false, msg: "Permission denied"})
  }
  next();
}

module.exports.validateToken = validateToken
module.exports.checkAuthorized = checkAuthorized