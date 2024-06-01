import { AddressFormValues } from '../pages/User';

export type ChangeUserInfo =
  | { action: 'setFirstName'; firstName: string }
  | { action: 'setLastName'; lastName: string }
  | { action: 'setDateOfBirth'; dateOfBirth: string }
  | { action: 'changeEmail'; email: string }
  | { action: 'removeAddress'; addressId: string }
  | { action: 'changeAddress'; addressId: string; address: AddressFormValues }
  | { action: 'addAddress'; address: AddressFormValues }
  | { action: 'setDefaultShippingAddress'; addressId: string }
  | { action: 'setDefaultBillingAddress'; addressId: string };
