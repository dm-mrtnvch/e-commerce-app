import { object, string } from 'yup';

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
