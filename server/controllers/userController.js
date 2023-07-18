const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Incorrect email or password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.forbidden("User with this email already exists"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword });
    const token = generateJwt(user.id, user.email);
    return res.json({ id: user.id, token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("User is not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.forbidden("Wrong password specified"));
    }
    const token = generateJwt(user.id, user.email);
    return res.json({ id: user.id, token });
  }

  async check(req, res, next) {
    let userExist = false;
    let id = 0;
    const user = await User.findOne({
      where: { id: req.user.id, email: req.user.email },
    });
    if (user) {
      userExist = true;
      id = req.user.id;
    }
    return res.json({ id, userExist });
  }
}

module.exports = new UserController();
