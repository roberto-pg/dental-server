/*
  Warnings:

  - You are about to drop the column `plain` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `plain` on the `users` table. All the data in the column will be lost.
  - Added the required column `plan` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "plain",
ADD COLUMN     "plan" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "plain",
ADD COLUMN     "plan" TEXT NOT NULL;
