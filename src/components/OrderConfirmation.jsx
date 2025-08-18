import { useCustomer } from '../hooks/useCustomer';

function OrderConfirmation() {
  const { customer } = useCustomer();

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Hello, {customer.name}!</p>
      <p>Thank you for your order!</p>
      <p>Your order has been successfully placed.</p>
      <a href="/store">Continue Shopping</a>
    </div>
  );
}

export default OrderConfirmation;
