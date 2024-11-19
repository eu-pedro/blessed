import { User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/infra/prisma";

export class PrismaUsersRepository implements UsersRepository{
  async findAll(): Promise<User[]> {
    return await prisma.user.findMany()
  }
}