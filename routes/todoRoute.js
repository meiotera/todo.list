const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/TodoController");

// router.get("/add", TodoController.createTodo);
router.post("/add", TodoController.createTodoPost);

module.exports = router;
