import { redirect } from 'react-router';

export const checkoutAction = async ({ request }) => {
  const formData = await request.formData();
  const customer = Object.fromEntries(formData);
  alert(`Thank you for your purchase, ${customer.name}!`);
  // Save customer, trigger confirmation, etc.
  return redirect('/purchase/confirmation');
}

