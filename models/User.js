const { Datatypes } = require("sequelize");
const db = require("../db/conexao");

const User = db.define("User", {
  name: {
    type: Datatypes.STRING,
    allowNull: false,
    require: true,
  },
  email: {
    type: Datatypes.STRING,
    allowNull: false,
    require: true,
  },
  password: {
    type: Datatypes.STRING,
    allowNull: false,
    require: true,
  },
});

module.exports = User;
