/*
  Warnings:

  - The primary key for the `RequestLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RequestLog` table. All the data in the column will be lost.
  - The required column `analyseId` was added to the `RequestLog` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "RequestLog" DROP CONSTRAINT "RequestLog_pkey",
DROP COLUMN "id",
ADD COLUMN     "analyseId" TEXT NOT NULL,
ADD CONSTRAINT "RequestLog_pkey" PRIMARY KEY ("analyseId");
