import { Request, Response } from "express";
import prisma from "../db/prisma.db";
import { upload } from "../services/supabase";

const uploadFile = async (req: Request, res: Response) => {
  let image = null;
  const file = req.file;
  if (file) {
    image = await upload(file);
  }
  res.status(201).json({ image: image });
};

export { uploadFile };
