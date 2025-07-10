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
  Paper,
} from "@mui/material";

import { useCustomer } from "../hooks/useCustomer";
import { useMutateEntity } from "../hooks/useMutateEntity";

function Checkout({ onCompleteCheckout, onStageChange }) {
  const { customer, updateCustomer } = useCustomer();
  const { updateEntity } = useMutateEntity();

  function onSaveCustomer() {
    if (
      customer?.name !== "" &&
      customer.email !== "" &&
      customer.phone !== ""
    ) {
      onCompleteCheckout(customer.name, customer.email);
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
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
      <Typography variant="h5">Checkout</Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={customer.name}
        onChange={onChangeValue}
        error={nameRequired}
        helperText={nameRequired && "Name is required"}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={customer.email}
        onChange={onChangeValue}
        error={emailRequired}
        helperText={emailRequired && "Email is required"}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={customer.phone}
        onChange={onChangeValue}
        error={phoneRequired}
        helperText={phoneRequired && "Phone is required"}
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

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onStageChange("Basket")}
        >
          Back to Basket
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
