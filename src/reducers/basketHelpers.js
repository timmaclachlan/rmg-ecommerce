// Calculates total price of all items in the basket
export function calculateTotalForBasket(basket) {
  return basket.reduce((sum, item) => {
    const discountFactor = item.discountPercentage > 0
      ? 1 - item.discountPercentage / 100
      : 1;
    const effectivePrice = item.price * discountFactor;
    return sum + effectivePrice * item.quantity;
  }, 0);
}


// Calculates total price for a single item
export function calculateTotalForItem(item) {
  const discountFactor = item.discountPercentage > 0
    ? 1 - item.discountPercentage / 100
    : 1;
  return item.price * discountFactor * item.quantity;
}

// Returns total number of items (sum of quantities)
export function getItemCount(basket) {
  return basket.reduce((count, item) => count + item.quantity, 0);
}

// Returns items with quantity <= 0 or missing price
export function getInvalidItems(basket) {
  return basket.filter((item) => item.quantity <= 0 || typeof item.price !== 'number');
}