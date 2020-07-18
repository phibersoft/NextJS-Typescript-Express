import { Request, Response } from "express";
const express = require("express");
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: false, dir: "./client/" });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.get("/hi", async (req, res, next) => {
      res.json({ hi: 1 });
    });
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
