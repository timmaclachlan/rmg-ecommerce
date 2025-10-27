export async function getBasket(userId) {
  const res = await fetch(`/api/basket/${userId}`)
  if (!res.ok) throw new Error('Failed to load basket')
  return res.json()
}