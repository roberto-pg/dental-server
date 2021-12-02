-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "card" TEXT,
    "plain" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "admin" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "doctor_name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "month_day" TEXT,
    "week_day" TEXT,
    "hour" TEXT,
    "patient_name" TEXT,
    "cpf" TEXT,
    "plain" TEXT,
    "scheduled" BOOLEAN DEFAULT false,
    "card" TEXT,
    "editable" BOOLEAN DEFAULT false,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
