const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static auth(req, res) {
    res.render("partials/authenticator");
  }

  static async createAccountPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    const errors = [];

    Object.keys(req.body).forEach((key) => {
      if (req.body[key].trim() === "") {
        errors.push("Não deixe campos em vazios!");
      }
    });

    if (password !== confirmPassword) {
      errors.push("Senhas não conferem!");
    }

    if (errors.length > 0) {
      errors.forEach((erro) => {
        req.flash("message", erro);
      });

      res.render("partials/authenticator");

      return;
    }

    // Verificando se usuario existe
    const checkUserExists = await User.findOne({ where: { email } });

    if (checkUserExists) {
      req.flash("message", "E-mail já cadastrado!");
      res.render("partials/authenticator");

      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPasword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPasword,
    };

    try {
      const createdUser = await User.create(user);

      req.session.userid = createdUser.id;

      req.flash("message", "cadastro realizado!");

      req.session.save(() => {
        res.redirect("/todo");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async loginPost(req, res) {
    const { loginEmail, loginPassword } = req.body;

    const user = await User.findOne({ where: { email: loginEmail } });

    if (!user) {
      req.flash("message", "Usuário não encontrado!");
      res.render("partials/authenticator");

      return;
    }

    const passwordMatch = bcrypt.compareSync(loginPassword, user.password);

    if (!passwordMatch) {
      req.flash("message", "Senha incorreta!");
      res.render("partials/authenticator");

      return;
    }

    req.session.userid = user.id;

    req.session.save(() => {
      res.redirect("/todo");
    });
  }
};
