import { Request, Response, NextFunction } from "express";

import { createResponse } from "../../../../config/response";
import { messages } from "../../../../config/global";

import { StatisticsService } from "./service";

export class StatisticsController {
  private readonly service: StatisticsService = new StatisticsService();

  /**
   * Loads statistics of today
   * 
   * @req    Request object
   * @res    Response object
   * @next   Next function
   * @return JSON response
   */
  public async loadStatistics(req: Request, res: Response, next: NextFunction) {
    if(!req.serverToken || !req.serverData) return res.status(400).json(createResponse(false, messages.failedToLoadGameServerData()));

    const { timestamp } = req.body;

    const statistics = this.service.loadStatistics(timestamp);
    return res.status(200).json(createResponse(true, messages.successfullyLoadedStatistics(new Date()), statistics));
  }

  /**
   * Updates statistics of today
   * 
   * @req    Request object
   * @res    Response object
   * @next   Next function
   * @return JSON response
   */
  public async updateStatistics(req: Request, res: Response, next: NextFunction) {
    if(!req.serverToken || !req.serverData) return res.status(400).json(createResponse(false, messages.failedToLoadGameServerData()));

    const { user_identifier, user_address } = req.body;
    if(!user_identifier || !user_address) return res.status(400).json(createResponse(false, messages.missingOneOrMoreFields()));

    this.service.updateStatistics(user_identifier, user_address);
    return res.status(200).json(createResponse(true, messages.successfullyUpdatedStatistics(), null));
  }
}