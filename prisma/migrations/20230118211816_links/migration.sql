/*
  Warnings:

  - Made the column `clicked` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Link` MODIFY `clicked` INTEGER NOT NULL DEFAULT 0;
