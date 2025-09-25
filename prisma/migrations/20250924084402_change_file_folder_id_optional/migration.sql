/*
  Warnings:

  - A unique constraint covering the columns `[name,userId,parentId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."File" DROP CONSTRAINT "File_folderId_fkey";

-- DropIndex
DROP INDEX "public"."Folder_name_userId_key";

-- AlterTable
ALTER TABLE "public"."File" ALTER COLUMN "folderId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_name_userId_parentId_key" ON "public"."Folder"("name", "userId", "parentId");

-- AddForeignKey
ALTER TABLE "public"."File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "public"."Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
