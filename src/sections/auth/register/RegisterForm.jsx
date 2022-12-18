import { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // @mui
import { Link, Stack, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { register } from '../../../api/index';
import ModalResponse from '../../../components/modal';

// ----------------------------------------------------------------------
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .min(5, 'Email must have at least 5 characters')
    .max(50, `Email can't over 50 characters`)
    .required('Email is a required field *'),
  password: Yup.string().required('Password is a required field *'),
  fullName: Yup.string().required('Phone number is a required field *'),
  mobilePhone: Yup.string()
    .min(10, 'Phone number must have at least 10 characters')
    .max(11, `Phone number can't over 11 characters`)
    .required('Mobile phone is a required field *'),
});

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [statusRegister, setStatusRegister] = useState(null);

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', fullName: '', mobilePhone: '', role: 'normal_user' }}
        validationSchema={SignInSchema}
        onSubmit={async (values, actions) => {
          await register(values, setStatusRegister);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="fullName"
                type="fullName"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.fullName}
                label="Full name"
              />
              <span className="animate-pulse text-red-400 mt-1">
                <ErrorMessage name="fullName" />
              </span>
              <TextField
                name="mobilePhone"
                type="mobilePhone"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.mobilePhone}
                label="Phone number"
              />
              <span className="animate-pulse text-red-400 mt-1">
                <ErrorMessage name="mobilePhone" />
              </span>
              <TextField
                name="email"
                type="mobilePhone"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                label="Email"
              />
              <span className="animate-pulse text-red-400 mt-1">
                <ErrorMessage name="email" />
              </span>
              <TextField
                name="password"
                label="Password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                type="password"
              />
              <span className="animate-pulse text-red-400 mt-1">
                <ErrorMessage name="password" />
              </span>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
              <Checkbox name="remember" label="Remember me" />
              <Link variant="subtitle2" underline="hover">
                Forgot password?
              </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained">
              Register
            </LoadingButton>
            <div className="pt-3">
              <LoadingButton fullWidth size="large" type="submit" variant="outlined" href="/login">
                Login
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
      {statusRegister !== null && <ModalResponse status={statusRegister} setStatusRegister={setStatusRegister} />}
    </>
  );
}
