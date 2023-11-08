module.exports = class TodoController {
  static showTodo(req, res) {
    res.render("partials/todo");
  }
};
