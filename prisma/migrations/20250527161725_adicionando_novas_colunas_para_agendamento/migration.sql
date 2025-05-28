/*
  Warnings:

  - You are about to drop the column `data` on the `Consultations` table. All the data in the column will be lost.
  - You are about to drop the column `duracao` on the `Consultations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorId,startDateTime]` on the table `Consultations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `durationMinutes` to the `Consultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `Consultations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Consultations_doctorId_data_key";

-- AlterTable
ALTER TABLE "Consultations" DROP COLUMN "data",
DROP COLUMN "duracao",
ADD COLUMN     "durationMinutes" INTEGER NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "defaultAppointmentDuration" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "workEndTime" TEXT NOT NULL DEFAULT '17:00',
ADD COLUMN     "workStartTime" TEXT NOT NULL DEFAULT '09:00';

-- CreateIndex
CREATE UNIQUE INDEX "Consultations_doctorId_startDateTime_key" ON "Consultations"("doctorId", "startDateTime");
