export interface Credentials {
  access_token: string | null;
  expires_in: number;
  scope: string;
  refresh_token: string | null;
  token_type: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  grant_type?: string;
}

export interface ClientCredentialsFlowResponse
  extends Pick<Credentials, 'access_token' | 'expires_in' | 'scope' | 'token_type'> {}

export type RegisterResponseData = {
  id: string | null;
  version: number | null;

  email: string | null;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;

  billingAddressIds: string[] | null;
  shippingAddressIds: string[] | null;
  defaultBillingAddressId: string | null;
  defaultShippingAddressId: string | null;
  addresses: [];
  //customer: any;
  token: string | null;
  access_token: string | null;
};

export interface Address {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Customer {
  key?: string;
  customerNumber?: string;
  externalId?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  title?: string;
  anonymousId?: string;
  dateOfBirth?: string;
  companyName?: string;
  vatId?: string;
  addresses: Address[];
  defaultShippingAddress: number | null;
  shippingAddresses?: number[];
  defaultBillingAddress: number | null;
  billingAddresses?: number[];
  isEmailVerified?: boolean;
}
