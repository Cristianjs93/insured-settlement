/*
  Warnings:

  - Changed the type of `birthDate` on the `Insured` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Insured" DROP COLUMN "birthDate",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL;
