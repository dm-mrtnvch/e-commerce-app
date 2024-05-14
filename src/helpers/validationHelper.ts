import { object, string, date } from 'yup';

export const loginFormValidationSchema = object({
  email: string()
    .email('Enter a valid email')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i, 'Enter a valid email')
    .required('Email is required'),
  password: string()
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter (a-z)')
    .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter (A-Z)')
    .matches(/^(?=.*\d)/, 'Password must contain at least one digit (0-9)')
    .matches(/^(?=.*[@$!%*?&])/, 'Password must contain at least one special character (!@#$%^&*)')
    .matches(/^(?=\S+$)/, 'Password must not contain leading or trailing whitespace')
    .required('Password is required'),
});

const countries = ['Kazakhstan', 'Belarus', 'Poland'] as const;
type Country = (typeof countries)[number];

const postalCodeRegex: Record<Country, RegExp> = {
  Kazakhstan: /^[0-9]{6}$/, // example: 476210
  Belarus: /^[0-9]{6}$/, // example: 220099
  Poland: /^[0-9]{2}-[0-9]{3}$/, // example: 01-797
};

const addressSchema = object().shape({
  street: string().required('Street address is required'),
  city: string()
    .matches(/^[a-zA-Z\s]+$/, 'City cannot contain special characters or numbers')
    .required('City is required'),
  postalCode: string()
    .required('Postal code is required')
    .test('isValidPostalCode', 'Invalid postal code format for the selected country', function (value) {
      const country: Country = this.parent.country;
      if (country && postalCodeRegex[country]) {
        return postalCodeRegex[country].test(value || '');
      }
      return true;
    }),
  country: string().oneOf(countries, 'Invalid country').required('Country is required'),
});

export const registrationFormValidationSchema = object().shape({
  email: string().email('Invalid email address').required('Email is required'),
  password: string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  firstName: string()
    .matches(/^[a-zA-Z]+$/, 'First name cannot contain special characters or numbers')
    .required('First name is required'),
  lastName: string()
    .matches(/^[a-zA-Z]+$/, 'Last name cannot contain special characters or numbers')
    .required('Last name is required'),
  dateOfBirth: date()
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 13)), 'You must be at least 13 years old')
    .required('Date of birth is required'),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});
