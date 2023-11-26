const express = require("express");
const exphbs = require("express-handlebars");
const conexao = require("./db/conexao");
const session = require("express-session");

const flash = require("express-flash");

const TodoModel = require("./models/TodoModel");
const todoRoute = require("./routes/todoRoute");
const autRouter = require("./routes/autRouter");

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

// session midleware
// Configuração do middleware de sessão
app.use(
  session({
    secret: "seuSegredo",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

app.use(flash());
app.use(express.json());
app.use(express.static("public"));

// import Controllers
const TodoController = require("./controllers/TodoController");

app.use("/", autRouter);
app.use("/todo", todoRoute);
app.get("/todo", TodoController.showTodo);

app.use((req, res, next) => {
  res.status(404).render("partials/error404");
});

conexao
  // .sync({force: true})
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => console.log(error));
