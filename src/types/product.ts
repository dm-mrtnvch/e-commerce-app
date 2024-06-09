import { CategoryOrderHints, CategoryReference } from './category';
import { LocalizedString } from './common';
import { ProductTypeReference } from './product-type';
import { ReviewRatingStatistics } from './review';
import { StateReference } from './state';
import { TaxCategoryReference } from './tax-category';

export interface Product {
  createdAt: string;
  id: string;
  key?: string;
  lastModifiedAt: string;
  masterData: ProductCatalogData;
  priceMode?: string;
  productType: ProductTypeReference;
  reviewRatingStatistics?: ReviewRatingStatistics;
  state?: StateReference;
  taxCategory?: TaxCategoryReference;
  version: number;
}

export interface ProductCatalogData {
  current: ProductData;
  hasStagedChanges: boolean;
  published: boolean;
  staged: ProductData;
}

export interface ProductData {
  categories: CategoryReference[];
  categoryOrderHints?: CategoryOrderHints;
  description?: LocalizedString;
  masterVariant: ProductVariant;
  metaDescription?: LocalizedString;
  metaKeywords?: LocalizedString;
  metaTitle?: LocalizedString;
  name: LocalizedString;
  searchKeywords: SearchKeywords;
  slug: LocalizedString;
  variants: ProductVariant[];
}

export interface ProductVariant {
  assets?: Asset[];
  attributes?: Attribute[];
  availability?: ProductVariantAvailability;
  id: number;
  images?: Image[];
  isMatchingVariant?: boolean;
  key?: string;
  price?: Price;
  prices?: Price[];
  scopedPrice?: ScopedPrice;
  scopedPriceDiscounted?: boolean;
  sku?: string;
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

export interface SearchKeywords {
  [key: string]: SearchKeyword[];
}

export interface SearchKeyword {
  suggestTokenizer?: SuggestTokenizer;
  text: string;
}

export type SuggestTokenizer = CustomTokenizer | WhitespaceTokenizer;

export interface CustomTokenizer {
  inputs: string[];
  type: 'custom';
}

export interface WhitespaceTokenizer {
  type: 'whitespace';
}
