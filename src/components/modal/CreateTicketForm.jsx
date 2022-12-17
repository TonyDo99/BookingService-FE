import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { ErrorMessage, Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, createTicket } from '../../api/index';
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
const createTicketSchema = Yup.object().shape({
  name: Yup.string().required('name field cannot be blank *'),
  description: Yup.string().required('description field cannot be blank *'),
  quantity: Yup.string().required('quantity field cannot be blank *'),
});

export default function CreateTicketForm({ open, setOpen }) {
  const [statusCreate, setStatusCreate] = useState(null);

  const [date, setDate] = useState(null);

  const [events, setEvents] = useState([]);

  const [event, setEvent] = useState('');

  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setEvents(await fetchEvents(navigate));
    })();
  }, [navigate]);
  return (
    <>
      <Modal className="bg-white" open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Formik
            initialValues={{ name: '', description: '', quantity: '' }}
            validationSchema={createTicketSchema}
            onSubmit={async (values, actions) => {
              await createTicket(
                {
                  event: {
                    _id: event,
                  },
                  ...values,
                  quantity: +values.quantity,
                  price: +price,
                  date: `${date.$y}-${date.$M + 1}-${date.$D < 10 ? `0${date.$D}` : date.$D}`,
                },
                setStatusCreate
              );
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Stack spacing={2}>
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">Event</InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={event}
                      label="Event *"
                      onChange={(e) => setEvent(e.target.value)}
                    >
                      {events.map((event) => (
                        <MenuItem key={event._id} value={`${event._id}`}>
                          <em>{event.name}</em>
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
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
                  <TextField
                    label="quantity"
                    name="quantity"
                    span="quantity"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.quantity}
                    type="text"
                  />
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    <ErrorMessage name="quantity" />
                  </span>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Price"
                    />
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Pick date"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="YYYY-MM-DD"
                    />
                  </LocalizationProvider>
                </Stack>

                <LoadingButton
                  fullWidth
                  size="large"
                  variant="outlined"
                  style={{
                    marginTop: '15px',
                  }}
                  type="submit"
                >
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
