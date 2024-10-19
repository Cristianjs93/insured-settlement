import { Insured, Premium, Protections } from '@prisma/client';
import { SettlementDetail } from '@domain/models/Settlement';

export const calculateCustomerAge = (customer: Insured) => {
  const currentYear = new Date().getFullYear();
  const customerBirthYear = new Date(customer.birthDate).getFullYear();
  return currentYear - customerBirthYear;
};

export const calculateSettlements = (
  premiums: (Premium & { protection: Protections })[],
  insuredValue: number,
) => {
  return premiums.map(({ protectionId, protection, percent }) => ({
    protectionId,
    protectionName: protection.name,
    premiumValue: percent * insuredValue,
  }));
};

export const calculateTotalValue = (settlements: SettlementDetail[]) => {
  return settlements.reduce((prev, curr) => prev + curr.premiumValue, 0);
};
