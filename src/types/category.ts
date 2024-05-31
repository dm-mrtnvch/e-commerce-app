import { LocalizedString } from './common';
import { Asset } from './product';

export interface CategoryReference {
  typeId: string;
  id: string;
}

export interface CategoryOrderHints {
  [key: string]: string;
}

export interface Category {
  ancestors: CategoryReference[];
  assets?: Asset[];
  createdAt: string;
  description?: LocalizedString;
  externalId?: string;
  id: string;
  key?: string;
  lastModifiedAt: string;
  metaDescription?: LocalizedString;
  metaKeywords?: LocalizedString;
  metaTitle?: LocalizedString;
  name: LocalizedString;
  orderHint: string;
  parent?: CategoryReference;
  slug: LocalizedString;
  version: number;
}
