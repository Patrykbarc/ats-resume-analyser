-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "premiumCustomerId" TEXT,
ADD COLUMN     "premiumExpiresAt" TIMESTAMP(3),
ADD COLUMN     "premiumPlan" TEXT,
ADD COLUMN     "premiumProvider" TEXT,
ADD COLUMN     "premiumStartedAt" TIMESTAMP(3);
