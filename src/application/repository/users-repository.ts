import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findAll(): Promise<User[]>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<void>
}