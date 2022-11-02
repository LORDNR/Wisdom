import { Router } from "express";
import { uploadFile } from "../controllers/upload.controller";

export const uploadRouter = Router();

uploadRouter.post("/", uploadFile);
