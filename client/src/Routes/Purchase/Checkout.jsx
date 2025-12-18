import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Stack,
} from '@mui/material';

import { useNavigate, useSubmit } from 'react-router';

import { useCustomer } from '../../hooks/useCustomer';
import { useMutateEntity } from '../../hooks/useMutateEntity';

function Checkout() {
  const submit = useSubmit();
  const { customer, updateCustomer } = useCustomer();
  const { updateEntity } = useMutateEntity();
  let navigate = useNavigate();

  function onSaveCustomer(e) {
    e.preventDefault();
    if (
      customer?.name !== '' &&
      customer.email !== '' &&
      customer.phone !== ''
    ) {
      const formData = new FormData();
      formData.append('name', customer.name);
      formData.append('email', customer.email);
      formData.append('phone', customer.phone);
      formData.append('newsletter', customer.newsletter);
      formData.append('shipping', customer.shipping);
      submit(formData, {
        method: 'post',
        action: '/purchase/checkout',
      });
    }
  }

  function onChangeValue(e) {
    var updatedCustomer = updateEntity(e, customer);
    updateCustomer(updatedCustomer);
  }

  const shouldBeDisabled =
    customer.name?.length === 0 ||
    customer.email.length === 0 ||
    customer.phone.length === 0;

  const nameRequired = customer.name?.length === 0;
  const emailRequired = customer.email?.length === 0;
  const phoneRequired = customer.phone?.length === 0;

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h5">Checkout</Typography>
      <form onSubmit={onSaveCustomer}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={customer.name}
          onChange={onChangeValue}
          error={nameRequired}
          helperText={nameRequired && 'Name is required'}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={customer.email}
          onChange={onChangeValue}
          error={emailRequired}
          helperText={emailRequired && 'Email is required'}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={customer.phone}
          onChange={onChangeValue}
          error={phoneRequired}
          helperText={phoneRequired && 'Phone is required'}
          margin="normal"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={customer.newsletter}
              onChange={onChangeValue}
              name="newsletter"
            />
          }
          label="Subscribe to newsletter?"
        />

        <Stack spacing={2}>
          <FormControl>
            <FormLabel component="legend">Shipping Option</FormLabel>
            <RadioGroup
              name="shipping"
              value={customer.shipping}
              onChange={onChangeValue}
              row
            >
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label="Standard"
              />
              <FormControlLabel
                value="express"
                control={<Radio />}
                label="Express"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </form>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/store')}
        >
          Back to Store
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSaveCustomer}
          disabled={shouldBeDisabled}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Checkout;
