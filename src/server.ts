import path from "path";

import express from "express";

import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

import errors from "./common/errors";

import { config } from "./config/config";

import api_v1_0 from "./api/v1.0/api";

const router = express();

router.use((req, res, next) => {
  res.on("finish", () => console.debug(`METHOD: [${req.method}] - URL: [${req.baseUrl}] - IP: [${req.ip}] - STATUS: [${res.statusCode}]`));
  next();
});

router.use(express.static(path.join(__dirname, "..", "public")));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(cookieParser());
router.use(compression());
router.use(helmet({ contentSecurityPolicy: false }));

/** Routes to handle endpoints */
router.use("/v1.0/", api_v1_0);

router.use(errors);

router.listen(config.server.httpsPort, () => console.debug(`Statistics API is running of ${config.server.hostname}:${config.server.httpsPort}`));