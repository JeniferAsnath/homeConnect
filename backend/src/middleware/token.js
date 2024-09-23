const jwt = require("jsonwebtoken");

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNGYwYTdkMS01ODE1LTRlYjAtYWYwMi1kYTI3NzQ1NmJhYzYiLCJyb2xlIjoiYmFpbGxldXIiLCJiYWlsbGV1cklkIjoiNDI2NmUwMWItOTZiZS00NTk5LWFlZDMtOTA4ZjM2YmU5N2I5IiwiaWF0IjoxNzEyMTczNzk5LCJleHAiOjE3NDM3MDk3OTl9.jFQClQ-Xdij90wqzdmCAF8e8HRbEFMdYD_dsEBOlu-E";
const secretKey = process.env.JWT_SECRET;
jwt.verify(token, 'faehhhhlljdrccdslr', (err, decoded) => {
  if (err) {
    console.error("Erreur lors de la vérification du token :", err);
  } else {
    console.log("Token décodé :", decoded);
  }
});
