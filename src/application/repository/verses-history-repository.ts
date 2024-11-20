import { Prisma, VerseHistory } from "@prisma/client";

export interface VersesHistoryRepository {
  findByVerseId(id: number): Promise<VerseHistory | null>
  create(data: Prisma.VerseHistoryCreateInput): Promise<void>
} 