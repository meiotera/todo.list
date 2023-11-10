const TodoModel = require("../models/TodoModel");

module.exports = class TodoController {
  static async showTodo(req, res) {
    const todoData = await TodoModel.findAll({
      attributes: ["title", "concluded", "createdAt"],
    });

    const resultData = todoData.map((data) => {
      const todo = data.dataValues;

      const ano = todo.createdAt.getFullYear();
      const dia = todo.createdAt.getDate();
      const mes = todo.createdAt.getMonth();
      const dataDeCriacao = `${dia}/${mes}/${ano}`;
    
      return {
        title: todo.title,
        concluded: todo.concluded,
        dataDeCriacao,
      };
    });

    res.render("partials/todo", { resultData });
  }

  static async createTodoPost(req, res) {
    if (req.body.title === "") {
      res.redirect("/");
      return
    }

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
