import { HttpRequest, HttpResponse } from "@/ports/http";
import { IController } from "../controller";
import { z } from "zod";
import { makeRegisterUser } from "@/application/usecases/factories/make-register-user-usecase";
import { UserAlreadyExistsError } from "@/application/usecases/errors/user-already-exists-error";
import { conflict, created } from "@/ports/http-helper";

export class RegisterController implements IController {
  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    const { email, name } = registerBodySchema.parse(body)

    try {
      const registerUserUseCase = makeRegisterUser()

      await registerUserUseCase.execute({ email, name })

      return created()
    } catch (error) {
      if(error instanceof UserAlreadyExistsError) {
        return conflict(error.message)
      }
      throw error
    }

  }
  
}