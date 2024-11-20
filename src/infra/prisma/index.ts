import { PrismaClient } from "@prisma/client";
export class PrismaInstance {
  private static _instance: PrismaClient

   static getInstance() {
    if(!this._instance) {
      this._instance = new PrismaClient({
        log: ['query']
      })
    }

    return this._instance
  }
}
