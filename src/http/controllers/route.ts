import { FastifyInstance } from "fastify";
import { adaptRoute } from "../adapters/adapt-route";
import { RegisterController } from "./user/register";

export function appRoutes(app: FastifyInstance) {
  app.post("/user", adaptRoute(() => new RegisterController()))
}