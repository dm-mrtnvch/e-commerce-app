export interface TaxCategoryReference {
  id: string;
  typeId: string;
}

export interface TaxRate {
  amount: number;
  country: string;
  id?: string;
  includedInPrice: boolean;
  key?: string;
  name: string;
  state?: string;
  subRates?: SubRate[];
}

export interface SubRate {
  amount: number;
  name: string;
}

export interface TaxCategoryResourceIdentifier {
  id?: string;
  key?: string;
  typeId: string;
}
