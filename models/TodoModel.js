const { DataTypes } = require("sequelize");
const db = require("../db/conexao");

const User = require("./User");

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

TodoModel.belongsTo(User);

User.hasMany(TodoModel)

module.exports = TodoModel;
