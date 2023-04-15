import express from "express";
import { DNDRouter } from "./routes/DND.router";

const app = express();
const port = "3000";

export function initExpress() {
  app.use("/DND", DNDRouter);

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}
