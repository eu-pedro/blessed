import { PrismaUsersRepository } from "@/application/repository/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "../register";
import { PrismaInstance } from "@/infra/prisma";

export function makeRegisterUser() {
  const prismaClient = PrismaInstance.getInstance()

  const usersRepository = new PrismaUsersRepository(prismaClient)

  const registerUserUseCase = new RegisterUserUseCase(usersRepository)

  return registerUserUseCase
}