/*
  Warnings:

  - Added the required column `bin_numberId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bin_numberId" INTEGER NOT NULL;
