const jwt = require("jsonwebtoken");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyVHlwZSI6InZpc2l0b3IiLCJpYXQiOjE3MTE2OTE3OTYsImV4cCI6MTcxMTY5NTM5Nn0.1a9z_43UZj_wDi614M1RgSeu3kU-Y60acexCoaxSloE"; // Remplacez par votre token JWT
const secretKey = process.env.JWT_SECRET;
jwt.verify(token, 'hello', (err, decoded) => {
  if (err) {
    console.error("Erreur lors de la vérification du token :", err);
  } else {
    console.log("Token décodé :", decoded);
  }
});
