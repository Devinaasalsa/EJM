/*
  Warnings:

  - You are about to drop the column `bin` on the `BinKartu` table. All the data in the column will be lost.
  - You are about to drop the column `inserted_by` on the `BinKartu` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bin_number]` on the table `BinKartu` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bin_number` to the `BinKartu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BinKartu" DROP COLUMN "bin",
DROP COLUMN "inserted_by",
ADD COLUMN     "bin_number" INTEGER NOT NULL,
ADD COLUMN     "inserted_by_userId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "BinKartu_bin_number_key" ON "BinKartu"("bin_number");

-- AddForeignKey
ALTER TABLE "BinKartu" ADD CONSTRAINT "BinKartu_inserted_by_userId_fkey" FOREIGN KEY ("inserted_by_userId") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
