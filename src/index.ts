import express, { Application, Request, Response } from "express";
import cors from "cors";
import { env } from "./app/config";
import router from "./app/routes/route";

const app: Application = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: "Pathao API health checks",
    date: new Date(),
  });
});

app.listen(env.PORT, () => {
  console.log(`Running port is: http://localhost:${env.PORT}`);
});

app.use(router);

export default app;
