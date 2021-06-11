import https from "https";

import { Request, Response, NextFunction } from "express";

import config from "../../../config/config";
import { messages } from "../../../config/global";
import { createResponse } from "../../../config/response";

interface IGameServer {
  last_update: number
  data: any
}

const game_servers = <IGameServer> {
  last_update: 0,
  data: {}
}

/**
 * Caches the data from the game_servers.json file
 * @returns 
 */
const cacheGameServersFile = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    https.get(config.game_servers_json_endpoint, (res) => {
      let data = "";
  
      res.on("data", (chunk) => data += chunk);
  
      res.on("end", () => {
        game_servers.last_update = Date.now();
        game_servers.data = JSON.parse(data);
        
        return resolve();
      });
    }).on("error", (error) => reject(error));
  });
}


/**
 * Authorization class to handle the auth part of certain requests
 * The authorize middleware for express is checking if we have a token in the requets body, and if so it's matching it to the data we cache from game_servers.json.
 * 
 * If there's a problem with the authentication, we return an error to the user, otherwise, we set #serverToken and #serverData on our request and call #next to continue with the request
 */
export class Authorization {
  public async authorize(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if(!token) return res.status(400).json(createResponse(false, messages.missingRequestToken())); // If no token was provided

    if(game_servers.last_update === null || game_servers.data === {} || Date.now() - game_servers.last_update > 1800000) await cacheGameServersFile(); // Caching the game_servers.json file

    // Trying to find the matching game server from the game_servers cached data. If no server was found we return a failure
    let serverData = {};

    for(var i = 0; i < game_servers.data.servers.length; i++) {
      if(game_servers.data.servers[i].token === token) {
        serverData = game_servers.data.servers[i];
        break;
      }
    }

    if(serverData === {}) return res.status(404).json(createResponse(false, messages.failedToLoadGameServerData()));

    req.serverToken = token;
    req.serverData = game_servers.data.servers;

    next();
  }
}