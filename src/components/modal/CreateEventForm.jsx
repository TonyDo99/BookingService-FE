import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { createEvent } from '../../api/index';
import PopupModal from './Popup';

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
  slug: Yup.string().required('slug field cannot be blank *'),
  name: Yup.string().required('name field cannot be blank *'),
  description: Yup.string().required('description field cannot be blank *'),
  poster: Yup.string().required('poster field cannot be blank *'),
});

export default function CreateEventForm() {
  const [open, setOpen] = useState(true);

  const [statusCreate, setStatusCreate] = useState(null);

  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  return (
    <>
      <Modal className="bg-white" open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Formik
            initialValues={{ slug: '', name: '', description: '', poster: '', published: true }}
            validationSchema={SignInSchema}
            onSubmit={async (values) => {
              await createEvent(
                {
                  ...values,
                  published: JSON.parse(values.published),
                  startDate: `${startDate.$y}-${startDate.$M + 1}-${startDate.$D}`,
                  endDate: `${startDate.$y}-${startDate.$M + 1}-${startDate.$D}`,
                },
                setStatusCreate
              );
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="name"
                    name="name"
                    span="name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    type="text"
                  />
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    <ErrorMessage name="name" />
                  </span>
                  <TextField
                    label="slug"
                    name="slug"
                    span="slug"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.slug}
                    type="textarea"
                  />
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    <ErrorMessage name="slug" />
                  </span>

                  <TextField
                    label="poster"
                    name="poster"
                    span="poster"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.poster}
                    type="text"
                  />
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    <ErrorMessage name="poster" />
                  </span>
                  <TextField
                    label="description"
                    name="description"
                    span="description"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.description}
                    type="text"
                  />
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    <ErrorMessage name="description" />
                  </span>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Pick start date"
                      value={startDate}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="YYYY-MM-DD"
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Pick end date"
                      value={endDate}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="YYYY-MM-DD"
                    />
                  </LocalizationProvider>

                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="published"
                      defaultValue
                      value={props.values.published}
                      onChange={props.handleChange}
                    >
                      <FormControlLabel value control={<Radio />} label={'public'} />
                      <FormControlLabel value={false} control={<Radio />} label={'unpublished'} />
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
      {statusCreate !== null && <PopupModal status={statusCreate} setStatusRegister={setStatusCreate} />}
    </>
  );
}
