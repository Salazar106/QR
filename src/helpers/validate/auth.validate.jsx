import * as Yup from "yup";


export const SchemaLoginValidate = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});


export const SchemaRegisterValidate = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const SchemaPinValidate = Yup.object({
  pin: Yup.string()
     .required('Code is required')
     .matches(/^\d+$/, 'Please enter digits only.')
 });

export const SchemaCompleteRegisterValidate = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/[a-zA-Z]/, 'The password cannot contain only numbers')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),

});


export const SchemaChangePasswordValidate = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/[a-zA-Z]/, 'The password cannot contain only numbers')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
