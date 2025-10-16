export async function addToCart(userId, item) {
  const res = await fetch(`/api/cart/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  })
  return res.json()
}

export async function updateCartItem(userId, productId, quantity) {
  const res = await fetch(`/api/cart/${userId}/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity })
  })
  return res.json()
}

export async function deleteCartItem(userId, productId) {
  const res = await fetch(`/api/cart/${userId}/${productId}`, {
    method: 'DELETE'
  })
  return res.json()
}