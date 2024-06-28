import { Address } from './auth';
import { AddressDraft, CustomFields, CustomFieldsDraft } from './common';
import { PaymentReference } from './payment';
import { StateReference } from './state';

export interface ItemState {
  quantity: number;
  state: StateReference;
}

export interface PaymentInfo {
  payments: PaymentReference[];
}

export interface Delivery {
  address?: Address;
  createdAt: string;
  custom?: CustomFields;
  id: string;
  items: DeliveryItem[];
  key?: string;
  parcels: Parcel[];
}

export interface DeliveryItem {
  id: string;
  quantity: number;
}

export interface Parcel {
  createdAt: string;
  custom?: CustomFields;
  id: string;
  items?: DeliveryItem[];
  key?: string;
  measurements?: ParcelMeasurements;
  trackingData?: TrackingData;
}

export interface ParcelMeasurements {
  heightInMillimeter?: number;
  lengthInMillimeter?: number;
  weightInGram?: number;
  widthInMillimeter?: number;
}

export interface TrackingData {
  carrier?: string;
  isReturn?: boolean;
  provider?: string;
  providerTransaction?: string;
  trackingId?: string;
}

export interface DeliveryDraft {
  address?: AddressDraft;
  custom?: CustomFieldsDraft;
  items?: DeliveryItem[];
  key?: string;
  parcels?: ParcelDraft[];
}

export interface ParcelDraft {
  custom?: CustomFieldsDraft;
  items?: DeliveryItem[];
  key?: string;
  measurements?: ParcelMeasurements;
  trackingData?: TrackingData;
}
