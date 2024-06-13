import { Address } from './auth';

export interface ErrorResponse {
  message: string;
  statusCode: number;
  errors: {
    code: string;
    message: string;
  }[];
}

export interface Pagination<T> {
  count: number;
  limit: number;
  offset: number;
  total: number;
  results: T[];
}

export interface LocalizedString {
  [key: string]: string;
}

export interface Params {
  offset?: number;
  filter?: string;
  sort?: string;
  search?: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface CustomFields {
  fields: FieldContainer;
  type: TypeReference;
}

export interface FieldContainer {
  [key: string]: unknown;
}

export interface TypeReference {
  id: string;
  typeId: string;
}

export interface CentPrecisionMoney {
  centAmount: number;
  currencyCode: string;
  fractionDigits: number;
  type: string;
}

export type _Money = Money | TypedMoney | TypedMoneyDraft;

interface Money {
  centAmount: number;
  currencyCode: string;
}

export type TypedMoney = CentPrecisionMoney | HighPrecisionMoney;

export interface HighPrecisionMoney {
  centAmount: number;
  currencyCode: string;
  fractionDigits: number;
  preciseAmount: number;
  type: string;
}

export type TypedMoneyDraft = CentPrecisionMoneyDraft | HighPrecisionMoneyDraft;

export interface CentPrecisionMoneyDraft {
  type: string;
  centAmount?: number;
  currencyCode: string;
  fractionDigits?: number;
}

export interface HighPrecisionMoneyDraft {
  type: string;
  centAmount?: number;
  currencyCode: string;
  fractionDigits: number;
  preciseAmount: number;
}

export type _BaseAddress = BaseAddress | Address | AddressDraft;

export interface BaseAddress {
  id?: string;
  key?: string;
  country: string;
  title?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  additionalStreetInfo?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  state?: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  additionalAddressInfo?: string;
  externalId?: string;
}

export interface AddressDraft extends BaseAddress {
  custom?: CustomFieldsDraft;
}

export interface CustomFieldsDraft {
  type: TypeResourceIdentifier;
  fields?: FieldContainer;
}

export interface TypeResourceIdentifier {
  typeId: 'type';
  id?: string;
  key?: string;
}

export interface BaseAddress {
  additionalAddressInfo?: string;
  additionalStreetInfo?: string;
  apartment?: string;
  building?: string;
  city?: string;
  company?: string;
  country: string;
  department?: string;
  email?: string;
  externalId?: string;
  fax?: string;
  firstName?: string;
  id?: string;
  key?: string;
  lastName?: string;
  mobile?: string;
  pOBox?: string;
  phone?: string;
  postalCode?: string;
  region?: string;
  salutation?: string;
  state?: string;
  streetName?: string;
  streetNumber?: string;
  title?: string;
}
