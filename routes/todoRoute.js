const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/TodoController");

router.get("/add", TodoController.showTodo);
router.post("/add", TodoController.createTodoPost);
router.post("/concluido", TodoController.concluded);

module.exports = router;
