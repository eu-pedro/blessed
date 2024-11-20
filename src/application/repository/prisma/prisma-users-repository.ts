import { PrismaClient, User } from "@prisma/client";
import { UsersRepository } from "../users-repository"

export class PrismaUsersRepository implements UsersRepository{
  constructor(private readonly client: PrismaClient){}

  async findAll(): Promise<User[]> {
    return await this.client.user.findMany()
  }
}