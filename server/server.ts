import * as express from "express";
import next from "next";
const cookieParser = require("cookie-parser");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client/" });
const handle = app.getRequestHandler();
const port = process.env.PORT || 4000;
(async () => {
  try {
    await app.prepare();
    const server = express();
    const routes = require("./routes");
    var json: object = require("./../env")(process.env.NODE_ENV);
    Object.keys(json).forEach((k) => {
      process.env[k] = json[k];
    });
    server.use(express.json());
    server.use(cookieParser());
    server.use("/", routes);

    server.use("/joint/", express.static("./server/public/"));
    server.use((req: express.Request, res: express.Response, next) => {
      const { originalUrl, url } = req;
      var STATIC_FOLDS = [
        "/_next",
        "/assets",
        "/styles",
        "/joint",
        "/api",
        "/login",
        "/auth",
        "/util",
      ];

      var loginRequired = true;
      STATIC_FOLDS.forEach((st) => {
        if (originalUrl.startsWith(st)) {
          loginRequired = false;
        }
      });

      next();
    });
    server.all("*", (req: express.Request, res: express.Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(
        `> Ready on localhost:${port} - env ${process.env.NODE_ENV} \n`
      );
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
