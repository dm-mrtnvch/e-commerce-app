import { AssociateRoleReference } from './associate-role';
import { AttributeGroupReference } from './attribute-group';
import { Address } from './auth';
import { BusinessUnitKeyReference, BusinessUnitReference, BusinessUnitResourceIdentifier } from './business-unit';
import { CartDiscountReference, CartDiscountTarget, CartDiscountValue } from './cart-discount';
import { CategoryReference } from './category';
import { ChannelResourceIdentifier } from './channel';
import {
  _BaseAddress,
  _Money,
  BaseAddress,
  CentPrecisionMoney,
  CustomFields,
  CustomFieldsDraft,
  LocalizedString,
  TypeReference,
} from './common';
import { CustomObjectReference } from './custom-object';
import { CustomerEmailTokenReference, CustomerPasswordTokenReference, CustomerReference } from './customer';
import { CustomerGroupResourceIdentifier } from './customer-group';
import { DiscountCodeReference } from './discount-code';
import { InventoryEntryReference } from './inventory';
import { Delivery, DeliveryDraft, ItemState, PaymentInfo } from './order';
import { OrderEditReference, OrderReference } from './order-edit';
import { PaymentReference } from './payment';
import {
  ChannelReference,
  CustomerGroupReference,
  Price,
  ProductDiscountReference,
  ProductReference,
  ProductVariant,
  TypedMoney,
} from './product';
import { ProductSelectionReference } from './product-selection';
import { ProductTailoringReference } from './product-tailoring';
import { ProductTypeReference } from './product-type';
import { QuoteReference, QuoteRequestReference } from './quote';
import { ReviewReference } from './review';
import {
  ShippingMethodReference,
  ShippingMethodResourceIdentifier,
  ShippingRate,
  ShippingRateDraft,
} from './shipping-method';
import { ShoppingListReference } from './shopping-list';
import { StagedQuoteReference } from './staged-quote';
import { StandalonePriceReference } from './standalone-price';
import { StateReference } from './state';
import { StoreKeyReference, StoreReference, StoreResourceIdentifier } from './store';
import { SubRate, TaxCategoryReference, TaxCategoryResourceIdentifier, TaxRate } from './tax-category';
import { ZoneReference } from './zone';

export interface Cart {
  anonymousId?: string;
  billingAddress?: Address;
  businessUnit?: BusinessUnitKeyReference;
  cartState: string;
  country?: string;
  createdAt: string;
  custom?: CustomFields;
  customLineItems: CustomLineItem[];
  customerEmail?: string;
  customerGroup?: CustomerGroupReference;
  customerId?: string;
  deleteDaysAfterLastModification?: number;
  directDiscounts: DirectDiscount[];
  discountCodes: DiscountCodeInfo[];
  discountOnTotalPrice?: DiscountOnTotalPrice;
  id: string;
  inventoryMode: string;
  itemShippingAddresses: Address[];
  key?: string;
  lastModifiedAt: string;
  lineItems: LineItem[];
  locale?: string;
  origin: string;
  paymentInfo?: PaymentInfo;
  refusedGifts: CartDiscountReference[];
  shipping: Shipping[];
  shippingAddress?: Address;
  shippingCustomFields?: CustomFields;
  shippingInfo?: ShippingInfo;
  shippingKey?: string;
  shippingMode: string;
  shippingRateInput?: ShippingRateInput;
  store?: StoreKeyReference;
  taxCalculationMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxedPrice?: TaxedPrice;
  taxedShippingPrice?: TaxedPrice;
  totalLineItemQuantity?: number;
  totalPrice: CentPrecisionMoney;
  version: number;
}

export interface CustomLineItem {
  custom?: CustomFields;
  discountedPricePerQuantity: DiscountedLineItemPriceForQuantity[];
  id: string;
  key?: string;
  money: TypedMoney;
  name: LocalizedString;
  perMethodTaxRate: MethodTaxRate[];
  priceMode: string;
  quantity: number;
  shippingDetails?: ItemShippingDetails;
  slug: string;
  state: ItemState[];
  taxCategory?: TaxCategoryReference;
  taxRate?: TaxRate;
  taxedPrice?: TaxedItemPrice;
  taxedPricePortions: MethodTaxedPrice[];
  totalPrice: CentPrecisionMoney;
}

export interface DiscountedLineItemPriceForQuantity {
  discountedPrice: DiscountedLineItemPrice;
  quantity: number;
}

export interface DiscountedLineItemPrice {
  includedDiscounts: DiscountedLineItemPortion[];
  value: TypedMoney;
}

interface DiscountedLineItemPortion {
  discount: Reference;
  discountedAmount: TypedMoney;
}

export type Reference =
  | AssociateRoleReference
  | AttributeGroupReference
  | BusinessUnitReference
  | CartDiscountReference
  | CartReference
  | CategoryReference
  | ChannelReference
  | CustomObjectReference
  | CustomerEmailTokenReference
  | CustomerGroupReference
  | CustomerPasswordTokenReference
  | CustomerReference
  | DirectDiscountReference
  | DiscountCodeReference
  | InventoryEntryReference
  | OrderEditReference
  | OrderReference
  | PaymentReference
  | ProductDiscountReference
  | ProductReference
  | ProductSelectionReference
  | ProductTailoringReference
  | ProductTypeReference
  | QuoteReference
  | QuoteRequestReference
  | ReviewReference
  | ShippingMethodReference
  | ShoppingListReference
  | StagedQuoteReference
  | StandalonePriceReference
  | StateReference
  | StoreReference
  | TaxCategoryReference
  | TypeReference
  | ZoneReference;

export interface CartReference {
  id: string;
  typeId: string;
}

export interface DirectDiscountReference {
  id: string;
  typeId: string;
}

export interface DirectDiscount {
  id: string;
  target?: CartDiscountTarget;
  value: CartDiscountValue;
}

export interface DiscountCodeInfo {
  discountCode: DiscountCodeReference;
  state: string;
}

export interface DiscountOnTotalPrice {
  discountedAmount: TypedMoney;
  discountedGrossAmount?: TypedMoney;
  discountedNetAmount?: TypedMoney;
  includedDiscounts: DiscountedTotalPricePortion[];
}

export interface DiscountedTotalPricePortion {
  discount: CartDiscountReference;
  discountedAmount: TypedMoney;
}

export interface LineItem {
  addedAt?: string;
  custom?: CustomFields;
  discountedPricePerQuantity: DiscountedLineItemPriceForQuantity[];
  distributionChannel?: ChannelReference;
  id: string;
  inventoryMode?: string;
  key?: string;
  lastModifiedAt?: string;
  lineItemMode: string;
  name: LocalizedString;
  perMethodTaxRate: MethodTaxRate[];
  price: Price;
  priceMode: string;
  productId: string;
  productKey?: string;
  productSlug?: LocalizedString;
  productType: ProductTypeReference;
  quantity: number;
  shippingDetails?: ItemShippingDetails;
  state: ItemState[];
  supplyChannel?: ChannelReference;
  taxRate?: TaxRate;
  taxedPrice?: TaxedItemPrice;
  taxedPricePortions: MethodTaxedPrice[];
  totalPrice: CentPrecisionMoney;
  variant: ProductVariant;
}

export interface MethodTaxRate {
  shippingMethodKey: string;
  taxRate?: TaxRate;
}

export interface ItemShippingDetails {
  targets: ItemShippingTarget[];
  valid: boolean;
}

export interface ItemShippingTarget {
  addressKey: string;
  quantity: number;
  shippingMethodKey?: string;
}

export interface TaxedItemPrice {
  taxPortions: TaxPortion[];
  totalGross: CentPrecisionMoney;
  totalNet: CentPrecisionMoney;
  totalTax?: CentPrecisionMoney;
}

export interface TaxPortion {
  amount: CentPrecisionMoney;
  name?: string;
  rate: number;
}

export interface MethodTaxedPrice {
  shippingMethodKey: string;
  taxedPrice?: TaxedItemPrice;
}

export interface Shipping {
  shippingAddress: Address;
  shippingCustomFields?: CustomFields;
  shippingInfo: ShippingInfo;
  shippingKey: string;
  shippingRateInput?: ShippingRateInput;
}

export interface ShippingInfo {
  deliveries?: Delivery[];
  discountedPrice?: DiscountedLineItemPrice;
  price: CentPrecisionMoney;
  shippingMethod?: ShippingMethodReference;
  shippingMethodName: string;
  shippingMethodState: string;
  shippingRate: ShippingRate;
  taxCategory?: TaxCategoryReference;
  taxRate?: TaxRate;
  taxedPrice?: TaxedItemPrice;
}

export type ShippingRateInput = ClassificationShippingRateInput | ScoreShippingRateInput;

export interface ClassificationShippingRateInput {
  type: string;
  key: string;
  label: LocalizedString;
}

export interface ScoreShippingRateInput {
  type: string;
  score: number;
}

export interface TaxedPrice {
  taxPortions: TaxPortion[];
  totalGross: CentPrecisionMoney;
  totalNet: CentPrecisionMoney;
  totalTax?: CentPrecisionMoney;
}

export interface CartDraft {
  anonymousId?: string;
  billingAddress?: _BaseAddress;
  businessUnit?: BusinessUnitResourceIdentifier;
  country?: string;
  currency: string;
  custom?: CustomFieldsDraft;
  customLineItems?: CustomLineItemDraft[];
  customShipping?: CustomShippingDraft[];
  customerEmail?: string;
  customerGroup?: CustomerGroupResourceIdentifier;
  customerId?: string;
  deleteDaysAfterLastModification?: number;
  discountCodes?: string[];
  externalTaxRateForShippingMethod?: ExternalTaxRateDraft;
  inventoryMode?: string;
  itemShippingAddresses?: BaseAddress[];
  key?: string;
  lineItems?: LineItemDraft[];
  locale?: string;
  origin?: string;
  shipping?: ShippingDraft[];
  shippingAddress?: _BaseAddress;
  shippingMethod?: ShippingMethodResourceIdentifier;
  shippingMode?: string;
  shippingRateInput?: ShippingRateInputDraft;
  store?: StoreResourceIdentifier;
  taxCalculationMode?: string;
  taxMode?: string;
  taxRoundingMode?: string;
}

export interface CustomLineItemDraft {
  custom?: CustomFieldsDraft;
  externalTaxRate?: ExternalTaxRateDraft;
  key?: string;
  money: _Money;
  name: LocalizedString;
  priceMode?: string;
  quantity?: number;
  shippingDetails?: ItemShippingDetailsDraft;
  slug: string;
  taxCategory?: TaxCategoryResourceIdentifier;
}

export interface ExternalTaxRateDraft {
  amount?: number;
  country: string;
  includedInPrice?: boolean;
  name: string;
  state?: string;
  subRates?: SubRate[];
}

export interface ItemShippingDetailsDraft {
  targets: ItemShippingTarget[];
}

export interface CustomShippingDraft {
  custom?: CustomFieldsDraft;
  deliveries?: DeliveryDraft[];
  externalTaxRate?: ExternalTaxRateDraft;
  key: string;
  shippingAddress?: _BaseAddress;
  shippingMethodName: string;
  shippingRate: ShippingRateDraft;
  shippingRateInput?: ShippingRateInputDraft;
  taxCategory?: TaxCategoryResourceIdentifier;
}

export type ShippingRateInputDraft = ClassificationShippingRateInputDraft | ScoreShippingRateInputDraft;

export interface ClassificationShippingRateInputDraft {
  type: string;
  key: string;
}

export interface ScoreShippingRateInputDraft {
  type: string;
  score: number;
}

export interface LineItemDraft {
  addedAt?: string;
  custom?: CustomFieldsDraft;
  distributionChannel?: ChannelResourceIdentifier;
  externalPrice?: _Money;
  externalTaxRate?: ExternalTaxRateDraft;
  externalTotalPrice?: ExternalLineItemTotalPrice;
  inventoryMode?: string;
  key?: string;
  perMethodExternalTaxRate?: MethodExternalTaxRateDraft[];
  productId?: string;
  quantity?: number;
  shippingDetails?: ItemShippingDetailsDraft;
  sku?: string;
  supplyChannel?: ChannelResourceIdentifier;
  variantId?: number;
}

export interface ExternalLineItemTotalPrice {
  price: _Money;
  totalPrice: _Money;
}

export interface MethodExternalTaxRateDraft {
  shippingMethodKey: string;
  taxRate?: ExternalTaxRateDraft;
}

export interface ShippingDraft {
  custom?: CustomFieldsDraft;
  deliveries?: DeliveryDraft[];
  externalTaxRate?: ExternalTaxRateDraft;
  key: string;
  shippingAddress: _BaseAddress;
  shippingMethod?: ShippingMethodReference;
  shippingRateInput?: ShippingRateInputDraft;
}

export type CartUpdateAction = CartAddLineItemAction;

interface CartAddLineItemAction {
  action: 'addLineItem' | 'removeLineItem' | 'changeLineItemQuantity' | 'addDiscountCode';
  addedAt?: string;
  custom?: CustomFieldsDraft;
  distributionChannel?: ChannelResourceIdentifier;
  externalPrice?: _Money;
  externalTaxRate?: ExternalTaxRateDraft;
  externalTotalPrice?: ExternalLineItemTotalPrice;
  inventoryMode?: string;
  key?: string;
  perMethodExternalTaxRate?: MethodExternalTaxRateDraft[];
  productId?: string;
  quantity?: number;
  shippingDetails?: ItemShippingDetailsDraft;
  sku?: string;
  supplyChannel?: ChannelResourceIdentifier;
  variantId?: number;
  lineItemId?: string;
  code?: string;
}
