import { Router, Request, Response } from "express";
import { authRouter } from "./auth.route";
import { categoryRouter } from "./categories.route";
import { userRouter } from "./users.route";
import { wisdomRouter } from "./wisdoms.route";
import multer from "multer";
import { uploadRouter } from "./upload.route";

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 10e6,
  },
});

const routes = Router();

routes
  .use("/category", categoryRouter)
  .use("/auth", authRouter)
  .use("/user", Multer.single("profilePic"), userRouter)
  .use("/wisdom", Multer.single("image"), wisdomRouter)
  .use("/upload", Multer.single("image"), uploadRouter);
// .post("/upload", Multer.single("image"), (req: Request, res: Response) => {

// });

export default routes;
