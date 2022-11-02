/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import prisma from "../db/prisma.db";
import bcryptjs from "bcryptjs";
import { User } from "@prisma/client";

const register = async (req: Request, res: Response) => {
  const { username, email, firstname, lastname, phone, role }: User = req.body;
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = bcryptjs.hashSync(await req.body.password, salt);

  try {
    const isUserAlreadyRegistered = await prisma.user.findUnique({
      where: { username },
    });
    const isEmailAlreadyRegistered = await prisma.user.findUnique({
      where: { email },
    });

    if (isUserAlreadyRegistered) {
      return res.status(409).json({
        error: "Username already exists",
      });
    } else if (isEmailAlreadyRegistered) {
      return res.status(409).json({
        error: "Email already exists ",
      });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email: email.toLocaleLowerCase(),
        password: hashPassword,
        firstname,
        lastname,
        phone,
        role,
      },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        firstname: true,
        lastname: true,
        phone: true,
        role: true,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const user: any = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      const validated = await bcryptjs.compare(
        req.body.password,
        user.password
      );
      if (validated) {
        const { password, ...others } = user;
        res.status(200).json(others);
      } else res.status(400).json("Invalid password");
    } else {
      res.status(400).json("Invalid username");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export { register, login };
