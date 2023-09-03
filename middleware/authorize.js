const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  // check if the client sent an auth token
  // verify it
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ success: false, data: null, message: "Unauthorized" });

  jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Forbidden");
    
    req.user = user;
    next();
  });
};


module.exports = authorize;