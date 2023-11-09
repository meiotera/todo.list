const { DataTypes } = require("sequelize");
const db = require("../db/conexao");

const TodoModel = db.define("Todo", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  concluded: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = TodoModel;
