-- CreateIndex
CREATE INDEX "Insured_identificationType_identificationNumber_idx" ON "Insured"("identificationType", "identificationNumber");

-- CreateIndex
CREATE INDEX "Premium_minAge_maxAge_idx" ON "Premium"("minAge", "maxAge");
