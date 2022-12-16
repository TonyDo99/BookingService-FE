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
import { buyTicket } from '../../api';
import ModalBuying from '.';

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
  quantity: Yup.number().min(1, 'At least quantity must greater than zero *').required('Quantity cannot be blank *'),
});

export default function BuyingModal({ ticket, open, setClick }) {
  const [statusBuy, setStatusBuy] = useState(null);
  return (
    <>
      <Modal className="bg-white" open={open} onClose={() => setClick(false)}>
        <Box sx={style}>
          <Formik
            initialValues={{ quantity: 0 }}
            validationSchema={SignInSchema}
            onSubmit={async (values, actions) => {
              const { _id } = ticket;

              actions.setSubmitting(false);
              const response = await buyTicket(_id, values);
              setStatusBuy(response);
            }}
          >
            {(props) => (
              <Form className="bg-red-500" onSubmit={props.handleSubmit}>
                <Stack spacing={3}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="female" control={<Radio />} label={`${ticket.description}`} />
                    </RadioGroup>
                  </FormControl>
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
                </Stack>
                <LoadingButton fullWidth size="large" variant="outlined" type="submit">
                  Add
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      {statusBuy !== null && <ModalBuying status={statusBuy} setStatusRegister={setStatusBuy} />}
    </>
  );
}
