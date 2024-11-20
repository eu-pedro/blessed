/*
  Warnings:

  - Added the required column `verseId` to the `verse_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verse_history" ADD COLUMN     "verseId" INTEGER NOT NULL;
