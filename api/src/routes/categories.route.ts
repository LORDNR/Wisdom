import { Router } from "express";
import {
  categories,
  categoryById,
  newCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categories.controller";
export const categoryRouter = Router();

categoryRouter
  .get("/", categories)
  .get("/:id", categoryById)
  .post("/", newCategory)
  .put("/:id", updateCategory)
  .delete("/:id", deleteCategory);
