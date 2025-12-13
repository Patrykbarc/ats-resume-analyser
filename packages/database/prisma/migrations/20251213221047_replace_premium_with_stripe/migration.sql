/*
  Warnings:

  - You are about to drop the column `premiumCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `premiumExpiresAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `premiumPlan` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `premiumStartedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'past_due', 'trialing', 'canceled', 'unpaid', 'incomplete', 'incomplete_expired', 'paused');

-- DropIndex
DROP INDEX "User_premiumCustomerId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "premiumCustomerId",
DROP COLUMN "premiumExpiresAt",
DROP COLUMN "premiumPlan",
DROP COLUMN "premiumStartedAt",
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "subscriptionCurrentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "subscriptionStartedAt" TIMESTAMP(3),
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus";

-- DropEnum
DROP TYPE "PremiumPlans";

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeSubscriptionId_key" ON "User"("stripeSubscriptionId");
