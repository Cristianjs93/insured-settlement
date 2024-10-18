CREATE TABLE "Insured" (
    "id" SERIAL NOT NULL,
    "identificationType" INTEGER NOT NULL,
    "identificationNumber" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insured_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Protections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Protections_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Premium" (
    "id" SERIAL NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "percent" DOUBLE PRECISION NOT NULL,
    "protectionId" INTEGER NOT NULL,

    CONSTRAINT "Premium_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Insured_identificationNumber_key" ON "Insured"("identificationNumber");

CREATE UNIQUE INDEX "Protections_name_key" ON "Protections"("name");

ALTER TABLE "Premium" ADD CONSTRAINT "Premium_protectionId_fkey" FOREIGN KEY ("protectionId") REFERENCES "Protections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "Insured"("identificationType","identificationNumber","lastname","name","gender","birthDate")
VALUES
    (1, '79000001', 'Apellido 1', 'Nombre 1', 1, '1945-01-10' ),
    (1, '79000002', 'Apellido 2', 'Nombre 2', 1, '1950-01-10' ),
    (1, '79000003', 'Apellido 3', 'Nombre 3', 1, '1955-01-10' ),
    (2, '51000001', 'Apellido 4', 'Nombre 4', 2, '1960-01-10' ),
    (2, '51000002', 'Apellido 5', 'Nombre 5', 2, '1965-01-10' ),
    (2, '51000003', 'Apellido 6', 'Nombre 6', 2, '1970-01-10' );

INSERT INTO "Protections"("name")
VALUES
    ('Muerte accidental'),    
    ('Desmembración'),
    ('Auxilio funerario'),
    ('Renta Vitalicia');

INSERT INTO "Premium"("protectionId", "minAge", "maxAge", "percent")
VALUES
    (1, 18, 45, 0.02304),
    (1, 46, 75, 0.02012),
    (2, 18, 50, 0.1809),
    (2, 51, 70, 0.16043),
    (3, 18, 60, 0.14123),
    (3, 61, 70, 0.1545),
    (4, 18, 50, 0.12123),
    (4, 51, 70, 0.1345);