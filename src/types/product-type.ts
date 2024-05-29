import { LocalizedString } from './common';

export interface ProductTypeReference {
  id: string;
  typeId: string;
}

export interface ProductType {
  attributes?: AttributeDefinition[];
  createdAt: string;
  description: string;
  id: string;
  key?: string;
  lastModifiedAt: string;
  name: string;
  version: number;
}

export interface AttributeDefinition {
  attributeConstraint: string;
  inputHint: string;
  inputTip?: LocalizedString;
  isRequired: boolean;
  isSearchable: boolean;
  label: LocalizedString;
  name: string;
  type: AttributeType;
}

export type AttributeType =
  | AttributeBooleanType
  | AttributeDateTimeType
  | AttributeDateType
  | AttributeEnumType
  | AttributeLocalizableTextType
  | AttributeLocalizedEnumType
  | AttributeMoneyType
  | AttributeNestedType
  | AttributeNumberType
  | AttributeReferenceType
  | AttributeSetType
  | AttributeTextType
  | AttributeTimeType;

export interface AttributeBooleanType {
  name: 'boolean';
}

export interface AttributeDateTimeType {
  name: 'datetime';
}

export interface AttributeDateType {
  name: 'date';
}

export interface AttributeEnumType {
  name: 'enum';
  values: AttributePlainEnumValue[];
}

export interface AttributePlainEnumValue {
  key: string;
  label: string;
}

export interface AttributeLocalizableTextType {
  name: 'ltext';
}

export interface AttributeLocalizedEnumType {
  name: 'lenum';
  values: AttributeLocalizedEnumValue[];
}

export interface AttributeLocalizedEnumValue {
  key: string;
  label: LocalizedString;
}

export interface AttributeMoneyType {
  name: 'money';
}

export interface AttributeNestedType {
  name: 'nested';
  typeReference: ProductTypeReference;
}

export interface AttributeNumberType {
  name: 'number';
}

export interface AttributeReferenceType {
  name: 'reference';
  referenceTypeId: string;
}

export interface AttributeSetType {
  elementType: AttributeType;
  name: 'set';
}

export interface AttributeTextType {
  name: 'text';
}

export interface AttributeTimeType {
  name: 'time';
}
