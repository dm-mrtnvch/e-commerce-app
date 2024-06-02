import { AddressFormValuesType } from '../pages/User';

export type ChangeUserInfo =
  | { action: 'setFirstName'; firstName: string }
  | { action: 'setLastName'; lastName: string }
  | { action: 'setDateOfBirth'; dateOfBirth: string }
  | { action: 'changeEmail'; email: string }
  | { action: 'removeAddress'; addressId: string }
  | { action: 'changeAddress'; addressId: string; address: AddressFormValuesType }
  | { action: 'addAddress'; address: AddressFormValuesType }
  | { action: 'setDefaultShippingAddress'; addressId: string }
  | { action: 'setDefaultBillingAddress'; addressId: string }
  | { action: 'addShippingAddress'; address: AddressFormValuesType }
  | { action: 'addBillingAddress'; address: AddressFormValuesType }
  | { action: 'addShippingAddressId'; addressId: string }
  | { action: 'addBillingAddressId'; addressId: string };
