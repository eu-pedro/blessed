import { User } from "@prisma/client";

export interface UsersRepository {
  findAll(): Promise<User[]>
}