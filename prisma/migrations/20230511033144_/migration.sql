/*
  Warnings:

  - You are about to drop the column `bin_numberId` on the `User` table. All the data in the column will be lost.
  - Added the required column `UserId` to the `BinKartu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BinKartu" ADD COLUMN     "UserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bin_numberId";
