/*
  Warnings:

  - Made the column `inserted_by_userId` on table `BinKartu` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BinKartu" DROP CONSTRAINT "BinKartu_inserted_by_userId_fkey";

-- AlterTable
ALTER TABLE "BinKartu" ALTER COLUMN "inserted_by_userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BinKartu" ADD CONSTRAINT "BinKartu_inserted_by_userId_fkey" FOREIGN KEY ("inserted_by_userId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
