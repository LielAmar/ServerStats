import { Router } from "express";

import { Authorization } from "../../middleware/Authorization";
import { StatisticsController } from "./controller";

export class StatisticsRoutes {
  private readonly authorization: Authorization = new Authorization();
  private readonly controller: StatisticsController = new StatisticsController();
  private readonly _router: Router = Router();

  public constructor() {
    // Initializing child routes first to handle specific requests before main requests.
    this.initChildRoutes();
    this.initRoutes();
  }

  public get router(): Router {
		return this._router;
	}

  /**
   * Initializing all child routes of the statistics component
   * 
   * Explanation: router.<METHOD>(<ENDPOINT>, [...<MIDDLEWARES>], <HANDLER>)
   */
  private initChildRoutes(): void {}

  /**
   * Initializing all routes of the statistics component
   * 
   * Explanation: router.<METHOD>(<ENDPOINT>, [...<MIDDLEWARES>], <HANDLER>)
   */
  private initRoutes(): void {
    /** Loads statistics of today */
    this._router.get("/",
      (req, res, next) => this.authorization.authorize(req, res, next),
      this.controller.loadStatistics.bind(this.controller)
    );

    /** Loads statistics of the given timestamp */
    this._router.get("/:timestamp",
      (req, res, next) => this.authorization.authorize(req, res, next),
      this.controller.loadStatistics.bind(this.controller)
    );

    /** Update statistics of today */
    this._router.put("/",
      (req, res, next) => this.authorization.authorize(req, res, next),
      this.controller.updateStatistics.bind(this.controller)
    );
  }
}