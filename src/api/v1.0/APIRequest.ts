import { Request } from "express";

interface ServerData {
  community: string
  game: string
  protocol: string
  name: string
  address: string
  status: string
  token: string
}

interface APIRequest extends Request {
  serverToken?: string
  serverData?: ServerData
}

export { APIRequest, ServerData }