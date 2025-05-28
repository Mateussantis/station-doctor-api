/*
  Warnings:

  - You are about to drop the column `startDateTime` on the `Consultations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorId,date,time]` on the table `Consultations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Consultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Consultations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Consultations_doctorId_startDateTime_key";

-- AlterTable
ALTER TABLE "Consultations" DROP COLUMN "startDateTime",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Consultations_doctorId_date_time_key" ON "Consultations"("doctorId", "date", "time");
