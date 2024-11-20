-- CreateTable
CREATE TABLE "verse_history" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verse_history_pkey" PRIMARY KEY ("id")
);
