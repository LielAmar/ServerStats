import dateFormat from "dateformat";

const messages = {
  successfullyLoadedStatistics: (date: Date): string => `Successfully loaded Statistics for ${ dateFormat(date, "dddd, mmmm dS, yyyy, hh:MM:ss TT")}`,
  successfullyUpdatedStatistics: (): string => `Successfully updated Statistics`,
  missingRequestToken: (): string => `Missing Request Token`,
  failedToLoadGameServerData: (): string => `Failed to load game server data`,
  missingOneOrMoreFields: (): string => `Missing one or more fields in your request`,
  failedToLoadStatistics: (): string => `The server failed to load statistics`
}

export { messages }