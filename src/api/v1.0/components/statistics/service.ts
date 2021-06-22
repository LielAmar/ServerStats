import { getDates } from "../../../../config/utils";

import query from "../../../../database/MySQL";

export class StatisticsService {
  /**
   * Loads statistics from the database
   * 
   * @param timestamp      The timestamp of the date to start the search from
   * @param endTimestamp   The timestamp of the date to stop the search on 
   * @param serverToken    Token of the server to be quried 
   * @returns              A promise with an object representing the data in the database
   */
  public async loadStatistics(timestamp: number, endTimestamp: number, serverToken: string): Promise<object> {
    return new Promise(async (resolve, reject) => {
      if(!query || query === null)
        return reject();

      const startDate = new Date(timestamp);
      const endDate = new Date(endTimestamp);

      // Getting the dates between startDate & endDate
      const dates = getDates(startDate, endDate);

      const results = {} as any;

      // Looping through all dates, quering the correct table of that day, and adding the data to the 'results' variable that is returned.
      await Promise.all(dates.map(async (date) => {
        const day = date.getUTCDate(), 
        month = date.getUTCMonth() + 1,
        year = date.getUTCFullYear();

        const tableName = (day < 10 ? `0${day}` : `${day}`) + "." + (month < 10 ? `0${month}` : `${month}`) + "." + (year < 10 ? `0${year}` : `${year}`);
      
        try {
          await query(`CREATE TABLE IF NOT EXISTS \`${tableName}\` (
            server_token VARCHAR(256) NOT NULL,
            community VARCHAR(256) NOT NULL,
            full_address VARCHAR(256) NOT NULL,
            player_identifier VARCHAR(256) NOT NULL,
            player_address VARCHAR(256) NOT NULL
          )`);
  
          let queryString = `SELECT * FROM \`${tableName}\``;
          if(serverToken !== process.env.MASTER_TOKEN)
            queryString += ` WHERE server_token='${serverToken}';`;
  
          const data = await query(queryString) as object[];
  
          results[date.toUTCString()] = data;
        } catch(error) {
          console.error(error);
        }
      }));

      return resolve(results);
    });
  }

  /**
   * Updates statistics in the database
   * 
   * @param serverToken         Token of the server to be quried
   * @param community           Community of the server
   * @param full_address        Full address of the server
   * @param player_identifier   Identifier of the player
   * @param player_address      Address of the player
   * @returns                   A promise with an object representing the data in the database
   */
  public updateStatistics(serverToken: string, community: string, full_address: string, player_identifier: string, player_address: string): Promise<object[]> {
    return new Promise(async (resolve, reject) => {
      if(!query || query === null)
        return reject();

      const date = new Date(Date.now());
      const day = date.getUTCDate(), 
                  month = date.getUTCMonth() + 1,
                  year = date.getUTCFullYear();

      const tableName = (day < 10 ? `0${day}` : `${day}`) + "." + (month < 10 ? `0${month}` : `${month}`) + "." + (year < 10 ? `0${year}` : `${year}`);

      try {
        await query(`CREATE TABLE IF NOT EXISTS \`${tableName}\` (
          server_token VARCHAR(256) NOT NULL,
          community VARCHAR(256) NOT NULL,
          full_address VARCHAR(256) NOT NULL,
          player_identifier VARCHAR(256) NOT NULL,
          player_address VARCHAR(256) NOT NULL
        )`);

        // Checking whether the player already has an index in the database, if so, reject the update request because it already exists.
        let queryString = `SELECT * FROM \`${tableName}\` WHERE player_identifier='${player_identifier}' AND full_address='${full_address}'`;

        try {
          let results = await query(queryString) as object[];

          if(results.length > 0)
            return reject();

          queryString = `INSERT INTO \`${tableName}\` (server_token, community, full_address, player_identifier, player_address) VALUES ('${serverToken}', '${community}', '${full_address}', '${player_identifier}', '${player_address}')`;

          const data = await query(queryString) as object[];

          return resolve(data);
        } catch(error) {
          console.error(error);

          return reject();
        }
      } catch(error) {
        console.error(error);

        return reject();
      }
    });
  }
}