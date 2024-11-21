import fastify from "fastify";
import { appRoutes } from "./http/controllers/route";
import { env } from "process";
import { ZodError } from "zod";

export const app = fastify()

app.register(appRoutes, {
  prefix: '/api'
})
app.setErrorHandler((error, _, reply) => {
  if(error instanceof ZodError) {
    return reply.status(400)
      .send({
        message: "Validation error.",
        errors: error.format()
      })
  }

  if(env.NODE_ENV != 'production') {
    console.error(error)
  } 

  return reply.status(500).send({
    message: "Internal Server Error"
  })
})