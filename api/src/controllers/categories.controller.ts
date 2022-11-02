import { Request, Response } from "express";
import prisma from "../db/prisma.db";

const categories = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findMany();

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

const categoryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

const newCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  try {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });
    res.status(200).end();
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  categories,
  categoryById,
  newCategory,
  updateCategory,
  deleteCategory,
};
