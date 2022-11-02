import { Request, Response } from "express";
import prisma from "../db/prisma.db";
import { upload } from "../services/supabase";

const wisdoms = async (req: Request, res: Response) => {
  const username: any = req.query.user;
  const catName: any = req.query.cat;

  try {
    let wisdoms;
    if (username) {
      wisdoms = await prisma.wisdom.findMany({
        where: {
          username,
        },
      });
    } else if (catName) {
      wisdoms = await prisma.wisdom.findMany({
        where: {
          category: catName,
        },
      });
    } else {
      wisdoms = await prisma.wisdom.findMany();
    }
    res.status(200).json(wisdoms);
  } catch (err) {
    res.status(500).json(err);
  }
};

// const wisdoms = async (req: Request, res: Response) => {
//   try {
//     const wisdom = await prisma.wisdom.findMany();

//     res.status(200).json(wisdom);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const wisdomById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const wisdom = await prisma.wisdom.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(wisdom);
  } catch (err) {
    res.status(500).json(err);
  }
};

const newWisdom = async (req: Request, res: Response) => {
  const { name, detail, username, category } = req.body;
  let image = null;
  const file = req.file;
  if (file) {
    image = await upload(file);
  }
  try {
    const wisdom = await prisma.wisdom.create({
      data: {
        name,
        detail,
        image,
        username,
        category,
      },
    });
    res.status(201).json(wisdom);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateWisdom = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, detail, category } = req.body;
  const file = req.file;
  let image;
  if (file) {
    image = await upload(file);
  }

  try {
    const wisdom = await prisma.wisdom.findUnique({
      where: {
        id,
      },
    });
    if (wisdom?.username === req.body.username) {
      try {
        const updateWisdom = await prisma.wisdom.update({
          where: {
            id,
          },
          data: {
            name,
            detail,
            image,
            category,
          },
        });
        res.status(200).json(updateWisdom);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your wisdom ");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteWisdom = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const wisdom = await prisma.wisdom.findUnique({
      where: {
        id,
      },
    });
    if (wisdom?.username === req.body.username) {
      try {
        await prisma.wisdom.delete({
          where: {
            id,
          },
        });
        res.status(200).json("Wisdom has been delete...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your wisdom ");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export { wisdoms, wisdomById, newWisdom, updateWisdom, deleteWisdom };
