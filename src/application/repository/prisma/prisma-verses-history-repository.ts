import { Prisma, PrismaClient, VerseHistory } from "@prisma/client";
import { VersesHistoryRepository } from "../verses-history-repository";

export class PrismaVersesHistoryRepository implements VersesHistoryRepository{
  constructor(private readonly client: PrismaClient) {}
  async findByVerseId(id: number): Promise<VerseHistory | null> {
    return await this.client.verseHistory.findFirst({
      where: {
        verseId: id
      }
    })
  }
  async create(data: Prisma.VerseHistoryCreateInput): Promise<void> {
    await this.client.verseHistory.create({
      data
    })
  }
}