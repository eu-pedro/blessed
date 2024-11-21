import { Prisma, PrismaClient, User } from "@prisma/client";
import { UsersRepository } from "../users-repository"

export class PrismaUsersRepository implements UsersRepository{
  constructor(private readonly client: PrismaClient){}
  async findByEmail(email: string): Promise<User | null> {
    return await this.client.user.findUnique({
      where: {
        email
      }
    })
  }
  async create(data: Prisma.UserCreateInput): Promise<void> {
    await this.client.user.create({
      data
    })
  }

  async findAll(): Promise<User[]> {
    return await this.client.user.findMany()
  }
}