/*
  Warnings:

  - Added the required column `docId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "docId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Chat_userId_idx" ON "Chat"("userId");

-- CreateIndex
CREATE INDEX "Chat_docId_idx" ON "Chat"("docId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
