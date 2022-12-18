import { useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // @mui
import jwtDecode from 'jwt-decode';
import { Link, Stack, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { login } from '../../../api/index';

// ----------------------------------------------------------------------
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .min(5, 'Email must have at least 5 characters')
    .max(50, `Email can't over 50 characters`)
    .required('Email is a required field *'),
  password: Yup.string().required('Password is a required field *'),
});

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={async (values, actions) => {
          const accessKey = await login(values);
          actions.setSubmitting(false);

          if (!accessKey) return navigate('*', { replace: true });

          localStorage.setItem('accessKey', accessKey);
          const { role } = jwtDecode(accessKey);
          switch (role) {
            case 'admin_user':
              navigate('/', { replace: true });
              break;
            case 'normal_user':
              navigate('/home', { replace: true });
              break;
            default:
              navigate('*', { replace: true });
              break;
          }
          return null;
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="email"
                type="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                label="Email address"
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
              Login
            </LoadingButton>
            <div className="pt-3">
              <LoadingButton fullWidth size="large" variant="outlined" href="/register">
                Register
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
