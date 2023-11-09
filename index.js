const express = require("express");
const exphbs = require("express-handlebars");
const conexao = require("./db/conexao");

const TodoModel = require("./models/TodoModel");
const todoRoute = require("./routes/todoRoute");

const app = express();

const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));

// import Controllers
const TodoController = require("./controllers/TodoController");

app.use("/todo", todoRoute);
// app.use("/")
app.get("/", TodoController.showTodo);

conexao
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => console.log(error));
