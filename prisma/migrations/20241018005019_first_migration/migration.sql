-- CreateTable
CREATE TABLE "Insured" (
    "id" SERIAL NOT NULL,
    "identificationType" INTEGER NOT NULL,
    "identificationNumber" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "birthDate" INTEGER NOT NULL,

    CONSTRAINT "Insured_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Protections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Protections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Premium" (
    "id" SERIAL NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "percent" DOUBLE PRECISION NOT NULL,
    "protectionId" INTEGER NOT NULL,

    CONSTRAINT "Premium_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Insured_identificationNumber_key" ON "Insured"("identificationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Protections_name_key" ON "Protections"("name");

-- AddForeignKey
ALTER TABLE "Premium" ADD CONSTRAINT "Premium_protectionId_fkey" FOREIGN KEY ("protectionId") REFERENCES "Protections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
