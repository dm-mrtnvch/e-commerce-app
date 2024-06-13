import { CentPrecisionMoney } from './common';
import { ChannelReference, ProductReference, TypedMoney } from './product';

export interface CartDiscountReference {
  id: string;
  typeId: string;
}

export type CartDiscountValue =
  | CartDiscountValueAbsolute
  | CartDiscountValueFixed
  | CartDiscountValueGiftLineItem
  | CartDiscountValueRelative;

export interface CartDiscountValueAbsolute {
  money: CentPrecisionMoney[];
  type: string;
}

export interface CartDiscountValueFixed {
  money: TypedMoney[];
  type: string;
}

export interface CartDiscountValueGiftLineItem {
  distributionChannel?: ChannelReference;
  product: ProductReference;
  supplyChannel?: ChannelReference;
  type: string;
  variantId: number;
}

export interface CartDiscountValueRelative {
  permyriad: number;
  type: string;
}

export type CartDiscountTarget =
  | CartDiscountCustomLineItemsTarget
  | CartDiscountLineItemsTarget
  | CartDiscountShippingCostTarget
  | CartDiscountTotalPriceTarget
  | MultiBuyCustomLineItemsTarget
  | MultiBuyLineItemsTarget;

export interface CartDiscountCustomLineItemsTarget {
  predicate: string;
  type: string;
}

export interface CartDiscountLineItemsTarget {
  predicate: string;
  type: string;
}

export interface CartDiscountShippingCostTarget {
  type: string;
}

export interface CartDiscountTotalPriceTarget {
  type: string;
}

export interface MultiBuyCustomLineItemsTarget {
  discountedQuantity: number;
  maxOccurrence?: number;
  predicate: string;
  selectionMode: string;
  triggerQuantity: number;
  type: string;
}

export interface MultiBuyLineItemsTarget {
  discountedQuantity: number;
  maxOccurrence?: number;
  predicate: string;
  selectionMode: string;
  triggerQuantity: number;
  type: string;
}
