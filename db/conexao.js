const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("todos", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

try {
  sequelize.authenticate();
  console.log("conectado com sucesso!");
} catch (error) {
  console.log("Não foi póssivel conectar");
}

module.exports = sequelize;
