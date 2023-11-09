const TodoModel = require("../models/TodoModel");

module.exports = class TodoController {
  static showTodo(req, res) {
    res.render("partials/todo");
  }

  static async createTodoPost(req, res) {
    const todo = {
      title: req.body.title,
    };

    try {
      await TodoModel.create(todo);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
};
