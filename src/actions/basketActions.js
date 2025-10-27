import axios from 'axios';

axios.defaults.baseURL = 'http://localhost';

export async function addItemToBasket(userId, item) {
  const res = await axios.post(`/api/basket/${userId}`, item);
  return res.data;
}

export async function updateBasketItem(userId, productId, quantity) {
  const res = await axios.put(`/api/basket/${userId}/${productId}`, { quantity });
  return res.data;
}

export async function deleteBasketItem(userId, productId) {
  const res = await axios.delete(`/api/basket/${userId}/${productId}`);
  return res.data;
}

export async function clearBasketItems(userId) {
  const res = await axios.delete(`/api/basket/${userId}`);
  return res.data;
}


