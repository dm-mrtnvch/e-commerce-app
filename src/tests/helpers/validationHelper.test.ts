import { loginFormValidationSchema, registrationFormValidationSchema } from '../../helpers/validationHelper.ts';
import { describe, expect, it } from 'vitest';

describe('LoginFormValidation', () => {
  it('should validate correct email and password', async () => {
    const validData = { email: 'test@example.com', password: 'Test1234!' };
    await expect(loginFormValidationSchema.validate(validData)).resolves.toEqual(validData);
  });

  it('should reject invalid email', async () => {
    const invalidData = { email: 'invalid', password: 'Test1234!' };
    await expect(loginFormValidationSchema.validate(invalidData)).rejects.toThrow();
  });

  it('should reject invalid password', async () => {
    const invalidData = { email: 'test@example.com', password: 'test' };
    await expect(loginFormValidationSchema.validate(invalidData)).rejects.toThrow();
  });
});

describe('RegistrationFormValidation', () => {
  it('should validate correct registration data', async () => {
    const validData = {
      email: 'test@example.com',
      password: 'Test1234!',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date(2000, 0, 1),
      shippingAddress: {
        streetName: 'Test Street',
        city: 'Test City',
        postalCode: '01-797',
        country: 'PL',
      },
      billingAddress: {
        streetName: 'Test Street',
        city: 'Test City',
        postalCode: '01-797',
        country: 'PL',
      },
    };
    await expect(registrationFormValidationSchema.validate(validData)).resolves.toEqual(validData);
  });

  it('should reject invalid registration data', async () => {
    const invalidData = {
      email: 'invalid',
      password: 'test',
      firstName: 'John1',
      lastName: 'Doe1',
      dateOfBirth: new Date(2020, 0, 1),
      shippingAddress: {
        streetName: 'Test Street',
        city: 'Test City1',
        postalCode: '01-797',
        country: 'PL',
      },
      billingAddress: {
        streetName: 'Test Street',
        city: 'Test City1',
        postalCode: '01-797',
        country: 'PL',
      },
    };
    await expect(registrationFormValidationSchema.validate(invalidData)).rejects.toThrow();
  });
});
