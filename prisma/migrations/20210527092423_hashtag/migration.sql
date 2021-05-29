/*
  Warnings:

  - Added the required column `hashtag` to the `Hashtag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hashtag" ADD COLUMN     "hashtag" TEXT NOT NULL;
