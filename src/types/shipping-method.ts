import { _Money } from './common';
import { TypedMoney } from './product';

export interface ShippingMethodReference {
  id: string;
  typeId: string;
}

export interface ShippingRate {
  freeAbove?: TypedMoney;
  isMatching?: boolean;
  price: TypedMoney;
  tiers: ShippingRatePriceTier[];
}

export type ShippingRatePriceTier = CartClassificationTier | CartScoreTier | CartValueTier;

export interface CartClassificationTier {
  isMatching?: boolean;
  price: _Money;
  type: string;
  value: string;
}

export interface CartScoreTier {
  isMatching?: boolean;
  price?: _Money;
  priceFunction?: PriceFunction;
  score: number;
  type: string;
}

export interface PriceFunction {
  currencyCode: string;
  function: string;
}

export interface CartValueTier {
  isMatching?: boolean;
  minimumCentAmount: number;
  price: _Money;
  type: string;
}

export interface ShippingRateDraft {
  freeAbove?: _Money;
  price: _Money;
  tiers?: ShippingRatePriceTier[];
}

export interface ShippingMethodResourceIdentifier {
  id?: string;
  key?: string;
  typeId: string;
}
