/*
  Warnings:

  - Added the required column `quantify` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderProducts" ADD COLUMN     "quantify" INTEGER NOT NULL;
