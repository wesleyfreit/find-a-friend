/*
  Warnings:

  - Made the column `phone` on table `organzations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "organzations" ALTER COLUMN "phone" SET NOT NULL;
