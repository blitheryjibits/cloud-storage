/*
  Warnings:

  - Added the required column `data` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."File" ADD COLUMN     "data" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "userAvatar" TEXT DEFAULT '/images/default-avatar.png';
