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
