import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import routes from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "Success",
  });
});

app.use("/api", routes);

app.listen(config.environments.PORT, () => {
  console.log(`Server is running http://localhost:${config.environments.PORT}`);
});
