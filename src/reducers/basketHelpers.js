// Calculates total price of all items in the cart
export function calculateTotalForCart(cart) {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

// Calculates total price for a single item
export function calculateTotalForItem(item) {
  return item.price * item.quantity;
}

// Returns total number of items (sum of quantities)
export function getItemCount(cart) {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// Returns items with quantity <= 0 or missing price
export function getInvalidItems(cart) {
  return cart.filter((item) => item.quantity <= 0 || typeof item.price !== 'number');
}