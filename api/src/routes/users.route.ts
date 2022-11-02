import { Router } from "express";
import {
  deleteUser,
  updateUser,
  userById,
  users,
} from "../controllers/users.controller";

export const userRouter = Router();

userRouter
  .get("/", users)
  .get("/:id", userById)
  .put("/update/:id", updateUser)
  .delete("/delete/:id", deleteUser);
