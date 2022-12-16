import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid white',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
};

// ----------------------------------------------------------------------
const SignInSchema = Yup.object().shape({
  slug: Yup.string().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  poster: Yup.string().required(),
});

export default function CreateEventForm() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Modal className="bg-white" open={open}>
        <Box sx={style}>
          <Formik
            initialValues={{ slug: '', name: '', description: '', poster: '' }}
            validationSchema={SignInSchema}
            onSubmit={async (values, actions) => {}}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="slug"
                    name="slug"
                    span="slug"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.slug}
                    type="text"
                  />
                  <span
                    style={{
                      color: 'rgb(248 113 113 / var(--tw-text-opacity))',
                    }}
                  >
                    <ErrorMessage name="slug" />
                  </span>
                  <TextField
                    label="description"
                    name="description"
                    span="description"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.description}
                    type="textarea"
                  />
                  <span className="animate-pulse text-red-400 mt-1">
                    <ErrorMessage name="description" />
                  </span>

                  <TextField
                    label="poster"
                    name="poster"
                    span="poster"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.poster}
                    type="number"
                  />
                  <span className="animate-pulse text-red-400 mt-1">
                    <ErrorMessage name="poster" />
                  </span>
                  <TextField
                    label="Quantity"
                    name="quantity"
                    span="quantity"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.quantity}
                    type="number"
                  />
                  <span className="animate-pulse text-red-400 mt-1">
                    <ErrorMessage name="quantity" />
                  </span>

                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultChecked
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="true" control={<Radio />} defaultChecked label={'public'} />
                      <FormControlLabel value="false" control={<Radio />} label={'unpublished'} />
                    </RadioGroup>
                  </FormControl>
                </Stack>
                <LoadingButton fullWidth size="large" variant="outlined" type="submit">
                  Add
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
