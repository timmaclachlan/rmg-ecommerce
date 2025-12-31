import axios from 'axios';

export async function addItemToBasket(userId, item) {
  const res = await axios.post(`/api/baskets/${userId}`, item);
  return res.data;
}

export async function updateBasketItem(userId, productId, quantity) {
  const res = await axios.put(`/api/baskets/${userId}/${productId}`, {
    quantity,
  });
  return res.data;
}

export async function deleteBasketItem(userId, productId) {
  const res = await axios.delete(`/api/baskets/${userId}/${productId}`);
  return res.data;
}

export async function clearBasketItems(userId) {
  const res = await axios.delete(`/api/baskets/${userId}`);
  return res.data;
}
