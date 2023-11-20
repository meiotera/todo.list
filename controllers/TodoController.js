const TodoModel = require("../models/TodoModel");
const User = require("../models/User");

module.exports = class TodoController {
  static async showTodo(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: {
        id: userId,
      },

      include: TodoModel,
      plain: true,
    });

    const resultData = user.Todos.map((result) => result.dataValues);

    res.render("partials/todo", { resultData });
  }

  static async createTodoPost(req, res) {
    if (req.body.title === "") {
      req.flash("message", "Nao pode estar em branco");
      res.redirect("/todo");
      return;
    }

    const todo = {
      title: req.body.title,
      UserId: req.session.userid,
      concluded: false,
    };

    try {
      await TodoModel.create(todo);
      req.session.save(() => {
        res.redirect("/todo");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async concluded(req, res) {
    const id = req.body.id;

    const todos = {
      concluded: true,
    };

    console.log(todos);
    try {
      await TodoModel.update(todos, { where: { id: id } });

      req.flash("message", "Concluido");
      res.redirect("/todo");
    } catch (error) {
      console.log(error);
    }
  }
};
