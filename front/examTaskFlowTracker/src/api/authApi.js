const API_URL = 'http://localhost:3000/api/users'

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) throw new Error('Помилка логіну')

  return await res.json()
}

console.log("📡 authApi loaded");

export const register = async (userData) => {
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
    console.log("📬 Відповідь з бекенду:", res.status);


  if (!res.ok) throw new Error('Помилка реєстрації')

  return await res.json()
}
