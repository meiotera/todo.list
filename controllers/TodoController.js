const TodoModel = require("../models/TodoModel");

module.exports = class TodoController {
  static async showTodo(req, res) {
    const todoData = await TodoModel.findAll({
      attributes: ["title", "concluded", "createdAt", "id"],
    });

    const resultData = todoData.map((data) => {
      let todo = data.dataValues;

      const ano = todo.createdAt.getFullYear();
      const dia = todo.createdAt.getDate();
      const mes = todo.createdAt.getMonth();
      const dataDeCriacao = `${dia}/${mes}/${ano}`;

      return {
        id: todo.id,
        title: todo.title,
        concluded: todo.concluded,
        dataDeCriacao,
      };
    });

    console.log(resultData)
    res.render("partials/todo", { resultData });
  }

  static async createTodoPost(req, res) {
    if (req.body.title === "") {
      req.flash("message", "Nao pode estar em branco");
      res.redirect("/");
      return;
    }

    const todo = {
      title: req.body.title,
      concluded: false,
    };

    try {
      await TodoModel.create(todo);
      res.redirect("/");
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
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
};
