/*
  Warnings:

  - Added the required column `harvestSeason` to the `FarmingRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FarmingRecord" ADD COLUMN     "harvestSeason" TEXT NOT NULL;
