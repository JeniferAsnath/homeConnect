const express = require("express");
const router = express.Router();
const postUserController = require("../controller/postcontroller/postpostUserController.js");

router.get("/", postUserController.getAllPost);
router.get("/post/:id", postUserController.getPostById);
router.post("/post", postUserController.createPost);
router.put("/post/:id", postUserController.updatePost);
router.delete("/post/:id", postUserController.deletePost);

module.exports = router;
