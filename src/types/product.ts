import { LocalizedString } from './common';

export interface Product {
  id: string;
  version: number;
  key: string;
  createdAt: string;
  lastModifiedAt: string;
  productType: ProductTypeReference;
  masterData: ProductCatalogData;
}

export interface ProductTypeReference {
  id: string;
  typeId: string;
}

export interface ProductCatalogData {
  published: boolean;
  current: ProductData;
  staged: ProductData;
  hasStagedChanges: boolean;
}

export interface ProductData {
  name: LocalizedString;
  categories: CategoryReference[];
  categoryOrderHints: Record<string, string[]>;
  description: LocalizedString;
  slug: LocalizedString;
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
  metaKeywords: LocalizedString;
  masterVariant: ProductVariant;
  variants: ProductVariant[];
}

export interface CategoryReference {
  typeId: string;
  id: string;
}

export interface ProductVariant {
  id: number;
  key: string;
  sku: string;
  prices: Price[];
  attributes: Attribute[];
  price: Price;
  images: Image[];
  assets: Asset[];
  availability: ProductVariantAvailability;
  isMatchingVariant: boolean;
  scopedPrice: ScopedPrice;
  scopedPriceDiscounted: boolean;
}

export interface Price {
  id: string;
  key: string;
  value: TypedMoney;
  country: string;
  customerGroup: CustomerGroupReference;
  channel: ChannelReference;
  validFrom: string;
  validUntil: string;
  discounted: DiscountedPrice;
  tiers: PriceTier[];
}

export interface TypedMoney {
  centAmount: number;
  currencyCode: string;
  type: string;
  fractionDigits: number;
}

export interface CustomerGroupReference {
  typeId: string;
  id: string;
}

export interface ChannelReference {
  typeId: string;
  id: string;
}

export interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}

export interface ProductDiscountReference {
  typeId: string;
  id: string;
}

export interface PriceTier {
  minimumQuantity: number;
  value: TypedMoney;
}

export interface Attribute {
  name: string;
  value: unknown;
}

export interface Image {
  url: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  w: number;
  h: number;
}

export interface Asset {
  id: string;
  key: string;
  sources: AssetSource[];
  name: LocalizedString;
  description: LocalizedString;
}

export interface AssetSource {
  uri: string;
  key: string;
  dimensions: Dimensions;
  contentType: string;
}

export interface ProductVariantAvailability {
  isOnStock: boolean;
  restockableInDays: number;
  availableQuantity: number;
}

export interface ScopedPrice {
  id: string;
  value: TypedMoney;
  currentValue: TypedMoney;
  country: string;
  validFrom: string;
  validUntil: string;
  discounted: DiscountedPrice;
}
