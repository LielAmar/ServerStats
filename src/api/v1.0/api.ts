import express from "express";

import { StatisticsRoutes } from "./components/statistics/routes";

const router = express.Router();

/**
 * Default route to display general info on the api version
 */
router.get("/", (_req, res) => res.json({
  apiVersion: "1.0"
}));

/**
 * Main route to handle statistics endpoints
 */
router.use("/statistics", new StatisticsRoutes().router);

export default router;