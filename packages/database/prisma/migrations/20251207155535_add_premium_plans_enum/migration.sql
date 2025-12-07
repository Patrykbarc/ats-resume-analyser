/*
  Warnings:

  - You are about to drop the column `premiumProvider` on the `User` table. All the data in the column will be lost.
  - The `premiumPlan` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[premiumCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `premiumCustomerId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PremiumPlans" AS ENUM ('PRO');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "premiumProvider",
ALTER COLUMN "premiumCustomerId" SET NOT NULL,
DROP COLUMN "premiumPlan",
ADD COLUMN     "premiumPlan" "PremiumPlans";

-- CreateIndex
CREATE UNIQUE INDEX "User_premiumCustomerId_key" ON "User"("premiumCustomerId");
