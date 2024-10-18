export const errorValidation = (
  identificationType: number,
  identificationNumber: string,
  insuredValue: number,
) => {
  if (
    !identificationType ||
    !identificationNumber ||
    insuredValue == undefined
  ) {
    throw new Error('There are missing fields to calculate the settlement');
  }

  if (insuredValue <= 0) {
    throw new Error('The insured value must be greater than zero');
  }
};
