import query from "../../../../database/MySQL";

export class StatisticsService {
  public async loadStatistics(timestamp: number, serverToken: string): Promise<object[]> {
    return new Promise(async (resolve, reject) => {
      if(!query || query === null)
        return reject();

      const date = new Date(timestamp);
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

        return resolve(data);
      } catch(error) {
        console.error(error);

        return reject();
      }
    });
  }

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

        let queryString = `INSERT INTO \`${tableName}\` (server_token, community, full_address, player_identifier, player_address)
                                                 VALUES ('${serverToken}', '${community}', '${full_address}', '${player_identifier}', '${player_address}')`;

        const data = await query(queryString) as object[];

        return resolve(data);
      } catch(error) {
        console.error(error);

        return reject();
      }
    });
  }
}