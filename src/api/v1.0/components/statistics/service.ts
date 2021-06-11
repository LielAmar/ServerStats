import query from "../../../../database/MySQL";

export class StatisticsService {
  public async loadStatistics(timestamp: number): Promise<object[]> {
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

        const data = await query(`SELECT * FROM \`${tableName}\`;`) as object[];

        return resolve(data);
      } catch(error) {
        console.error(error);

        return reject();
      }
    });
  }

  public updateStatistics(user_identifier: string, user_address: string) {

  }
}