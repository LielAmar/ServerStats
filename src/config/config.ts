import dotenv from "dotenv";

const __production__ = process.env.ENVIRONMENT === "production";

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_HTTP_PORT = process.env.SERVER_HTTP_PORT;
const SERVER_HTTPS_PORT = process.env.SERVER_HTTPS_PORT;

const GAME_SERVERS_ENDPOINT = process.env.GAME_SERVERS_ENDPOINT;
const GAME_SERVERS_ENDPOINT_AUTHORIZATION = process.env.GAME_SERVERS_ENDPOINT_AUTHORIZATION;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  httpPort: SERVER_HTTP_PORT,
  httpsPort: SERVER_HTTPS_PORT
}

interface IConfig {
  __production__: boolean
  server: any
  game_servers_json_endpoint: string
  game_servers_json_auth: string
}

export const config = {
  __production__,
  server: SERVER,
  game_servers_json_endpoint: GAME_SERVERS_ENDPOINT,
  game_servers_json_auth: GAME_SERVERS_ENDPOINT_AUTHORIZATION
} as IConfig

export default () => {
  dotenv.config();

  console.debug = (message) => {
    if(process.env.ENVIRONMENT === "testing")
      process.stdout.write(`[DEBUG] ${message}\n`);
  }
}