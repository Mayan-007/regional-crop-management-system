/*
  Warnings:

  - You are about to alter the column `totalAreaAcres` on the `Farm` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[email]` on the table `Farmer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `irrigationType` to the `Farm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Farm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Farmer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Season" AS ENUM ('KHARIF', 'RABI', 'ZAID');

-- CreateEnum
CREATE TYPE "CropCategory" AS ENUM ('CEREAL', 'PULSE', 'OILSEED', 'CASH_CROP', 'HORTICULTURE', 'PLANTATION');

-- CreateEnum
CREATE TYPE "FarmingStatus" AS ENUM ('PLANNED', 'SOWN', 'GROWING', 'HARVESTED', 'FAILED');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'STATE_ADMIN', 'DISTRICT_ADMIN', 'BLOCK_ADMIN');

-- CreateEnum
CREATE TYPE "FarmIrrigationType" AS ENUM ('RAINFED', 'CANAL', 'DRIP', 'TUBE_WELL', 'SPRINKLER');

-- AlterTable
ALTER TABLE "Farm" ADD COLUMN     "farmName" TEXT,
ADD COLUMN     "irrigationType" "FarmIrrigationType" NOT NULL,
ADD COLUMN     "latitude" DECIMAL(10,6),
ADD COLUMN     "longitude" DECIMAL(10,6),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "totalAreaAcres" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "variety" TEXT NOT NULL,
    "scientificName" TEXT,
    "category" "CropCategory" NOT NULL,
    "season" "Season" NOT NULL,
    "expectedYieldPerAcre" DECIMAL(10,2) NOT NULL,
    "harvestCycleDays" INTEGER NOT NULL,
    "waterRequirementMm" DECIMAL(10,2),
    "soilSuitability" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmingRecord" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "cropId" TEXT NOT NULL,
    "status" "FarmingStatus" NOT NULL DEFAULT 'PLANNED',
    "sowingDate" TIMESTAMP(3) NOT NULL,
    "predictedHarvestDate" TIMESTAMP(3) NOT NULL,
    "actualHarvestDate" TIMESTAMP(3),
    "predictedQuantity" DECIMAL(10,2) NOT NULL,
    "actualQuantity" DECIMAL(10,2),
    "lossQuantity" DECIMAL(10,2),
    "remarks" TEXT,
    "lossReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FarmingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'BLOCK_ADMIN',
    "scopeState" TEXT,
    "scopeDistrict" TEXT,
    "scopeBlock" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Crop_name_idx" ON "Crop"("name");

-- CreateIndex
CREATE INDEX "Crop_category_idx" ON "Crop"("category");

-- CreateIndex
CREATE INDEX "Crop_season_idx" ON "Crop"("season");

-- CreateIndex
CREATE UNIQUE INDEX "Crop_name_variety_key" ON "Crop"("name", "variety");

-- CreateIndex
CREATE INDEX "FarmingRecord_status_idx" ON "FarmingRecord"("status");

-- CreateIndex
CREATE INDEX "FarmingRecord_sowingDate_idx" ON "FarmingRecord"("sowingDate");

-- CreateIndex
CREATE INDEX "FarmingRecord_predictedHarvestDate_idx" ON "FarmingRecord"("predictedHarvestDate");

-- CreateIndex
CREATE INDEX "FarmingRecord_farmId_idx" ON "FarmingRecord"("farmId");

-- CreateIndex
CREATE INDEX "FarmingRecord_cropId_idx" ON "FarmingRecord"("cropId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_role_idx" ON "Admin"("role");

-- CreateIndex
CREATE INDEX "Admin_scopeState_idx" ON "Admin"("scopeState");

-- CreateIndex
CREATE INDEX "Admin_scopeDistrict_idx" ON "Admin"("scopeDistrict");

-- CreateIndex
CREATE INDEX "Admin_scopeBlock_idx" ON "Admin"("scopeBlock");

-- CreateIndex
CREATE INDEX "Farm_state_idx" ON "Farm"("state");

-- CreateIndex
CREATE INDEX "Farm_district_idx" ON "Farm"("district");

-- CreateIndex
CREATE INDEX "Farm_block_idx" ON "Farm"("block");

-- CreateIndex
CREATE INDEX "Farm_village_idx" ON "Farm"("village");

-- CreateIndex
CREATE INDEX "Farm_state_district_block_village_idx" ON "Farm"("state", "district", "block", "village");

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_email_key" ON "Farmer"("email");

-- CreateIndex
CREATE INDEX "Farmer_contactNumber_idx" ON "Farmer"("contactNumber");

-- AddForeignKey
ALTER TABLE "FarmingRecord" ADD CONSTRAINT "FarmingRecord_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmingRecord" ADD CONSTRAINT "FarmingRecord_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
