import dotenv from "dotenv";
       dotenv.config();

const __production__ = process.env.ENVIRONMENT === "production";

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_HTTP_PORT = process.env.SERVER_HTTP_PORT;
const SERVER_HTTPS_PORT = process.env.SERVER_HTTPS_PORT;

const GAME_SERVERS_ENDPOINT = process.env.GAME_SERVERS_ENDPOINT;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  httpPort: SERVER_HTTP_PORT,
  httpsPort: SERVER_HTTPS_PORT
}

interface IConfig {
  __production__: boolean
  server: any
  game_servers_json_endpoint: string
}

const config = {
  __production__,
  server: SERVER,
  game_servers_json_endpoint: GAME_SERVERS_ENDPOINT
} as IConfig

export default config;