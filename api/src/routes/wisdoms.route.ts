import { Router } from "express";
import {
  deleteWisdom,
  newWisdom,
  updateWisdom,
  wisdomById,
  wisdoms,
} from "../controllers/wisdoms.controller";

export const wisdomRouter = Router();

wisdomRouter
  .get("/", wisdoms)
  .get("/:id", wisdomById)
  .post("/", newWisdom)
  .put("/:id", updateWisdom)
  .delete("/:id", deleteWisdom);
