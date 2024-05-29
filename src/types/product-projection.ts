import { CategoryOrderHints, CategoryReference } from './category';
import { LocalizedString } from './common';
import { ProductVariant, SearchKeywords } from './product';
import { ProductTypeReference } from './product-type';
import { ReviewRatingStatistics } from './review';
import { StateReference } from './state';
import { TaxCategoryReference } from './tax-category';

export interface ProductProjection {
  categories: CategoryReference[];
  categoryOrderHints?: CategoryOrderHints;
  createdAt: string;
  description?: LocalizedString;
  hasStagedChanges?: boolean;
  id: string;
  key?: string;
  lastModifiedAt: string;
  masterVariant: ProductVariant;
  metaDescription?: LocalizedString;
  metaKeywords?: LocalizedString;
  metaTitle?: LocalizedString;
  name: LocalizedString;
  priceMode?: string;
  productType: ProductTypeReference;
  published?: boolean;
  reviewRatingStatistics?: ReviewRatingStatistics;
  searchKeywords?: SearchKeywords;
  slug: LocalizedString;
  state?: StateReference;
  taxCategory?: TaxCategoryReference;
  variants: ProductVariant[];
  version: number;
}
