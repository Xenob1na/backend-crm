import { User } from "../models/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import "dotenv/config";
import router from "../routes/routes.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Пароль должен содержать не менее 6 символов" });
    }

    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return res.status(200).json({ message: "Пользователь создан" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Пожалуйста, введите все поля" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Пользователь не существует" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Пароль должен содержать не менее 6 символов" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(400).json({ message: "Неверные пароль или почта" });
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
      algorithm: "HS256",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
      message: "Успешная авторизация",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(422).json({
        message: "Please provide the token",
      });
    }

    const theToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(theToken, process.env.TOKEN_SECRET);

    const user = await User.findOne({ where: { id: decoded.id } });
    

    console.log(user);
    return res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
    
    return res.status(200).json({ message: "Logout success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
