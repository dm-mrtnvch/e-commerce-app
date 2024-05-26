export const COUNTRIES_ENUM = {
  Kazakhstan: 'KZ',
  Belarus: 'BY',
  Poland: 'PL',
};

export const CUSTOMER_INITIAL_VALUES = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: [],
  shippingAddress: {
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  },
  defaultShippingAddress: null,
  shippingAddresses: [],
  billingAddress: {
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  },
  defaultBillingAddress: null,
  billingAddresses: [],
  useShippingAsBilling: false,
};
