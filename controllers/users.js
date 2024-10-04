const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import bcrypt from '@bcrypt'

/**
@route POST /api/user/login
@desc login
@access Public
*/

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill require fields" });
    }
    const user = await prisma.user.findFirst({
      where: { email },
    });

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1d" }),
      });
    } else {
      return res.status(400).json({ message: "Wrong login or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Wrong login or password" });
  }
};

/**
@route POST /api/user/registration
@desc Register
@access Public
*/

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please fill require fields" });
    }

    const registeredUser = await prisma.user.findFirst({
      where: { email },
    });

    if (registeredUser) {
      res.status(400).json({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1d" }),
      });
    } else {
      return res.status(400).json({ message: "User did not create" });
    }
  } catch (error) {
    return res.status(500).json({ message: "User did not create" });
  }
};

/**
@route Get /api/user/current
@desc Current user
@access Protected
*/

const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
