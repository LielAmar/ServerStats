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
    https.get(config.game_servers_json_endpoint, { headers: { 'Authorization': config.game_servers_json_auth } },(res) => {
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
 * The authorize middleware for express is checking if there's a token in the requets body, and if so it's matching it to the data cached from the game_servers.json.
 * 
 * If there's a problem with the authentication, return an error to the user, otherwise, set #serverToken and #serverData on the request and call #next to continue with the request
 */
export class Authorization {
  public async authorize(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if(!token) return res.status(400).json(createResponse(false, messages.missingRequestToken())); // If no token was provided

    if(game_servers.last_update === null || game_servers.data === {} || Date.now() - game_servers.last_update > 1800000) await cacheGameServersFile(); // Caching the game_servers.json file

    // Trying to find the matching game server from the game_servers cached data. If no server was found return a failure
    let serverData;

    for(var i = 0; i < game_servers.data.servers.length; i++) {
      if(game_servers.data.servers[i].token === token) {
        // First init of serverData to make sure it doesn't append to an undefined object
        if(!serverData)
          serverData = {};
        
        serverData = game_servers.data.servers[i];
        break;
      }
    }

    // If serverData is undefined, it means there's no server attached to the given token, meaning the token is invalid.
    // In this case, check whether it's the MASTER_TOKEN. If not, return a failed message, otherwise, continue with the request.
    if(!serverData && token !== process.env.MASTER_TOKEN)
      return res.status(404).json(createResponse(false, messages.failedToLoadGameServerData()));

    req.serverToken = token;
    req.serverData = serverData;

    next();
  }
}