import { Request, Response } from "express";
import prisma from "../db/prisma.db";
import bcryptjs from "bcryptjs";
import { upload } from "../services/supabase";

const users = async (req: Request, res: Response) => {
  try {
    const user: any = await prisma.user.findMany();
    const { password, ...others } = user;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

const userById = async (req: Request, res: Response) => {
  try {
    const user: any = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    const { password, ...others } = user;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id) {
    const password = req.body.password;
    const { username, firstname, lastname, role, phone } = req.body;
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      req.body.password = bcryptjs.hashSync(password, salt);
    }
    try {
      const file = req.file;
      let image;
      if (file) {
        image = await upload(file);
      }

      const user = await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
          username,
          password: req.body.password,
          firstname,
          lastname,
          phone,
          role,
          profilePic: image,
        },
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(401).json("You can update only your account");
    }
  }
};
const deleteUser = async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id) {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      try {
        await prisma.wisdom.deleteMany({
          where: {
            username: user.username,
          },
        });
        await prisma.user.delete({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(401).json("You can update only your account");
      }
    } else {
      res.status(401).json("User not found");
    }
  } else {
    res.status(401).json("You can delete only your account");
  }
};

export { users, userById, updateUser, deleteUser };
