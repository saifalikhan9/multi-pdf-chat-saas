-- CreateEnum
CREATE TYPE "Status" AS ENUM ('COMPLETED', 'PENDING');

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
