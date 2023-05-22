/*
  Warnings:

  - You are about to drop the `_MenuRolesToMenus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MenuRolesToRole` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `isActive` on the `Mappingcode` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_MenuRolesToMenus" DROP CONSTRAINT "_MenuRolesToMenus_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuRolesToMenus" DROP CONSTRAINT "_MenuRolesToMenus_B_fkey";

-- DropForeignKey
ALTER TABLE "_MenuRolesToRole" DROP CONSTRAINT "_MenuRolesToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuRolesToRole" DROP CONSTRAINT "_MenuRolesToRole_B_fkey";

-- AlterTable
ALTER TABLE "Mappingcode" DROP COLUMN "isActive",
ADD COLUMN     "isActive" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "MenuRoles" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "id_menu" INTEGER,
ADD COLUMN     "id_role" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Menus" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "_MenuRolesToMenus";

-- DropTable
DROP TABLE "_MenuRolesToRole";

-- DropEnum
DROP TYPE "isActive";

-- CreateTable
CREATE TABLE "BinKartu" (
    "id_BIN" SERIAL NOT NULL,
    "bin" INTEGER NOT NULL,
    "bank_name" TEXT NOT NULL,
    "card_type" TEXT,
    "inserted_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "BinKartu_pkey" PRIMARY KEY ("id_BIN")
);

-- AddForeignKey
ALTER TABLE "MenuRoles" ADD CONSTRAINT "MenuRoles_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "Role"("id_role") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuRoles" ADD CONSTRAINT "MenuRoles_id_menu_fkey" FOREIGN KEY ("id_menu") REFERENCES "Menus"("id_menu") ON DELETE SET NULL ON UPDATE CASCADE;
