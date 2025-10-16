export async function getCart(userId) {
  const res = await fetch(`/api/cart/${userId}`)
  if (!res.ok) throw new Error('Failed to load cart')
  return res.json()
}